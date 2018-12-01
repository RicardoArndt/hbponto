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
        Task<HttpResponseMessage> GetBoard(int boardId);
        Task<HttpResponseMessage> GetSprints(int boardId);
        Task<HttpResponseMessage> GetIssues(int boardId, int sprintId);
        Task<HttpResponseMessage> GetIssue(int issueId);
        Task<HttpResponseMessage> AddWorklog(string issueId, HttpContent content);
    }
}
