﻿using HBPonto.Kernel.Helpers;
using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Collections.Generic;
using HBPonto.Kernel.Error;
using System.Net.Http;

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
                var jiraProjects = GetResult<JiraSprints>(response);
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
                var jiraSprints = GetResult<JiraSprints>(response);
                jiraSprints.values = jiraSprints.values.Where(x => x.state != "closed").ToList();
                return Ok(jiraSprints);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return BadRequest("Você não possui acesso a consulta dessa Sprint.");
            }
        }

        [HttpGet("{boardId}/sprint/{sprintId}/issue")]
        public IActionResult GetIssues(int boardId, int sprintId)
        {
            try
            {
                var response = _service.GetIssues(boardId, sprintId).Result;
                var jiraResult = GetResult<JiraIssuesResult>(response);
                return Ok(jiraResult);
            }
            catch(Exception)
            {
                return BadRequest("Não foi possível buscar os issues, por favor tente novamente mais tarde.");
            }
        }

        private T GetResult<T>(HttpResponseMessage response)
        {
            var result = response.Content.ReadAsStringAsync().Result;
            ErrorHandler.Handler(response.StatusCode);
            return JsonConvert.DeserializeObject<T>(result);
        }
    }
}