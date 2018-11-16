using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class JiraWorklogSummaryWithSecondsDTO
    {
        public int timeSpentSeconds { get; private set; }
        public string comment { get; private set; }
        public string started { get; private set; }

        public JiraWorklogSummaryWithSecondsDTO(int timeSpentSeconds, string comment, string started)
        {
            this.timeSpentSeconds = timeSpentSeconds;
            this.comment = comment;
            this.started = started;
        }

        public static JiraWorklogSummaryWithSecondsDTO Create(JiraWorklogDTO worklog)
        {
            return new JiraWorklogSummaryWithSecondsDTO(worklog.timeSpentSeconds, worklog.comment, worklog.started);
        }
    }
}
