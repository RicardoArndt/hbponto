using HBPonto.Database.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Domain.Services
{
    public interface IRelatoryService
    {
        List<Relatory> GetAllRelatories();
        void SaveRelatory(Relatory relatory);
    }
}
