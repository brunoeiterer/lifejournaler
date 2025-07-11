using System.Text.Json.Serialization;

namespace JournalerBackend.Entities {
    public class EntryEntity {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Mood { get; set; }
        public string Weather { get; set; }
        public string SleepQuality { get; set; }
        public bool Menstruation { get; set; }
        public bool Exercise { get; set; }
        public int AnxietyThoughts { get; set; }
        public int DepressiveThoughts { get; set; }
        public int AutoCriticism { get; set; }
        public int SensorialOverload { get; set; }
        public string Notes { get; set; }
        
        [JsonIgnore]
        public virtual UserEntity User {get; set;}
    }
}

