using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Enums
{
    public class JiraStatusEnum
    {
        public int Key { get; set; }
        public string Value { get; set; }

        public JiraStatusEnum(int key, string value)
        {
            Key = key;
            Value = value;
        }

        public static JiraStatusEnum DONE = new JiraStatusEnum(10236, "Concluída");
    }
}
