using Renci.SshNet;

var url = Utils.GetEnvironmentVariable("ServerSSHPath");
var sshUser = Utils.GetEnvironmentVariable("ServerSSHUsername");
var privateKeyFilePath = Utils.GetEnvironmentVariable("PrivateKeyFilePath");
var databaseUser = Utils.GetEnvironmentVariable("ServerDatabaseUsername");
var databasePassword = Utils.GetEnvironmentVariable("ServerDatabasePassword");
var databaseUrl = Utils.GetEnvironmentVariable("ServerDatabaseUrl");
var databaseName = Utils.GetEnvironmentVariable("ServerDatabaseName");
var backupPath = Utils.GetEnvironmentVariable("BackupPath");
var backupFilePath = Path.Combine(backupPath, $"{DateTime.Now:yyyy-MM-dd}.txt");

Directory.CreateDirectory(backupPath);

using var client = new SshClient(url, sshUser, new PrivateKeyFile(privateKeyFilePath));

client.Connect();
using var cmd = client.RunCommand($"PGPASSWORD={databasePassword} pg_dump -h {databaseUrl} -U {databaseUser} -d {databaseName}");

File.WriteAllText(backupFilePath, cmd.Result);

Console.WriteLine($"Database backup file created successfully at {backupFilePath}");

static class Utils {
    public static string GetEnvironmentVariable(string environmentVariable) =>
        Environment.GetEnvironmentVariable(environmentVariable) ?? 
            throw new InvalidOperationException($"Failed to get Environment Variable {environmentVariable}.");
}