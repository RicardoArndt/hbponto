using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HBPonto.JIRA.Services
{
    public class JiraProjectService: IJiraProjectService
    {
        private readonly AppSettings _appSettings;
        private static HttpClient _client;
        IJiraBaseService _jiraBaseService;

        public JiraProjectService(IOptions<AppSettings> appSettings, IJiraBaseService jiraBaseService)
        {
            _appSettings = appSettings.Value;
            _jiraBaseService = jiraBaseService;
        }

        public async Task<HttpResponseMessage> GetProjects(HttpClient client)
        {
            return await client.GetAsync("/rest/agile/1.0/board");
        }

        public async Task<HttpResponseMessage> GetBoard(HttpClient client, int boardId)
        {
            return await client.GetAsync($"/rest/agile/1.0/board/{boardId}");
        }

        public async Task<HttpResponseMessage> GetSprints(HttpClient client, int boardId)
        {
            return await client.GetAsync($"/rest/agile/1.0/board/{boardId}/sprint");
        }

        public async Task<HttpResponseMessage> GetIssues(HttpClient client, int boardId, int sprintId)
        {
            return await client.GetAsync($"/rest/agile/1.0/board/{boardId}/sprint/{sprintId}/issue");
        }

        public async Task<HttpResponseMessage> GetIssue(HttpClient client, int issueId)
        {
            return await client.GetAsync($"/rest/agile/1.0/issue/{issueId}");
        }

        public async Task<HttpResponseMessage> AddWorklog(HttpClient client, string issueId, HttpContent content)
        {
            return await client.PostAsync($"/rest/api/2/issue/{issueId}/worklog", content);
        }
    }
}
