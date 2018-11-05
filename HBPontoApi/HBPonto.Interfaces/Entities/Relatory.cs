using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Entities
{
    public class Relatory : BaseEntity<Relatory>
    {
        public string UserName { get; set; }
        public string Jira { get; set; }
        public DateTime Time { get; set; }
    }
}
