using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class JiraWorklogDTO
    {
        public string key { get; set; }
        public string timeSpent { get; set; }
        public int timeSpentSeconds { get; set; }
        public string comment { get; set; }
        public string started { get; set; }
    }
}
