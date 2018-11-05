using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Authentication
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        void UpdateUser(User user);
    }
}
