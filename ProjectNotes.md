# Project Notes

## Run Website
* To run front and back end: `npm start`

## Commands
**Database**
* Start db: `brew services start postgresql`
* Restart db: `brew services restart postgresql`
* Stop db: `brew services stop postgresql`
* Enter postgresql shell: `psql postgres`
* Make db: `CREATE DATABASE <database-name>;`
* Show dbs: `/l`
* Exit: `\q`
* Integrate into project `npm install pg`
* Create db user: `CREATE USER <username> WITH PASSWORD '<password>';`
* Grant privileges: `GRANT ALL PRIVILEGES ON DATABASE <database-name> TO <username>`;
* Drop db: `DROP DATABASE <database-name>`


**Misc**
* Show which process is running on port-number: `lsof -i :<port-number>`
* Kill process: `kill -9 <PID>`
