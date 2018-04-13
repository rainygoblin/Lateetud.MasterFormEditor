using System;
using System.Net;
using System.Runtime.Serialization;

namespace Leadtools.JSDemos.Tools.Exceptions
{
   [AttributeUsage(AttributeTargets.Method)]
   public sealed class ServiceErrorAttribute : Attribute
   {
      // The user-safe message that will eventually be the ServiceError.Message.
      public string Message { get; set; }

      // An alternate MethodName value to return.
      public string MethodName { get; set; }
   }


   [DataContract]
   public class ServiceError
   {
      /* Always safe to show to an end-user.
       * Will hold the "SafeErrorMessage" attribute of a method
       * or the Exception.Message of an explicit ServiceException.
       */
      [DataMember]
      public string Message { get; set; }

      /* Sometimes null. Not end-user safe.
       * Often contains the actual Exception.Message from an 
       * Exception that wasn't thrown as a ServiceException.
       */
      [DataMember]
      public string Detail { get; set; }

      [DataMember]
      public int Code { get; set; }

      [DataMember]
      public string Link { get; set; }

      [DataMember]
      public string ExceptionType { get; set; }

      [DataMember]
      public string MethodName { get; set; }
   }


   /*
    * For use with all top-level errors.
    * Has special methods to match with GlobalExceptionHandler
    * and make a user-safe error message.
    */
   [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1032:ImplementStandardExceptionConstructors")]
   [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2240:ImplementISerializableCorrectly"), Serializable]
   public sealed class ServiceException : Exception
   {
      public string Action { get; set; }
      private int Code { get; set; }
      private string Link { get; set; }
      private string Detail { get; set; }
      public HttpStatusCode StatusCode { get; private set; }

      public ServiceException()
         : base()
      {
      }

      public ServiceException(string userMessage)
         : base(userMessage)
      {
         SetDefaults();
      }

      public ServiceException(string userMessage, Exception innerException)
         : base(userMessage, innerException)
      {
         SetDefaults();

         Detail = innerException != null ? innerException.Message : null;
         CheckInnerException();
      }

      public ServiceException(string userMessage, HttpStatusCode statusCode)
         : base(userMessage)
      {
         SetDefaults();

         StatusCode = statusCode;
      }

      public ServiceException(string userMessage, Exception innerException, HttpStatusCode statusCode)
         : base(userMessage, innerException)
      {
         SetDefaults();

         StatusCode = statusCode;
         Detail = innerException != null ? innerException.Message : null;
         CheckInnerException();
      }

      private void CheckInnerException()
      {
         try
         {
            // add more here, if necessary.
            var rasterException = this.InnerException as Leadtools.RasterException;
            if (rasterException != null)
            {
               Code = (int)rasterException.Code;
               Link = rasterException.HelpLink != null ? rasterException.HelpLink :
                  "https://www.leadtools.com/help/leadtools/v19/dh/l/leadtools~leadtools.rasterexceptioncode.html";
               return;
            }

            var ocrException = this.InnerException as Leadtools.Ocr.OcrException;
            if (ocrException != null)
            {
               Code = (int)ocrException.Code;
               Link = ocrException.HelpLink != null ? ocrException.HelpLink :
                  "https://www.leadtools.com/help/leadtools/v19/dh/fo/leadtools.forms.ocr~leadtools.forms.ocr.ocrexception.html";
               return;
            }

            var barcodeException = this.InnerException as Leadtools.Barcode.BarcodeException;
            if (barcodeException != null)
            {
               Code = (int)barcodeException.Code;
               Link = barcodeException.HelpLink != null ? barcodeException.HelpLink :
                  "https://www.leadtools.com/help/leadtools/v19/dh/ba/leadtools.barcode~leadtools.barcode.barcodeexceptioncode.html";
               return;
            }
         }
         catch { }
      }

      // For when we don't have an InnerException with anything to offer.
      private void SetDefaults()
      {
         StatusCode = HttpStatusCode.InternalServerError;
         Detail = Message;
         Action = "Unknown";
         Code = 0;
         Link = "https://www.leadtools.com/help/leadtools/v19/dh/javascript/to/webframe.html";
      }

      public ServiceError ToServiceError()
      {
         return new ServiceError()
         {
            Message = this.Message,
            Detail = this.Detail,
            Code = this.Code,
            Link = this.Link,
            ExceptionType = this.InnerException != null ? this.InnerException.GetType().ToString() : this.GetType().ToString(),
            MethodName = this.Action
         };
      }

      // Can't use this for Message property, because it's required in constructor
      // For Exceptions
      public void ConsumeAttribute(ServiceErrorAttribute attribute)
      {
         if (attribute == null)
            throw new ArgumentNullException("attribute");

         if (!String.IsNullOrEmpty(attribute.MethodName))
         {
            this.Action = attribute.MethodName;
         }
      }
   }
}
