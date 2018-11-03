using HBPonto.Kernel.Helpers.Jiras;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Domain.DTOs
{
    public class JiraIssueDTO
    {
        public string key { get; set; }
        public JiraIssueEpic epic { get; set; }
        public string summary { get; set; }
        public string totalTime { get; set; }
        public JiraReporter reporter { get; set; }
        public JiraIssueStatus status { get; set; }
        public JiraIssueTimeTracking timetracking { get; set; }
        //public JiraIssueWorklog worklog { get; set; }

        public JiraIssueDTO() { }

        public JiraIssueDTO(string key, JiraIssueEpic epic, string summary, JiraReporter reporter, JiraIssueStatus status, string totalTime, JiraIssueTimeTracking timetracking)
        {
            this.key = key;
            this.epic = epic;
            this.summary = summary;
            this.reporter = reporter;
            this.status = status;
            this.totalTime = totalTime;
            this.timetracking = timetracking;
        }

        public static JiraIssueDTO CreateDTO(JiraIssue jira)
        {
            int totalTime = jira.fields.worklog.worklogs.Sum(x => x.timeSpentSeconds);

            TimeSpan timeSpan = TimeSpan.FromSeconds(totalTime);
            
            var dto = new JiraIssueDTO(jira.key, jira.fields.epic, jira.fields.summary, jira.fields.reporter, jira.fields.status, string.Format("{0}H", timeSpan.TotalHours), jira.fields.timetracking);

            return dto;
        }
    }
}
