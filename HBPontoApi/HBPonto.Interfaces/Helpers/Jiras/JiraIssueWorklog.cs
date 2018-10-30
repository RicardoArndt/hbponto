using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class JiraIssueWorklog
    {
        public int total { get; set; }
        public IList<JiraIssueWorklogs> worklogs { get; set; }
    }

    public class JiraIssueWorklogs
    {
        public int timeSpentSeconds { get; set; }
        public string timeSpent { get; set; }
        public DateTime started { get; set; }
        public Author author { get; set; }
    }

    public class Author
    {
        public string self { get; set; }
        public string name { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
    }
}
