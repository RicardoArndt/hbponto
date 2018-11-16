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

        public static int TransformStringInSeconds(string stringTime)
        {
            var time = TransformStringTimeInHoursAndMinutes(stringTime);
            var seconds = 0;

            try
            {
                seconds = time.hours + time.minutes;
            }
            catch (Exception)
            {
                throw new Exception("Não foi possível converter a string informada em tempo");
            }

            return seconds;
        }

        public static (int hours, int minutes) TransformStringTimeInHoursAndMinutes(string stringTime)
        {
            var time = stringTime.Split(' ');
            var hoursReturn = 0;
            var minutesReturn = 0;

            if (time.Length > 2)
            {
                throw new FormatException("String especificada não é valida como um tempo");
            }
            else
            {
                var hours = time[0].ToUpper();

                if (CheckIsHour(hours))
                {
                    hoursReturn = CalcHours(Int32.Parse(hours.Remove(hours.IndexOf("H"), 1)));

                    if (time.Length > 1)
                    {
                        var minutes = time[1].ToUpper();
                        minutesReturn = CalcMinutes(Int32.Parse(hours.Remove(hours.IndexOf("M"), 1)));
                    }
                }
                else
                {
                    minutesReturn = CalcMinutes(Int32.Parse(hours.Remove(hours.IndexOf("M"), 1)));
                }
            }

            return (hoursReturn, minutesReturn);
        }

        private static bool CheckIsHour(string hours)
        {
            return hours.IndexOf("H") != -1 ? true : false;
        }

        private static bool CheckIsMinute(string minutes)
        {
            return minutes.IndexOf("M") != -1 ? true : false;
        }

        private static int CalcHours(int hours)
        {
            return hours * 3600;
        }

        private static int CalcMinutes(int minutes)
        {
            return minutes * 60;
        }
    }
}
