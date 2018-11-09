using HBPonto.Database.Entities;
using Microsoft.EntityFrameworkCore;
using static HBPonto.Database.Maps.RelatoryMap;

namespace HBPonto.Database.Contexts
{
    public class RelatoryContext: DbContext
    {
        public RelatoryContext(DbContextOptions<RelatoryContext> options) : base(options) { }

        public DbSet<Relatory> Relatories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(RelatoryMapFactory.CreateInstance());
        }
    }
}
