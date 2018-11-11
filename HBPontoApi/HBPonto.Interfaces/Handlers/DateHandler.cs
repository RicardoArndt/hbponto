using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Handlers
{
    public static class DateHandler
    {
        public static string TransformStringToDateString(string stringDate)
        {
            var data = DateTimeOffset.Parse(stringDate);
            var s = data.ToString("yyyy-MM-ddThh:mm:ss.fffK");
            return s.Substring(0, 26) + s.Substring(27, 2);
        }
    }
}
