using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers
{
    public class JiraProject
    {
        public int id { get; set; }
        public string name { get; set; }
        public string self { get; set; }
        public string key { get; set; }
        public List<string> avatarUrls { get; set; }
        public List<string> projectCategory { get; set; }
    }
}
