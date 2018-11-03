using HBPonto.JIRA.Services;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.DependencyInjection;

namespace HBPonto.IoC.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IJiraBaseService, JiraBaseService>();
            services.AddSingleton<IJiraProjectService, JiraProjectService>();

            return services;
        }
    }
}
