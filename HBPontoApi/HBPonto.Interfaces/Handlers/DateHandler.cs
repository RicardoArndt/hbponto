using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Handlers
{
    public static class DateHandler
    {
        public static string TransformStringToDateString(this string stringDate)
        {
            //Necessário esse procedimento pois a variável date sempre recebe o 
            //horário de 12 horas e não o horário atual, usasse dessa forma a conversão
            //pois o Jira quer a data nesse formato caso contrário da Bad Request
            var date = DateTimeOffset.Parse(stringDate);
            var time = DateTimeOffset.Now;
            var dateComplete = DateTimeOffset.Parse(new DateTime(date.Year, date.Month, date.Day, time.Hour, time.Minute, time.Second).ToString());
            var s = dateComplete.ToString("yyyy-MM-ddThh:mm:ss.fffK");
            return s.Substring(0, 26) + s.Substring(27, 2);
        }

        public static int TransformStringInSeconds(this string stringTime)
        {
            var time = TransformStringTimeInHoursAndMinutes(stringTime);
            var seconds = 0;

            try
            {
                seconds = time.hoursSeconds + time.minutesSeconds;
            }
            catch (Exception)
            {
                throw new Exception("Não foi possível converter a string informada em tempo");
            }

            return seconds;
        }

        public static (int hoursSeconds, int minutesSeconds) TransformStringTimeInHoursAndMinutes(string stringTime)
        {
            var time = stringTime.Split(' ');
            var hoursReturnInSeconds = 0;
            var minutesReturnInSeconds = 0;

            if (time.Length > 2)
            {
                throw new FormatException("String especificada não é valida como um tempo");
            }
            else
            {
                var hours = time[0].ToUpper();

                if (CheckIsHour(hours))
                {
                    hoursReturnInSeconds = CalcHours(Int32.Parse(hours.Remove(hours.IndexOf("H"), 1)));

                    if (time.Length > 1)
                    {
                        var minutes = time[1].ToUpper();
                        minutesReturnInSeconds = CalcMinutes(Int32.Parse(minutes.Remove(minutes.IndexOf("M"), 1)));
                    }
                }
                else
                {
                    minutesReturnInSeconds = CalcMinutes(Int32.Parse(hours.Remove(hours.IndexOf("M"), 1)));
                }
            }

            return (hoursReturnInSeconds, minutesReturnInSeconds);
        }

        public static string TransformSecondsInHoursString(int seconds)
        {
            return String.Format("{0}h", TimeSpan.FromHours(seconds));
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
