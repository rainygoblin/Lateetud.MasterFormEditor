using System;
using System.Reflection;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Leadtools.JSDemos.Tools.Exceptions
{
   [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
   public sealed class GlobalExceptionFilterAttribute : ExceptionFilterAttribute
   {
      /* The order of execution is ExceptionLogger, ExceptionFilter, ExceptionHandler.
       * Loggers receive all exceptions, Filter receives a subset of them, and Handler
       * receives only exceptions for which an HttpResponse can be sent.
       * See the comments for the other two classes.
       * 
       * More info: Web Api Error Handling
       * (http://www.asp.net/web-api/overview/error-handling)
       * 
       * Filters are the only of the three [Logger, Filter, Handler] which 
       * can (1) get the actionContext, useful for getting info about the top-level
       * method that threw the exception, and (2) edit the Exception to include
       * that information.
       * 
       * The Exception is then passed to the Handler.
       */

      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0")]
      public override void OnException(HttpActionExecutedContext actionExecutedContext)
      {
         HttpActionContext actionContext = actionExecutedContext.ActionContext;
         HttpControllerContext controllerContext = actionContext.ControllerContext;
         Exception oldException = actionExecutedContext.Exception;

         // Get the name of the action ("Decrypt") and controller ("DocumentController")
         string actionName = actionContext.ActionDescriptor.ActionName;

         ServiceException sameException = oldException as ServiceException;
         if (sameException != null)
         {
            // Add the action name.
            sameException.Action = actionName;

            try
            {
               // Get the value from the attribute on the method.
               IHttpController controller = controllerContext.Controller;
               var serviceErrorAttribute = (ServiceErrorAttribute)controller.GetType().GetMethod(actionName).GetCustomAttribute(typeof(ServiceErrorAttribute), false);

               // Get additional properties
               sameException.ConsumeAttribute(serviceErrorAttribute);
            }
            catch { }

            actionExecutedContext.Exception = sameException;
         }
         else
         {
            string userSafeMessage = null;
            try
            {
               // Check the method for an attribute we can use for more information.

               // Get the value from the attribute on the method.
               IHttpController controller = controllerContext.Controller;
               var serviceErrorAttribute = (ServiceErrorAttribute)controller.GetType().GetMethod(actionName).GetCustomAttribute(typeof(ServiceErrorAttribute), false);
               userSafeMessage = serviceErrorAttribute.Message;

               ServiceException newException = new ServiceException(userSafeMessage, actionExecutedContext.Exception);
               newException.Action = actionName;

               // Get additional properties
               newException.ConsumeAttribute(serviceErrorAttribute);
               actionExecutedContext.Exception = newException;
            }
            catch
            {
               userSafeMessage = "An error occurred. Please contact an administrator.";
               ServiceException newException = new ServiceException(userSafeMessage, actionExecutedContext.Exception);
               newException.Action = actionName;
               actionExecutedContext.Exception = newException;
            }
         }
      }
   }
}