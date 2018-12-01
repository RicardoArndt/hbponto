using HBPonto.Kernel.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Domain.Services
{
    public class CalcWorklogService : ICalcWorklogService
    {
        public double CalcPorcentForIssue(int totalEstimated, int estimated)
        {
            return (double)(estimated * 100) / totalEstimated;
        }

        public int GetSecondsForIssue(double porcentForIssue, int timeWorklogInformed)
        {
            return Convert.ToInt32((porcentForIssue * timeWorklogInformed) / 100);
        }
    }
}
