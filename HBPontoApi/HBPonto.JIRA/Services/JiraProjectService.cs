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
        IJiraBaseService _jiraBaseService;

        public JiraProjectService(IOptions<AppSettings> appSettings, IJiraBaseService jiraBaseService)
        {
            _appSettings = appSettings.Value;
            _jiraBaseService = jiraBaseService;
        }

        public async Task<HttpResponseMessage> GetProjects()
        {
            HttpClient client = _jiraBaseService.GetHttpClient(_appSettings.AuthJiraToken);
            var url = "/rest/agile/1.0/board";
            return await client.GetAsync(url);
        }

        public async Task<HttpResponseMessage> GetSprints(int boardId)
        {
            HttpClient client = _jiraBaseService.GetHttpClient(_appSettings.AuthJiraToken);
            var url = $"/rest/agile/1.0/board/{boardId}/sprint";
            return await client.GetAsync(url);
        }
    }
}
