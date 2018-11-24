using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class JiraShareWorklogDTO
    {
        public List<JiraIssuesForPostWorklogDTO> Issues { get; set; }
        public JiraWorklogDTO Worklog { get; set; }
    }
}
