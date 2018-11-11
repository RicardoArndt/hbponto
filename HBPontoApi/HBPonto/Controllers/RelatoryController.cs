using HBPonto.Kernel.DTO;
using HBPonto.Kernel.Interfaces.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), ApiController, Authorize(Roles = "Administrator")]
    public class RelatoryController : BaseController
    {
        private IRelatoryService _relatoryService;

        public RelatoryController(IRelatoryService relatoryService)
        {
            _relatoryService = relatoryService;
        }

        [HttpGet]
        public IActionResult GetAllRelatories()
        {
            try
            {
                var relatories = _relatoryService.GetAllRelatories();

                List<RelatoryDTO> relatoriesDTO = relatories.Select(relatory => RelatoryDTO.Create(relatory)).ToList();
                    
                return Ok(relatoriesDTO);
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível buscar os relatórios");
            }
        }
    }
}
