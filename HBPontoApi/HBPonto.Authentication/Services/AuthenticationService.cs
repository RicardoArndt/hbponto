using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Authentication;
using HBPonto.Kernel.Interfaces.DTOs;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static HBPonto.Authentication.DTOs.AuthUserDTO;

namespace HBPonto.Authentication.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly AppSettings _appSettings;
        private IJiraBaseService _jiraBaseService;

        public AuthenticationService(IOptions<AppSettings> appSettings, IJiraBaseService jiraBaseService)
        {
            _appSettings = appSettings.Value;
            _jiraBaseService = jiraBaseService;
        }

        public IAuthUserDTO CreateUser(string userName, string authJiraToken, string token)
        {
            return AuthUserDTOFactory.Create(userName, authJiraToken, token);
        }

        public async Task<(HttpResponseMessage, string)> AuthorizationUser(AuthUser authUser)
        {
            var authentication = _jiraBaseService.GetAuthenticationString(authUser.username, authUser.password);
            HttpClient client = _jiraBaseService.GetHttpClient(authentication);

            var url = $"/rest/auth/1/session";

            var stringContent = new StringContent(JsonConvert.SerializeObject(authUser), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, stringContent);

            return (response, authentication);
        }

        public async Task<HttpResponseMessage> AuthorizeCurrentUser()
        {
            HttpClient client = _jiraBaseService.GetHttpClient(_appSettings.AuthJiraToken);

            var url = $"/rest/auth/1/session";

            return await client.GetAsync(url);
        }

        public string GenerateToken(AuthUser authUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, authUser.username)
                }),
                Expires = DateTime.UtcNow.AddYears(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
