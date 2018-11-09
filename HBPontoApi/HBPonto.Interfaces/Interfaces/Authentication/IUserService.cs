using HBPonto.Database.Entities;
using HBPonto.Kernel.Enums;
using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Authentication
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        List<RoleEnum> GetRoles();
        void UpdateUser(User user);
    }
}
