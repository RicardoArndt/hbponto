using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        User InsertNewUser(User user);
        User GetUserByName(string userName);
    }
}
