using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Services
{
    public interface ICalcWorklogService
    {
        double CalcPorcentForIssue(int totalEstimated, int estimated);
        int GetSecondsForIssue(double porcentForIssue, int timeWorklogInformed);
    }
}
