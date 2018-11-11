using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.DTO
{
    public class UserDTO
    {
        public string name { get; set; }
        public string emailAddress { get; set; }
        public string displayName { get; set; }
        public Dictionary<string, string> avatarUrls { get; set; }
        public string avatarUrl { get; set; }
    }
}
