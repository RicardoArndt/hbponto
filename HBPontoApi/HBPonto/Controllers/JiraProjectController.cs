using HBPonto.Kernel.Helpers.Jiras;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using HBPonto.Kernel.DTO;
using HBPonto.Kernel.Handlers;
using HBPonto.Kernel.Enums;
using HBPonto.Kernel.Helpers;
using Microsoft.Extensions.Options;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), Authorize, ApiController]
    public class JiraProjectController : BaseController
    {
        private IJiraProjectService _service;
        private ICalcWorklogService _calcWorklogService;

        public JiraProjectController(IOptions<AppSettings> appSettings, IJiraProjectService service, ICalcWorklogService calcWorklogService): base(appSettings)
        {
            _service = service;
            _calcWorklogService = calcWorklogService;
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

        [HttpGet("board/{boardId}")]
        public IActionResult GetBoardDetails(int boardId)
        {
            try
            {
                var response = _service.GetBoard(boardId).Result;
                var result = GetResult<JiraBoardDetails>(response);

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("issue/{issueId}/{userId}")]
        public IActionResult PostWorklog([FromBody]JiraWorklogDTO jiraIssue, int issueId, string userId)
        {
            try
            {
                jiraIssue.started = jiraIssue.started.TransformStringToDateString();
                var worklogSummary = JiraWorklogSummaryDTO.Create(jiraIssue);
                var content = GetContent(worklogSummary);
                var response = _service.AddWorklog(issueId.ToString(), content);
                var result = PostResult(response.Result);
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
                var timeInSeconds = worklog.timeSpent.TransformStringInSeconds();
                worklog.started = worklog.started.TransformStringToDateString();
                var totalEstimated = jiraShareWorklogDTO.Issues.Where(x => x.originalEstimateSeconds > 0).Sum(x => x.originalEstimateSeconds);
                var timeRestant = timeInSeconds;

                if (totalEstimated == 0) throw new Exception("Não foi possível apontar horas nessa sprint, tempo estimado igual a zero");

                jiraShareWorklogDTO.Issues.Where(x => x.originalEstimateSeconds > 0).ToList().ForEach(x =>
                {
                    var porcentForIssue = _calcWorklogService.CalcPorcentForIssue(totalEstimated, x.originalEstimateSeconds);
                    var timeSpentSecondsForIssue = _calcWorklogService.GetSecondsForIssue(porcentForIssue, timeInSeconds);
                    timeRestant -= timeSpentSecondsForIssue;

                    if(jiraShareWorklogDTO.Issues.LastOrDefault().id == x.id)
                    {
                        if (timeRestant > 0) timeSpentSecondsForIssue += timeRestant;
                    } 

                    var worklogSummary = JiraWorklogSummaryWithSecondsDTO.Create(timeSpentSecondsForIssue, worklog.comment, worklog.started);
                    var content = GetContent(worklogSummary);
                    var response = _service.AddWorklog(x.id, content);
                    var result = PostResult(response.Result);
                });

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
