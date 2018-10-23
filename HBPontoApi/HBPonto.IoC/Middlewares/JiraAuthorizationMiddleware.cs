using HBPonto.Kernel.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HBPonto.IoC.Middlewares
{
    public class JiraAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        public static readonly List<(string, StringValues)> RequestHeaders = new List<(string, StringValues)>();
        public AppSettings _appSettings;

        public JiraAuthorizationMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context)
        {
            var uniqueRequestHeaders = context.Request.Headers
                                                        .Select(x => (x.Key, x.Value));

            RequestHeaders.AddRange(uniqueRequestHeaders);

            var tokenJira = RequestHeaders.FirstOrDefault(x => x.Item1 == "Set-Cookie" && !string.IsNullOrEmpty(x.Item2));

            if (tokenJira.Item1 != null) _appSettings.AuthJiraToken = tokenJira.Item2.FirstOrDefault().ToString();

            await _next.Invoke(context);
        }
    }
}
