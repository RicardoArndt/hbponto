using HBPonto.Database.Entities;
using HBPonto.Database.Contexts;

namespace HBPonto.Database.Repositories
{
    public class UserRepository : BaseRepository<User> 
    {
        public UserRepository(BaseContext context) : base(context) { }
    }
}
