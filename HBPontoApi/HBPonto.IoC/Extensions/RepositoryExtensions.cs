using HBPonto.Database.Entities;
using HBPonto.Database.Repositories;
using HBPonto.Kernel.Interfaces.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace HBPonto.IoC.Extensions
{
    public static class RepositoryExtensions
    {
        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRelatoryRepository, RelatoryRepository>();

            return services;
        }
    }
}
