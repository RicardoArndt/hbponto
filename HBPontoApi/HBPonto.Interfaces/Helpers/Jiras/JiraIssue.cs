using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class JiraIssue
    {
        public int id { get; set; }
        public string self { get; set; }
        public string key { get; set; }
        public JiraIssueFields fields { get; set; }
    }
}
