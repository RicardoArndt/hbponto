using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class JiraShareWorklogDTO
    {
        public string[] IssuesIds { get; set; }
        public JiraWorklogDTO Worklog { get; set; }
    }
}
