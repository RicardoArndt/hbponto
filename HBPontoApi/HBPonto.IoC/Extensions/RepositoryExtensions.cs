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
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IRelatoryRepository, RelatoryRepository>();

            return services;
        }
    }
}
