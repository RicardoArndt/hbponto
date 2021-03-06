﻿using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class JiraIssueFields
    {
        public JiraIssueEpic epic { get; set; }
        public string summary { get; set; }
        public string customfield_10712 { get; set; } //Pontuação
        public string customfield_10715 { get; set; } //Código Epico (API2)
        public JiraReporter reporter { get; set; }
        public JiraIssueStatus status { get; set; }
        public IList<JiraIssueSubTasks> subtasks { get; set; }
        public JiraIssueWorklog worklog { get; set; }
        public JiraIssueType issuetype { get; set; }
        public SprintValues sprint { get; set; }
        public JiraIssueTimeTracking timetracking { get; set; } 
        public IList<JiraIssueLinks> issuelinks { get; set; }
        public JiraUser user { get; set; }
    }
}
