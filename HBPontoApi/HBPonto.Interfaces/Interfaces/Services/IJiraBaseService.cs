using HBPonto.Kernel.Helpers;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;

namespace HBPonto.Kernel.Interfaces.Services
{
    public interface IJiraBaseService
    {
        string GetAuthenticationString(string username, string password);
        HttpClient GetHttpClient(string authentication);
    }
}
