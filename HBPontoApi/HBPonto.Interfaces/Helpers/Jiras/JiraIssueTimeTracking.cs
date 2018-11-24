using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class JiraIssueTimeTracking
    {
        public string originalEstimate { get; set; }
        public string remainingEstimate { get; set; }
        public string timeSpent { get; set; }
        public int timeSpentSeconds { get; set; }
        public int originalEstimateSeconds { get; set; }
    }
}
