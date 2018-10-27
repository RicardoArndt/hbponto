using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace HBPonto.JIRA.Services
{
    public class JiraBaseService : IJiraBaseService
    {
        private readonly AppSettings _appSettings;

        public JiraBaseService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public string GetAuthenticationString(string username, string password)
        {
            var byteArray = Encoding.ASCII.GetBytes($"{username}:{password}");
            return Convert.ToBase64String(byteArray);
        }

        public HttpClient GetHttpClient(string authenticationString)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(_appSettings.HostJira);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authenticationString);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }
    }
}
