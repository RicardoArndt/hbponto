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
using HBPonto.Kernel.DTO;
using System.Text;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize, ApiController]
    public class JiraProjectController : BaseController
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
                List<JiraIssueDTO> dtoList = jiraResult.issues.Select(x => JiraIssueDTO.CreateDTO(x)).ToList();
                return Ok(dtoList);
            }
            catch(Exception)
            {
                return BadRequest("Não foi possível buscar os issues, por favor tente novamente mais tarde.");
            }
        }

        [HttpPost("issue/{issueId}")]
        public IActionResult PostWorklog([FromBody]JiraWorklogDTO jiraIssue, int issueId)
        {
            try
            {
                var data = DateTimeOffset.Parse(jiraIssue.started);
                var s = data.ToString("yyyy-MM-ddThh:mm:ss.fffK");
                jiraIssue.started = s.Substring(0, 26) + s.Substring(27, 2);
                var json = JsonConvert.SerializeObject(jiraIssue);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = _service.AddWorklog(issueId, content);
                var result = PostResult(response.Result);
                return Ok(result);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível registrar horas de trabalho");
            }
        }
    }
}
