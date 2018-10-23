﻿using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Repositories
{
    public interface IBaseRepository<T>
    {
        T GetByKey(params string[] key);
        void Insert(T insertObj);
        void Delete(T obj);
        void Update(T updateObj);
    }
}
