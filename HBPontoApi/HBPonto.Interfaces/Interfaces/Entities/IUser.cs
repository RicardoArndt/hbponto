using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Entities
{
    public interface IUser : IEntity
    {
        string UserName { get; set; }
        string Role { get; set; }
    }
}
