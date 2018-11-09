using HBPonto.Database.Entities;
using HBPonto.Kernel.Enums;
using HBPonto.Kernel.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize(Roles = "Administrator"), ApiController]
    public class UserController : BaseController
    {
        IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
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
    }
}
