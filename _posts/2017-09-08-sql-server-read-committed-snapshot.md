---
title: SQL Server's Read Committed Snapshot Isolation
date: 2017-09-10 18:16:00 +0700
layout: blogdetail
published: true
---

I got familiar with Oracle and PostgreSQL databases before I got familiar with SQL Server. When I started using SQL Server I wondered why a condition that would be fine in PostgreSQL would cause problem in SQL Server. Here is an example.

First let's set up the environment.

```sql
create table Product(
    ID      int,
    Code    nvarchar(20),
    Price   bigint
)

insert into Product(ID, Code, Price) values(1, 'A', 200)
insert into Product(ID, Code, Price) values(2, 'B', 100)
```

Suppose there are two active sessions. One of them is starting first, running this:

```sql
begin transaction

-- pretend this is an update process that runs a long time
update Product set Price = 300 where ID = 2

-- should have commit at the end but not yet there
```

While the other session is running this:

```sql
select * from Product where ID = 1
```

In PostgreSQL the select query would return immediately while in SQL Server it would wait until the update is committed before returning.

This would cause problem if we need to generate reports when the database is actively used for transactions. Either the report would take a very long time to finish or the transactions would have to wait for the report to finish. This last one can be really bad on a busy day.

Back then I found several workarounds from the internet. One suggestion is to use the `with (nolock)` hint. So the select query becomes:

```sql
select * from product with (nolock) where ID = 1
```

That would work in this case, but the select query would do something called "dirty" read, which in this case would include data modifications from other sessions even if the transaction is not yet committed. Continuing our example, if the first session is running:

```sql
begin transaction
update Product set Price = 300 where ID = 2

-- select query from second session would start here

update Product set Price = 500 where ID = 2
commit
```

And the second session starts between the first update and the second update:

```sql
select * from product with (nolock)
```

It would show the price of product 2 as 300 instead of 100 if the transaction on the first session is rolled back or 500 if the transaction is committed.

By the way PostgreSQL would show 100 as the price of product 2.

Also, sprinkling nolock hint all over the source code is [considered bad practice by a lot of people](https://www.google.com/search?q=sql+server+with+nolock).

Another workaround I found from googling was to create archive database. So we create a second database, copy the data from the original database to this second database periodically, and all report generation should use the second database, leaving the first database dedicated for transaction. This is, of course, a MUCH more complicated solution that requires a lot of effort.

What I found next was the REAL solution.

It turned out SQL Server actually has a feature called read committed snapshot isolation, which by default is not turned on! After I turned on snapshot isolation, SQL Server behaved just like PostgreSQL on situation like above.

With read committed snapshot isolation switched on, SQL Server will save the original data in `tempdb` when a transaction starts modifying data, and if another session sends a select query, as long as the transaction in the first session is not yet done, SQL Server will return the unmodified data from tempdb. This is oversimplification of course. Better consult the official documentation if you want to know the exact mechanism.

Bottom line is, select queries and data modifications no longer block one another.

Read committed snapshot isolation can be turned on like so:

```sql
-- kick out all other users with 2 minutes grace period
alter database mydb set single_user with rollback after 120 seconds

-- turn on read committed snapshot isolation
alter database mydb set read_committed_snapshot on

-- allow everyone else to reconnect
alter database mydb set multi_user
```

To check whether read committed snapshot isolation is turned on:

```sql
select name, is_read_committed_snapshot_on from sys.databases
```

If you are creating a new database, I strongly suggest turning on read committed snapshot isolation from the beginning. But for a database in production, you'd better [learn more about it](https://www.google.com/search?q=sql+server+read+committed+snapshot) before turning it on since [for certain condition update result will be different](https://www.brentozar.com/archive/2013/01/implementing-snapshot-or-read-committed-snapshot-isolation-in-sql-server-a-guide/).
