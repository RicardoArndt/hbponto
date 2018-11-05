using HBPonto.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HBPonto.Database.Maps
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        void IEntityTypeConfiguration<User>.Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.UserName).HasMaxLength(50);
            builder.Property(u => u.Role).HasMaxLength(50);
            builder.ToTable("dbo.Users");
        }

        internal static class UserMapFactory
        {
            public static UserMap CreateInstance()
            {
                return new UserMap();
            }
        }
    }
}
