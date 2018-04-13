using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.Raster
{
   /// <summary>
   /// Representation of an image.
   /// </summary>
   [DataContract]
   public class ImageInfo
   {
      public ImageInfo() { }

      /// <summary>
      /// The original URI passed by the user
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
      [DataMember]
      public string Uri { get; set; }

      /// <summary>
      /// Format ID (integer value of RasterImageFormat)
      /// </summary>
      [DataMember]
      public int FormatId { get; set; }

      /// <summary>
      /// Format name (string representation of RasterImageFormat)
      /// </summary>
      [DataMember]
      public string FormatName { get; set; }

      /// <summary>
      /// MIME type
      /// </summary>
      [DataMember]
      public string MimeType { get; set; }

      /// <summary>
      /// Can the image be viewer directly in a browser? PNG, GIF or JPEG
      /// </summary>
      [DataMember]
      public bool BrowserCompatible { get; set; }

      /// <summary>
      /// Width in pixels
      /// </summary>
      [DataMember]
      public int Width { get; set; }

      /// <summary>
      /// Height in pixels
      /// </summary>
      [DataMember]
      public int Height { get; set; }

      /// <summary>
      /// Bits/Pixel
      /// </summary>
      [DataMember]
      public int BitsPerPixel { get; set; }

      /// <summary>
      /// Bytes/Line
      /// </summary>
      [DataMember]
      public int BytesPerLine { get; set; }

      /// <summary>
      /// Size in disk in bytes
      /// </summary>
      [DataMember]
      public long SizeDisk { get; set; }

      /// <summary>
      /// Size in memory in bytes
      /// </summary>
      [DataMember]
      public long SizeMemory { get; set; }

      /// <summary>
      /// Compression
      /// </summary>
      [DataMember]
      public string Compression { get; set; }

      /// <summary>
      /// View prespective (string representation of RasterViewPerspective)
      /// </summary>
      [DataMember]
      public string ViewPerspective { get; set; }

      /// <summary>
      /// Order (string representation of RasterByteOrder)
      /// </summary>
      [DataMember]
      public string Order { get; set; }

      /// <summary>
      /// Color space (string representation of RasterColorSpace)
      /// </summary>
      [DataMember]
      public string ColorSpace { get; set; }

      /// <summary>
      /// Page number
      /// </summary>
      [DataMember]
      public int PageNumber { get; set; }

      /// <summary>
      /// Total number of pages
      /// </summary>
      [DataMember]
      public int TotalPages { get; set; }

      /// <summary>
      /// Does the image have resolution?
      /// </summary>
      [DataMember]
      public bool HasResolution { get; set; }

      /// <summary>
      /// X Resolution of the image
      /// </summary>
      [DataMember]
      public int XResolution { get; set; }

      /// <summary>
      /// Y Resolution of the image
      /// </summary>
      [DataMember]
      public int YResolution { get; set; }

      /// <summary>
      /// Is the image rotated?
      /// </summary>
      [DataMember]
      public bool IsRotated { get; set; }

      /// <summary>
      /// Is the data signed?
      /// </summary>
      [DataMember]
      public bool IsSigned { get; set; }

      /// <summary>
      /// Does the image have alpha values?
      /// </summary>
      [DataMember]
      public bool HasAlpha { get; set; }
   }
}