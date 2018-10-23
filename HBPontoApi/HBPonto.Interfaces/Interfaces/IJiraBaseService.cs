using System.Net.Http;
using System.Net.Http.Headers;

namespace HBPonto.Kernel.Interfaces
{
    public interface IJiraBaseService
    {
        string GetAuthenticationString(string username, string password);
        HttpClient GetHttpClient(string authentication);
    }
}
