using HBPonto.Database.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class RelatoryDTO
    {
        public string Jira { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string UserName { get; set; }

        public static RelatoryDTO Create(Relatory relatory)
        {
            return new RelatoryDTO()
            {
                Jira = relatory.Jira,
                Date = relatory.Started.ToString("dd/MM"),
                Time = relatory.Time,
                UserName = relatory.User.UserName
            };
        }
    }
}
