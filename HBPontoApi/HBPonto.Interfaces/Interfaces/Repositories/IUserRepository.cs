using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Repositories
{
    public interface IUserRepository : IBaseRepository<IUser>
    {
        IUser InsertNewUser(IUser user);
    }
}
