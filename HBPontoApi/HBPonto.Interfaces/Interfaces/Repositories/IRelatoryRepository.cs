using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Repositories
{
    public interface IRelatoryRepository : IBaseRepository<Relatory>
    {
        IEnumerable<Relatory> GetAllRelatories();
    }
}
