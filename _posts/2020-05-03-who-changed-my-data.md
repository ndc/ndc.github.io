---
title: Who Changed My Data (SQL Server edition)
date: 2020-05-03 16:18:00 +0700
layout: blogdetail
published: true
---

Suppose you have a table like this:

```sql
create table TableUnderObservation (
    ID bigint not null constraint PK_TABLEUNDEROBSERVATION primary key,
    Code nvarchar(10),
    ParentID bigint,
    UpdatedBy varchar(10),
    UpdatedAt datetime
)
```

And you have a problem in the production environment. Someone or something corrupts the data. Let's say for some rows the ParentID becomes the same as the ID. You want to know who/what does this.

One way to start the investigation is to create a trigger that logs the time of the incident (something changes ParentID to the same value as the ID), as well as some extra infos. Hopefully we can use the precise time info to narrow down the search on the more extensive log like AppDynamics / New Relic / LeanSentry installed in the production environment.

First let's create a table to store the log:

```sql
create table InvestigateParentEqualsID (
    ID bigint identity not null constraint PK_INVESTIGATEPARENTEQUALSID primary key,
    EventDate datetime not null,
    TableID bigint,
    IPAddress nvarchar(max),
    HostName nvarchar(max),
    ProgramName nvarchar(max),
    LoginName nvarchar(max)
)
```

Don't forget to delete this table once you are done with the investigation.

Then let's create the trigger to log the event:

```sql
alter trigger TriggerInvestigateParentEqualsID
on TableUnderObservation
after insert, update
as begin
    insert into InvestigateParentEqualsID(
    EventDate, TableID, IPAddress, HostName, ProgramName, LoginName
    )
    select
    GETUTCDATE(), I.ID, C.client_net_address, S.host_name, S.program_name, S.login_name
    from inserted I
    cross apply (select * from sys.dm_exec_connections where session_id = @@SPID) C
    cross apply (select * from sys.dm_exec_sessions where session_id = @@SPID) S
    where I.ID = I.ParentID
end
```

To test that the trigger works, let's create a test data:

```sql
insert into TableUnderObservation(
ID, Code, ParentID, UpdatedBy, UpdatedAt
) values(
1, 'A', null, 'yourstruly', GETUTCDATE()
)
```

Then let's do something that should execute the trigger:

```sql
update TableUnderObservation set ParentID = 1 where ID = 1
```

And then check the log table:

```sql
select * from InvestigateParentEqualsID
```

Does the trigger work? If yes, then we can now wait until the trigger captures some events.