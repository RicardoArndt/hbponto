using HBPonto.Kernel.Interfaces.Entities;

namespace HBPonto.Database.Entities
{
    public class BaseEntity<TEntity> : IEntity where TEntity: class 
    {
        public int Id { get; set; }
    }
}
