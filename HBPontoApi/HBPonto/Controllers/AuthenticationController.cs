using HBPonto.Kernel.Error;
using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), ApiController]
    public class AuthenticationController : BaseController
    {
        private IAuthenticationService _authentication;

        public AuthenticationController(IOptions<AppSettings> appSettings, IAuthenticationService authentication): base(appSettings)
        {
            _authentication = authentication;
        }

        [HttpPost]
        public IActionResult LogIn([FromBody]AuthUser authUser)
        {
            try
            {
                var response = _authentication.AuthorizationUser(authUser);

                ErrorHandler.Handler(response.Result.Item1.StatusCode);

                var user = _authentication.GenerateToken(authUser);

                return Ok(_authentication.CreateUser(authUser.username, response.Result.Item2, user));
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized();
            } 
            catch (Exception ex)
            {
                return BadRequest();
            } 
        }

        [HttpGet, Authorize]
        public IActionResult ValidateAuthorization()
        {
            try
            {
                var response = _authentication.AuthorizeCurrentUser(GetHttpClient());

                ErrorHandler.Handler(response.Result.StatusCode);

                return Ok();
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return BadRequest("Verifique a conexão com a internet ou tente se logar novamente");
            }
        }
    }
}
