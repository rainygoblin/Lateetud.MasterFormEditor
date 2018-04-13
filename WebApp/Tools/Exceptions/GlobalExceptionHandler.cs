using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace Leadtools.JSDemos.Tools.Exceptions
{
   /* An Exception Handler is separate from an Exception Logger or Exception Filter.
    * The order of execution is Logger, Filter, Handler.
    * Loggers receive all exceptions, a filter receives a subset of them, and a handler
    * receives only exceptions for which an HttpResponse can be sent.
    * See the comments for the other two classes.
    * More info: Web Api Error Handling
    * (http://www.asp.net/web-api/overview/error-handling)
    */

   public class GlobalExceptionHandler : ExceptionHandler
   {
      // We need to always override this method when CORS is enabled, otherwise exceptions will not be properly handled.
      //public override bool ShouldHandle(ExceptionHandlerContext context)
      //{
      //   return true;
      //}

      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0")]
      public override void Handle(ExceptionHandlerContext context)
      {
         /* First, we pick the status code. We only have a choice
          * if it was a web exception or from the ServiceError, otherwise we should just
          * return a 500/InternalServerError.
          */

         var statusCode = HttpStatusCode.InternalServerError;
         var webException = context.Exception as WebException;
         // For bad urls, etc
         if (webException != null)
         {
            if (webException.Status == WebExceptionStatus.ProtocolError)
            {
               if (webException.Response != null)
               {
                  try
                  {
                     var response = (HttpWebResponse)webException.Response;
                     statusCode = response.StatusCode;
                  }
                  catch
                  {
                     // do nothing
                  }
               }
            }
         }
         else if (context.Exception is ServiceException)
         {
            // Will be Internal Server Error by default
            var serviceException = context.Exception as ServiceException;
            statusCode = serviceException.StatusCode;
         }

         context.Result = new HttpResponseFromError
         {
            Request = context.Request,
            Exception = context.Exception,
            StatusCode = statusCode
         };
      }
   }

   public class HttpResponseFromError : IHttpActionResult
   {

      public HttpRequestMessage Request { get; set; }
      public Exception Exception { get; set; }
      public HttpStatusCode StatusCode { get; set; }

      /* Creating an HttpResponseMessage from an Exception and Request
       * The Request is only used such that we don't have to specify a MediaTypeFormatter -
       * it used the request's information on what the client wants in return.
       * The exception contains the relevant information about the exception. We need
       * to show something proper if in release.
       * https://blog.apigee.com/detail/restful_api_design_what_about_errors
       */

      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")]
      public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
      {
         HttpResponseMessage response = null;

         var serviceException = Exception as ServiceException;
         if (serviceException != null)
         {
            response = Request.CreateResponse(StatusCode, serviceException.ToServiceError());
         }
         else
         {
            /* Should only come to this if
             * (1) wasn't a ServiceException initially that was thrown
             * (2) there is no ServiceErrorAttribute on the method (so add one please!)
             */
            response = Request.CreateResponse(StatusCode, (new ServiceException("An error occurred. Please contact an administrator.", Exception)).ToServiceError());
         }
         return Task.FromResult(response);
      }
   }
}

