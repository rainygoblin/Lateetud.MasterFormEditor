using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Leadtools.JSDemos
{
   public class WebApiApplication : System.Web.HttpApplication
   {
      protected void Application_Start(object sender, EventArgs e)
      {  
         // Register our Web Api routing (Web App is configured in Startup.cs from OWIN)
         // Modify the JSON.NET serializer.
         GlobalConfiguration.Configure(WebApiConfig.Register);
         RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
   }
}