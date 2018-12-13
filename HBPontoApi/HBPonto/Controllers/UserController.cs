using HBPonto.Database.Entities;
using HBPonto.Kernel.DTO;
using HBPonto.Kernel.Enums;
using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Authentication;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize(Roles = "Administrator"), ApiController]
    public class UserController : BaseController
    {
        IUserService _service;
        IJiraUserService _jiraService;

        public UserController(IOptions<AppSettings> appSettings, IUserService service, IJiraUserService jiraService): base(appSettings)
        {
            _service = service;
            _jiraService = jiraService;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            try
            {
                var result = _service.GetAllUsers();

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível buscar os usuários");
            }
        }

        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            try
            {
                var roles = _service.GetRoles();

                return Ok(roles);
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível buscar as funções");
            }
        }

        [HttpPut]
        public IActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                _service.UpdateUser(user);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível atualizar o usuário");
            }
        }

        [HttpGet("current"), AllowAnonymous] 
        public IActionResult GetCurrentUser()
        {
            try
            {
                var result = GetResult<UserDTO>(_jiraService.GetCurrentUser(GetHttpClient()).Result);

                result.avatarUrl = result.avatarUrls.FirstOrDefault().Value;

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível retornar o usuário atual");
            }
        }
    }
}
