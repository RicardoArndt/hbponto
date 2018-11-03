using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HBPonto.JIRA.Services
{
    public class JiraUserService: IJiraUserService
    {
        private readonly AppSettings _appSettings;
        private static HttpClient _client;
        IJiraBaseService _jiraBaseService;

        public JiraUserService(IOptions<AppSettings> appSettings, IJiraBaseService jiraBaseService)
        {
            _appSettings = appSettings.Value;
            _jiraBaseService = jiraBaseService;
            _client = _jiraBaseService.GetHttpClient(_appSettings.AuthJiraToken);
        }

        public async Task<HttpResponseMessage> GetUser(string userName)
        {
            return await _client.GetAsync($"/rest/api/2/user?username={userName}");
        }
    }
}
