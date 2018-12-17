using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.DTOs;
using System.Net.Http;
using System.Threading.Tasks;

namespace HBPonto.Kernel.Interfaces.Authentication
{
    public interface IAuthenticationService
    {
        string GenerateToken(AuthUser authUser);
        Task<(HttpResponseMessage, string)> AuthorizationUser(AuthUser authUser);
        Task<HttpResponseMessage> AuthorizeCurrentUser(HttpClient client);
        IAuthUserDTO CreateUser(string userName, string authJiraToken, string token);
    }
}
