using HBPonto.JIRA.Services;
using HBPonto.Kernel.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.IoC.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IJiraBaseService, JiraBaseService>();

            return services;
        }
    }
}
