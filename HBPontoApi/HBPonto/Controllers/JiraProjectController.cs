using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Collections.Generic;
using HBPonto.Kernel.Error;

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
                var response = _service.GetProjects().Result;
                var result = response.Content.ReadAsStringAsync().Result;
                ErrorHandler.Handler(response.StatusCode);
                JiraProject jiraProjects = JsonConvert.DeserializeObject<JiraProject>(result);
                return Ok(jiraProjects);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("sprints/{boardId}")]
        public IActionResult GetSprints(int boardId)
        {
            try
            {
                var response = _service.GetSprints(boardId).Result;
                var result = response.Content.ReadAsStringAsync().Result;
                ErrorHandler.Handler(response.StatusCode);
                JiraSprints jiraSprints = JsonConvert.DeserializeObject<JiraSprints>(result);
                jiraSprints.values = jiraSprints.values.Where(x => x.state != "closed").ToList();
                return Ok(jiraSprints);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
