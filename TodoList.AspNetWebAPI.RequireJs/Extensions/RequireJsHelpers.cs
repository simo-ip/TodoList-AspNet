using System;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace TodoApp.AspNetWebAPI.Extensions
{
    public static class RequireJsHelpers
    {
        public static MvcHtmlString InitPageMainModule(this HtmlHelper helper, string pageModule)
        {
            var require = new StringBuilder();
            var scriptsPath = "~/Scripts/";
            var absolutePath = VirtualPathUtility.ToAbsolute(scriptsPath);
            var modulePath = string.Format("/{0}", helper.ViewContext.RouteData.Values["controller"]);

            require.AppendLine("<script>");
            require.AppendFormat("require(['{0}main.js'], ", absolutePath);
            require.AppendFormat("function() {{ require(['{0}/{1}', 'domReady']); }}", modulePath, pageModule);
            require.AppendLine(");");
            require.AppendLine("</script>");

            return new MvcHtmlString(require.ToString());
        }
    }
}