using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class JiraResult<T>
    {
        public int startAt { get; set; }
        public int maxResults { get; set; }
        public int total { get; set; }
        public string prev { get; set; }
        public string next { get; set; }
        public IList<T> dashboards { get; set; }
    }
}
