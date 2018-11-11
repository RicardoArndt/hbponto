using HBPonto.Database.Contexts;
using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Entities;
using HBPonto.Kernel.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Repositories
{
    public class RelatoryRepository: BaseRepository<Relatory>, IRelatoryRepository
    {
        private RelatoryContext _context;

        public RelatoryRepository(RelatoryContext context): base(context)
        {
            _context = context;
        }

        public IEnumerable<Relatory> GetAllRelatories()
        {
            return _context.Relatories.Include(relatory => relatory.User);
        }
    }
}
