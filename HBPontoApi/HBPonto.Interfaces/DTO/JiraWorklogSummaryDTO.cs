using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class JiraWorklogSummaryDTO
    {
        public string timeSpent { get; private set; }
        public string comment { get; private set; }
        public string started { get; private set; }

        public JiraWorklogSummaryDTO(string timeSpent, string comment, string started)
        {
            this.timeSpent = timeSpent;
            this.comment = comment;
            this.started = started;
        }

        public static JiraWorklogSummaryDTO Create(string timeSpent, string comment, string started)
        {
            return new JiraWorklogSummaryDTO(timeSpent, comment, started);
        }
    }
}
