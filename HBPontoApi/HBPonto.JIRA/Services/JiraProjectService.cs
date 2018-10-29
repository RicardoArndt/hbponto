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
            _client = _jiraBaseService.GetHttpClient(_appSettings.AuthJiraToken);
        }

        public async Task<HttpResponseMessage> GetProjects()
        {
            return await _client.GetAsync("/rest/agile/1.0/board");
        }

        public async Task<HttpResponseMessage> GetSprints(int boardId)
        {
            return await _client.GetAsync($"/rest/agile/1.0/board/{boardId}/sprint");
        }

        public async Task<HttpResponseMessage> GetIssues(int boardId, int sprintId)
        {
            return await _client.GetAsync($"/rest/agile/1.0/board/{boardId}/sprint/{sprintId}/issue");
        }
    }
}
