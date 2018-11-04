using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Entities
{
    public class User : BaseEntity<User>, IUser
    {
        public string UserName { get; set; }
        public string Role { get; set; }

        public static class UserFactory
        {
            public static IUser Create(string username, string role)
            {
                return new User()
                {
                    UserName = username,
                    Role = role
                };
            }
        }
    }
}
