using HBPonto.Kernel.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HBPonto.Database.Entities
{
    [Table("Users")]
    public class User : BaseEntity<User>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }

        public static class UserFactory
        {
            public static User Create(string username, string role)
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
