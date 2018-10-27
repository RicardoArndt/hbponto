using HBPonto.Kernel.Helpers;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace HBPonto.Kernel.Interfaces.Services
{
    public interface IJiraProjectService
    {
        IEnumerable<JiraProject> GetProjects();
    }
}
