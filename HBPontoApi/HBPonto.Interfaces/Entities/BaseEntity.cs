using HBPonto.Kernel.Interfaces.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HBPonto.Database.Entities
{
    public class BaseEntity<TEntity> : IEntity where TEntity: class 
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
    }
}
