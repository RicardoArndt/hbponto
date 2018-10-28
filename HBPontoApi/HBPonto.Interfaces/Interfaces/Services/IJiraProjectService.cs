using HBPonto.Kernel.Helpers;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HBPonto.Kernel.Interfaces.Services
{
    public interface IJiraProjectService
    {
        Task<HttpResponseMessage> GetProjects();
        Task<HttpResponseMessage> GetSprints(int boardId);
    }
}
