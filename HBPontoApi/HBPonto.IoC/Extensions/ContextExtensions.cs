using Microsoft.Extensions.DependencyInjection;
using HBPonto.Kernel.Helpers;

namespace HBPonto.IoC.Extensions
{
    public static class ContextExtensions
    {
        public static IServiceCollection RegisterContexts(this IServiceCollection services, AppSettings appSettings)
        {
            return services;
        }
    }
}
