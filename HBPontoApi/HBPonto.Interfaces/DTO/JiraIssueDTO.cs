using HBPonto.Kernel.Helpers.Jiras;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class JiraIssueDTO
    {
        public int id { get; set; }
        public string key { get; set; }
        public JiraIssueEpic epic { get; set; }
        public string summary { get; set; }
        public JiraReporter reporter { get; set; }
        public JiraIssueStatus status { get; set; }
        public JiraIssueTimeTracking timetracking { get; set; }
        //public JiraIssueWorklog worklog { get; set; }

        public JiraIssueDTO() { }

        public JiraIssueDTO(int id, string key, JiraIssueEpic epic, string summary, JiraReporter reporter, JiraIssueStatus status, JiraIssueTimeTracking timetracking)
        {
            this.id = id;
            this.key = key;
            this.epic = epic;
            this.summary = summary;
            this.reporter = reporter;
            this.status = status;
            this.timetracking = timetracking;
        }

        public static JiraIssueDTO CreateDTO(JiraIssue jira)
        {
            return new JiraIssueDTO(jira.id, jira.key, jira.fields.epic, jira.fields.summary, jira.fields.reporter, jira.fields.status, jira.fields.timetracking);
        }
    }
}
