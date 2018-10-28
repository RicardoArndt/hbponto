using HBPonto.Kernel.Interfaces.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace HBPonto.Test
{
    [TestClass]
    public class JiraProjectsTest
    {
        IJiraProjectService _jiraProjectService;

        public JiraProjectsTest(IJiraProjectService jiraProjectService)
        {
            _jiraProjectService = jiraProjectService;
        }

        [TestMethod]
        public void ReturnAllProjects()
        {
            var result = _jiraProjectService.GetProjects().ToList();

            Assert.IsTrue(result.Count > 0, "Return all projects");
        }
    }
}
