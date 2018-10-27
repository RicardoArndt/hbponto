using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize, ApiController]
    public class JiraProjectController: ControllerBase
    {
        IJiraProjectService _service;

        public JiraProjectController(IJiraProjectService service)
        {
            _service = service;
        }

        [HttpGet("projects")]
        public IActionResult GetAllProjects()
        {
            try
            {
                return Ok(_service.GetProjects().ToList());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
