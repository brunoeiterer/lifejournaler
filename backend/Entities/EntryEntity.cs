using System.Text.Json.Serialization;

namespace JournalerBackend.Entities {
    public class EntryEntity {
        public int Id { get; set; }
        public required string Entry { get; set; }
        public string Mood { get; set; }
        public DateTime Date { get; set; }
        [JsonIgnore]
        public virtual UserEntity User {get; set;}
    }
}

