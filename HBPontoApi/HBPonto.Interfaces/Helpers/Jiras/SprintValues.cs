using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Helpers.Jiras
{
    public class SprintValues
    {
        public int id { get; set; }
        public string self { get; set; }
        public string state { get; set; }
        public string name { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public DateTime completeDate { get; set; }
        public int originBoardId { get; set; }
    }
}
