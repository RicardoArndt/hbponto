namespace HBPonto.Kernel.Interfaces.DTOs
{
    public interface IAuthUserDTO
    {
        string UserName { get; }
        string AuthJiraToken { get; }
        string Token { get; }
    }
}
