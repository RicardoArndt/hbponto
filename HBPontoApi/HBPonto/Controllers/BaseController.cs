using HBPonto.Kernel.Error;
using HBPonto.Kernel.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace HBPonto.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public BaseController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

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

        protected HttpClient GetHttpClient()
        {
            StringValues tokenJira = StringValues.Empty;

            HttpContext.Request.Headers.TryGetValue("Set-Cookie", out tokenJira);

            var client = new HttpClient();
            client.BaseAddress = new Uri(_appSettings.HostJira);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", tokenJira);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        } 
    }
}
