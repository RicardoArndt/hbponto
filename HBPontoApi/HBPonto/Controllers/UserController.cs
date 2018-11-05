using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

                return Ok(JsonConvert.SerializeObject(result));
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível buscar os usuários");
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
