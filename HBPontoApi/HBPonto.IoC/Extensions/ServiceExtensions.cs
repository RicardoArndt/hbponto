using HBPonto.Authentication.Services;
using HBPonto.Domain.Services;
using HBPonto.JIRA.Services;
using HBPonto.Kernel.Interfaces.Authentication;
using HBPonto.Kernel.Interfaces.Domain.Services;
using HBPonto.Kernel.Interfaces.Services;
using Microsoft.Extensions.DependencyInjection;

namespace HBPonto.IoC.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IJiraBaseService, JiraBaseService>();
            services.AddScoped<IJiraProjectService, JiraProjectService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRelatoryService, RelatoryService>();

            return services;
        }
    }
}
