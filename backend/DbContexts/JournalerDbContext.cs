using Microsoft.EntityFrameworkCore;
using JournalerBackend.Entities;

namespace JournalerBackend.DbContexts {
    public class JournalerDbContext(DbContextOptions<JournalerDbContext> dbContextOptions) : DbContext( dbContextOptions )
    {
        public DbSet<EntryEntity> Entries { get; set; }
        public DbSet<UserEntity> Users{ get; set; }
    }
}



