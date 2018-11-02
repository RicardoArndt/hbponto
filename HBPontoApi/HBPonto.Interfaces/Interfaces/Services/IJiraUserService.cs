using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HBPonto.Kernel.Interfaces.Services
{
    public interface IJiraUserService
    {
        Task<HttpResponseMessage> GetUser(string userName);
    }
}
