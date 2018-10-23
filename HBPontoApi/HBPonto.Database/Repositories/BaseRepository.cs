﻿using HBPonto.Database.Contexts;
using HBPonto.Kernel.Interfaces.Repositories;
using System;

namespace HBPonto.Database.Repositories
{
    public class BaseRepository<T>: IDisposable, IBaseRepository<T> where T: class
    {
        private BaseContext _context;

        public BaseRepository(BaseContext context)
        {
            _context = context;
        }

        public T GetByKey(params string[] key)
        {
            return _context.Set<T>().Find(key);
        }

        public void Insert(T insertObj)
        {
            _context.Set<T>().Add(insertObj);
        }

        public void Delete(T obj)
        {
            _context.Set<T>().Remove(obj);
        }

        public void Update(T updateObj)
        {
            _context.Set<T>().Update(updateObj);
        }

        public void SaveAll()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
