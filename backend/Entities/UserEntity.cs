namespace JournalerBackend.Entities {
    public class UserEntity
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public string ResetPasswordCode { get; set; }
        public DateTime ResetPasswordCodeExpiration { get; set; }
    }
}

