using Microsoft.EntityFrameworkCore;

namespace loginApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Agent> Agent { get; set; }
        public DbSet<Patient> Patients { get; set; } 
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }
    }
}
