using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Contexts
{
    public class UserContext : BaseContext
    {
        public UserContext(DbContextOptions<BaseContext> options): base(options) { }
    }
}
