using HBPonto.Kernel.Error;
using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticationService _authentication;

        public AuthenticationController(IAuthenticationService authentication)
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

                var token = _authentication.GenerateToken(authUser);

                return Ok(_authentication.CreateUser(authUser.username, response.Result.Item2, token));
            }
            catch (UnauthorizedAccessException)
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
                var response = _authentication.AuthorizeCurrentUser();

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
