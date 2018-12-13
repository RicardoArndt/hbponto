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
        IJiraBaseService _jiraBaseService;

        public JiraUserService(IOptions<AppSettings> appSettings, IJiraBaseService jiraBaseService)
        {
            _appSettings = appSettings.Value;
            _jiraBaseService = jiraBaseService;
        }

        public async Task<HttpResponseMessage> GetCurrentUser(HttpClient client)
        {
            return await client.GetAsync($"/rest/api/2/myself");
        }
    }
}
