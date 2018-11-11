using HBPonto.Kernel.Error;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HBPonto.Controllers
{
    public class BaseController : ControllerBase
    {
        protected T GetResult<T>(HttpResponseMessage response)
        {
            var result = response.Content.ReadAsStringAsync().Result;
            ErrorHandler.Handler(response.StatusCode);
            return JsonConvert.DeserializeObject<T>(result);
        }

        protected string PostResult(HttpResponseMessage response)
        {
            var result = response.Content.ReadAsStringAsync().Result;
            ErrorHandler.Handler(response.StatusCode);
            return result;
        }

        protected StringContent GetContent<T>(T obj)
        {
            var json = JsonConvert.SerializeObject(obj);
            return new StringContent(json, Encoding.UTF8, "application/json");
        }
    }
}
