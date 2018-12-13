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
        Task<HttpResponseMessage> GetProjects(HttpClient client);
        Task<HttpResponseMessage> GetBoard(HttpClient client, int boardId);
        Task<HttpResponseMessage> GetSprints(HttpClient client, int boardId);
        Task<HttpResponseMessage> GetIssues(HttpClient client, int boardId, int sprintId);
        Task<HttpResponseMessage> GetIssue(HttpClient client, int issueId);
        Task<HttpResponseMessage> AddWorklog(HttpClient client, string issueId, HttpContent content);
    }
}
