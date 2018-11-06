using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Authentication;
using HBPonto.Kernel.Interfaces.DTOs;
using HBPonto.Kernel.Interfaces.Repositories;
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
using static HBPonto.Database.Entities.User;

namespace HBPonto.Authentication.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly AppSettings _appSettings;
        private IJiraBaseService _jiraBaseService;
        private IUserRepository _userRepository;

        public AuthenticationService(IOptions<AppSettings> appSettings, IJiraBaseService jiraBaseService, IUserRepository userRepository)
        {
            _appSettings = appSettings.Value;
            _jiraBaseService = jiraBaseService;
            _userRepository = userRepository;
        }

        public IAuthUserDTO CreateUser(string userName, string authJiraToken, string token, string userId)
        {
            return AuthUserDTOFactory.Create(userName, authJiraToken, token, userId);
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

        public (string, string) GenerateToken(AuthUser authUser)
        {
            //Método busca um usuário no banco se não encontrar então insere um novo usuário e retorna o usuário inserido
            //por isso a geração do token deve ser feita depois de consultar no jira se usuário existe e depois de manipular o erro
            var user = _userRepository.GetByKey(authUser.username) ?? _userRepository.InsertNewUser(UserFactory.Create(authUser.username, ""));
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.Role ?? string.Empty)
                }),
                Expires = DateTime.UtcNow.AddYears(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return (tokenHandler.WriteToken(token), user.Id);
        }
    }
}
