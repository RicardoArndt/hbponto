using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize(Roles = "Administrator"), ApiController]
    public class UserController : BaseController
    {
        IJiraUserService _service;

        public UserController(IJiraUserService service)
        {
            _service = service;
        }

        [HttpGet("/{username}")]
        public IActionResult GetUserByName([FromQuery] string username)
        {
            try
            {
                var response = _service.GetUser(username).Result;
                var jiraProjects = GetResult<JiraUser>(response);
                return Ok(jiraProjects);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
