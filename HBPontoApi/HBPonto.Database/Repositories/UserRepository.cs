using HBPonto.Database.Contexts;
using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Linq;

namespace HBPonto.Database.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private UserContext _context;

        public UserRepository(UserContext context) : base(context)
        {
            _context = context;
        }

        public User InsertNewUser(User user)
        {
            Insert(user);
            SaveAll();
            return user;
        }

        public User GetUserByName(string userName)
        {
            var sqlParameter = new SqlParameter("@UserName", userName);
            var user = _context.Users.FromSql($"SELECT * FROM dbo.Users WHERE UserName = @UserName", sqlParameter).FirstOrDefault();
            return user;
        }
    }
}
