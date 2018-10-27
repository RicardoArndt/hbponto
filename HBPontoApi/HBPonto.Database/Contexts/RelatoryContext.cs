using HBPonto.Database.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Contexts
{
    public class RelatoryContext: DbContext
    {
        public RelatoryContext(DbContextOptions<RelatoryContext> options) : base(options) { }

        public DbSet<Relatory> Relatories { get; set; }
    }
}
