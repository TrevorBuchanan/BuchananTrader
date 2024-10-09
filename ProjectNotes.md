# Project Notes

### To identify process using PORT_NUMBER: `lsof -i :<PORT_NUMBER>`

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
* Kill process: `kill -9 <PID>`
