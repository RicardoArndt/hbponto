using HBPonto.Kernel.Interfaces.DTOs;

namespace HBPonto.Authentication.DTOs
{
    public class AuthUserDTO : IAuthUserDTO
    {
        public string UserId { get; protected set; } 
        public string UserName { get; protected set; }
        public string AuthJiraToken { get; protected set; }
        public string Token { get; protected set; }
          
        internal static class AuthUserDTOFactory 
        {
            public static IAuthUserDTO Create(string userName, string authJiraToken, string token, string userId)
            {
                return new AuthUserDTO
                {
                    UserId = userId,
                    UserName = userName,
                    AuthJiraToken = authJiraToken,
                    Token = token
                };                
            }
        }
    }
}
