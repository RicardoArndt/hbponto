using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Kernel.Enums
{
    public class RoleEnum
    {
        public int Key { get; private set; }
        public string Value { get; private set; }

        public RoleEnum(int key, string value)
        {
            Key = key;
            Value = value;
        }

        public static RoleEnum NOT_ATTRIBUTED = new RoleEnum(0, "Not Attributed");
        public static RoleEnum ADMINISTRATOR = new RoleEnum(1, "Administrator");

        public static List<RoleEnum> GetAllRoles()
        {
            return new List<RoleEnum>()
            {
                NOT_ATTRIBUTED,
                ADMINISTRATOR
            };
        }
    }
}
