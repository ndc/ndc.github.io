---
title: Generating Insert Statements from MYSQL to be Run on SQL Server
date: 2013-08-01
layout: blogdetail
published: true
---

I need to copy data from a table in a MYSQL database to a table with the same structure in a SQL Server database. Looks like my best bet to do it is to use MYSQLDUMP to generate insert statements, then run those insert statements in SQL Server.

MYSQLDUMP has a LOT of parameters. So after perusing 6 pages of parameter documentations and some trial and errors, this is the set of parameters that produced insert statements that can be readily run in SQL Server (MYSQL version 5.6.10):

    mysqldump -hMYSQLHOST -uMYSQLUSERNAME -pMYSQLPASSWORD --no-create-info --complete-insert --skip-extended-insert --skip-quote-names --compact MYSQLDBNAME MYSQLTABLENAME

`--no-create-info` tells MYSQL that I don't need _create table_ statements.

`--complete-insert` tells MYSQL to include column names in the insert statements.

`--skip-extended-insert` tells MYSQL to add `INSERT INTO ...` for each row instead of MYSQL style of one `INSERT INTO ...` followed by multiple values.

`--skip-quote-names` tells MYSQL to not put backticks around table and column names.

`--compact` tells MYSQL to not write locking statements, comments, character set statements, etc. around the insert statements.

Example of output:

    INSERT INTO MYSQLTABLENAME (COL1, COL2) VALUES ('1',3);
    INSERT INTO MYSQLTABLENAME (COL1, COL2) VALUES ('8',3);
