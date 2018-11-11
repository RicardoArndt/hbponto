using HBPonto.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Maps
{
    public class RelatoryMap : IEntityTypeConfiguration<Relatory>
    {
        void IEntityTypeConfiguration<Relatory>.Configure(EntityTypeBuilder<Relatory> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Jira).HasMaxLength(50).IsRequired(true);
            builder.Property(u => u.Started).IsRequired(true);
            builder.Property(u => u.Time).IsRequired(true);
            builder.HasOne(u => u.User);
            builder.ToTable("Relatories");
        }

        internal static class RelatoryMapFactory
        {
            public static RelatoryMap CreateInstance()
            {
                return new RelatoryMap();
            }
        }
    }
}
