# Project Notes

## Run Website
* To run front and back end: `npm start`

## Commands
**Database**
### Database

* Show services: `brew services list`
* Start db: `brew services start postgresql`
* Restart db: `brew services restart postgresql`
* Stop db: `brew services stop postgresql`
* Enter postgresql shell: `psql postgres`
* Enter at specific: `psql -U trevorbuchanan -d buchanantrader`
* Make db: `CREATE DATABASE <database-name>;`
* Check permissions: `SELECT * FROM pg_roles WHERE rolname='trevorbuchanan';`
* Show dbs: `\l`
* Connect to database: `\c buchanantraderdb;`
* Exit: `\q`
* Integrate into project `npm install pg`
* Create db user: `CREATE USER <username> WITH PASSWORD '<password>';`
* Grant privileges: `GRANT ALL PRIVILEGES ON DATABASE <database-name> TO <username>`;
* Drop db: `DROP DATABASE <database-name> IF EXISTS <database_name>;`
* Drop role: `DROP ROLE IF EXISTS buchanan;`

**Misc**
* Show which process is running on port-number: `lsof -i :<port-number>`
* Kill process: `kill -9 <PID>`
