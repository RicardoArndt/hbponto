using HBPonto.Kernel.Interfaces.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

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
                var result = _relatoryService.GetAllRelatories();
                    
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível buscar os relatórios");
            }
        }
    }
}
