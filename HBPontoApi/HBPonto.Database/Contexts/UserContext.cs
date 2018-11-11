using HBPonto.Database.Entities;
using Microsoft.EntityFrameworkCore;
using static HBPonto.Database.Maps.UserMap;

namespace HBPonto.Database.Contexts
{
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(UserMapFactory.CreateInstance());
        }
    }
}
