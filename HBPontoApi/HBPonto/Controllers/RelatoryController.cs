using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HBPonto.Controllers
{
    [Route("api/[controller]"), ApiController, Authorize(Roles = "Administrator")]
    public class RelatoryController : BaseController
    {
        public RelatoryController()
        {

        }
    }
}
