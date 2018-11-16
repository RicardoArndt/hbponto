using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using HBPonto.Kernel.DTO;
using HBPonto.Kernel.Interfaces.Domain.Services;
using HBPonto.Database.Entities;
using HBPonto.Kernel.Handlers;
using HBPonto.Kernel.Enums;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize, ApiController]
    public class JiraProjectController : BaseController
    {
        private IJiraProjectService _service;
        private IRelatoryService _relatoryService;

        public JiraProjectController(IJiraProjectService service, IRelatoryService relatoryService)
        {
            _service = service;
            _relatoryService = relatoryService;
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
                List<JiraIssueDTO> dtoList = jiraResult.issues.Where(y => JiraStatusEnum.DONE.Key != y.fields.status.id).Select(x => JiraIssueDTO.CreateDTO(x)).ToList();
                return Ok(dtoList);
            }
            catch(Exception)
            {
                return BadRequest("Não foi possível buscar os issues, por favor tente novamente mais tarde.");
            }
        }

        [HttpPost("issue/{issueId}/{userId}")]
        public IActionResult PostWorklog([FromBody]JiraWorklogDTO jiraIssue, int issueId, string userId)
        {
            try
            {
                jiraIssue.started = DateHandler.TransformStringToDateString(jiraIssue.started);
                var worklogSummary = JiraWorklogSummaryDTO.Create(jiraIssue);
                var content = GetContent(worklogSummary);
                var response = _service.AddWorklog(issueId.ToString(), content);
                var result = PostResult(response.Result);
                Relatory relatory = Relatory.RelatoryFactory.Create(userId, jiraIssue.key, DateTime.Parse(jiraIssue.started), jiraIssue.timeSpent);
                _relatoryService.SaveRelatory(relatory);
                return Ok(result);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest("Não foi possível registrar horas de trabalho");
            }
        }

        [HttpPut("issue/update/{userId}")]
        public IActionResult UpdateIssuesSprint([FromBody]JiraShareWorklogDTO jiraShareWorklogDTO, string userId)
        {
            try
            {
                var worklog = jiraShareWorklogDTO.Worklog;
                var issuesIds = jiraShareWorklogDTO.IssuesIds;
                var timeInSeconds = DateHandler.TransformStringInSeconds(worklog.timeSpent);
                worklog.started = DateHandler.TransformStringToDateString(worklog.started);
                worklog.timeSpentSeconds = timeInSeconds / issuesIds.Length;
                var worklogSummary = JiraWorklogSummaryWithSecondsDTO.Create(worklog);
                var content = GetContent(worklogSummary);

                for (int i = 0; i < issuesIds.Length; i++)
                {
                    var response = _service.AddWorklog(issuesIds[i], content);
                    var result = PostResult(response.Result);
                    _relatoryService.SaveRelatory(Relatory.RelatoryFactory.Create(userId, 
                                                                                  issuesIds[i], 
                                                                                  DateTime.Parse(worklog.started), 
                                                                                  DateHandler.TransformSecondsInHoursString(worklog.timeSpentSeconds)));
                }

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
