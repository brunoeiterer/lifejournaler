# Database Backup Script
The Database Backup Script is a simple C# program used to connect to the server via SSH, generate the database dump using the POSTGRESQL `pg_dump` command and saving it locally to a file.

## Running the script
- Set up the following required environment variables:
  - ServerSSHPath: The server url
  - ServerSSHUsername: The username used to connect via SSH to the server
  - PrivateKeyFilePath: The path where the SSH authentication private key is located
  - ServerDatabaseUsername: The username used to connect to the database
  - ServerDatabasePassword: The password used to connect to the database
  - ServerDatabaseUrl: The url address of the database in the server
  - ServerDatabaseName: The name of the database
  - BackupPath: The path where to store the backups  
- Clone the repository:
```
git clone https://github.com/brunoeiterer/lifejournaler.git  
cd lifejournaler/scripts/database-backup
```
- Build and run
```
dotnet run
```
## Scheduling as a task
The script can also be scheduled to run periodically using the OS scheduler. To do so create a new task to execute the .exe generated from the dotnet run command.
