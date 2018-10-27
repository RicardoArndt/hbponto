using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

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

        public IEnumerable<JiraProject> GetProjects()
        {
            HttpClient client = _jiraBaseService.GetHttpClient(_appSettings.AuthJiraToken);
            List<JiraProject> jiraSprints = new List<JiraProject>();

            var url = "/rest/api/2/project";
            var result = client.GetAsync(url).Result;
            var content = result.Content.ReadAsStringAsync();
            var jiraResult = JsonConvert.DeserializeObject<List<JiraProject>>(content.Result);

            jiraSprints.AddRange(jiraResult);

            return jiraSprints;
        }
    }
}
