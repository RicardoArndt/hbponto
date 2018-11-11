using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HBPonto.Database.Entities
{
    [Table("Relatories")]
    public class Relatory : BaseEntity<Relatory>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Jira { get; set; }
        public DateTime Started { get; set; }
        public string Time { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }

        public static class RelatoryFactory
        {
            public static Relatory Create(string userId, string jira, DateTime started, string time)
            {
                return new Relatory()
                {
                    UserId = userId,
                    Jira = jira,
                    Started = started,
                    Time = time
                };
            }
        }
    }
}
