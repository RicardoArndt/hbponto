using HBPonto.Kernel.Error;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HBPonto.Controllers
{
    public class BaseController : ControllerBase
    {
        public T GetResult<T>(HttpResponseMessage response)
        {
            var result = response.Content.ReadAsStringAsync().Result;
            ErrorHandler.Handler(response.StatusCode);
            return JsonConvert.DeserializeObject<T>(result);
        }

        public string PostResult(HttpResponseMessage response)
        {
            var result = response.Content.ReadAsStringAsync().Result;
            ErrorHandler.Handler(response.StatusCode);
            return result;
        }
    }
}
