using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class JiraBoardDetails
    {
        public int id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public JiraLocation location { get; set; }
    }

    public class JiraLocation
    {
        public int projectId { get; set; }
        public int userId { get; set; }
        public string userAccountId { get; set; }
        public string name { get; set; }
        public string projectName { get; set; }
        public string projectKey { get; set; }
        public string projectTypeKey { get; set; }
    }
}
