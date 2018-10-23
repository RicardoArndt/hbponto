namespace HBPonto.Database.Entities
{
    public class User : BaseEntity<User>
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
