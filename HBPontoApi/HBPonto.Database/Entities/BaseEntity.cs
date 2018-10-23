using HBPonto.Kernel.Interfaces.Entities;

namespace HBPonto.Database.Entities
{
    public class BaseEntity<TEntity> : IEntity where TEntity: class 
    {
        public decimal ID { get; set; }
    }
}
