using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace HBPonto.Kernel.Error
{
    public static class ErrorHandler
    {
        public static void Handler(HttpStatusCode status)
        {
            switch(status)
            {
                case (HttpStatusCode)401: throw new UnauthorizedAccessException();
                case (HttpStatusCode)403: throw new UnauthorizedAccessException();
                case (HttpStatusCode)400: throw new Exception();
            }
        }
    }
}
