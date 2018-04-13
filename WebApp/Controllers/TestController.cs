using System;
using System.Diagnostics;
using System.Web.Http;

using Leadtools.JSDemos.Models.Test;
using Leadtools.JSDemos.Tools.Exceptions;
using Leadtools.JSDemos.Tools.Helpers;
using System.Web.Http.Cors;

namespace Leadtools.JSDemos.Controllers
{
    /// <summary>
    /// For use with many of the JavaScript Demos, checking for a service connection
    /// and checking for the state of the LEADTOOLS license.
    /// </summary>
    [EnableCors("*","*","*")]
    public class TestController : ApiController
   {
      /* Test/
       *    GET Ping
       */

      /* This Ping() method is used to detect that everything is working fine
       * before a demo begins.
       */
      /// <summary>
      /// Checks for a connection to the service and the state of the LEADTOOLS kernel.
      /// </summary>
      /// <returns>Information on the status of the LEADTOOLS kernel.</returns>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "request")]
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
      [ServiceErrorAttribute(Message = "The service is not available")]
      [HttpGet, HttpPost]
      public PingResponse Ping()
      {
         Trace.WriteLine("Leadtools Imaging Service: Ready");

         var response = new PingResponse();
         response.Message = "Ready";

         try
         {
            Trace.WriteLine("Getting Toolkit status");
            ServiceHelper.SetLicense();
            response.IsLicenseChecked = true;
            response.IsLicenseExpired = RasterSupport.KernelExpired;
            response.KernelType = RasterSupport.KernelType.ToString();
         }
         catch (Exception)
         {
            response.IsLicenseChecked = false;
            response.IsLicenseExpired = true;
            response.KernelType = null;
         }

         return response;
      }
   }
}
