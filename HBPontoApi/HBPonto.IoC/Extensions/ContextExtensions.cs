using Microsoft.Extensions.DependencyInjection;
using HBPonto.Kernel.Helpers;
using HBPonto.Database.Contexts;
using Microsoft.EntityFrameworkCore;

namespace HBPonto.IoC.Extensions
{
    public static class ContextExtensions
    {
        public static IServiceCollection RegisterContexts(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddDbContext<UserContext>(options => options.UseSqlServer(appSettings.ConnectionString, x => x.MigrationsAssembly("HBPonto")));

            return services;
        }
    }
}
