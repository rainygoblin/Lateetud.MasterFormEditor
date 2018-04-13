using Leadtools.Codecs;
using Leadtools.Ocr;


using Leadtools.Document;
using Leadtools.Ocr.LEADEngine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Leadtools;

namespace Leadtools.JSDemos.Tools.Helpers
{
   internal static class OCRHelper
   {
      public static IOcrEngine CreateOCREngine(RasterCodecs codecs)
      {
         // Use Advantage OCR engine
         var ocrEngine = OcrEngineManager.CreateEngine(OcrEngineType.LEAD, false);
         // Start it up
         try
         {
            ocrEngine.Startup(codecs, null, null, null);
            // Set any options here
            return ocrEngine;
         }
         catch
         {
            if (ocrEngine != null)
               ocrEngine.Dispose();
            throw;
         }

      }
   }
}