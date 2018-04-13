using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.Test
{
   /// <summary>
   /// Information on the status of the service and LEADTOOLS license.
   /// </summary>
   [DataContract]
   public class PingResponse
   {
      public PingResponse() { }

      [DataMember(Name = "message")]
      public string Message { get; set; }

      [DataMember(Name = "isLicenseChecked")]
      public bool IsLicenseChecked { get; set; }

      [DataMember(Name = "isLicenseExpired")]
      public bool IsLicenseExpired { get; set; }

      [DataMember(Name = "kernelType")]
      public string KernelType { get; set; }
   }
}