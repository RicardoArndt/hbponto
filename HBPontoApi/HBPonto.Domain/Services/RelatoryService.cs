using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Domain.Services;
using HBPonto.Kernel.Interfaces.Repositories;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Domain.Services
{
    public class RelatoryService : IRelatoryService
    {
        private IRelatoryRepository _relatoryRepository;

        public RelatoryService(IRelatoryRepository relatoryRepository)
        {
            _relatoryRepository = relatoryRepository;
        }

        public List<Relatory> GetAllRelatories()
        {
            return _relatoryRepository.GetAll().ToList();
        }

        public void SaveRelatory(Relatory relatory)
        {
            _relatoryRepository.Insert(relatory);
            _relatoryRepository.SaveAll();
        }
    }
}
