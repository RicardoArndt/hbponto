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

    }
}
