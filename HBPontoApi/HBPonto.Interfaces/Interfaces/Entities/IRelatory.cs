using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Entities
{
    public interface IRelatory
    {
        string UserName { get; set; }
        string Jira { get; set; }
        DateTime Time { get; set; }
    }
}
