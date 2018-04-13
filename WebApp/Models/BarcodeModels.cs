using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.Barcode
{
   /// <summary>
   /// A representation of the data from a barcode image.
   /// </summary>
   [DataContract]
   public class BarcodeData
   {
      public BarcodeData() { }

      /// <summary>
      /// The original URI passed by the user
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
      [DataMember(Name = "uri")]
      public string Uri { get; set; }

      /// <summary>
      /// Symbology ID (integer value of BarcodeSymbology)
      /// </summary>
      [DataMember(Name = "symbologyId")]
      public int SymbologyId { get; set; }

      /// <summary>
      /// Symbology name (string representation of BarcodeSymbology)
      /// </summary>
      [DataMember(Name = "symbologyName")]
      public string SymbologyName { get; set; }

      /// <summary>
      /// Bounding rectangle left position in pixels
      /// </summary>
      [DataMember(Name = "left")]
      public int Left { get; set; }

      /// <summary>
      /// Bounding rectangle top position in pixels
      /// </summary>
      [DataMember(Name = "top")]
      public int Top { get; set; }

      /// <summary>
      /// Bounding rectangle right position in pixels
      /// </summary>
      [DataMember(Name = "right")]
      public int Right { get; set; }

      /// <summary>
      /// Bounding rectangle bottom position in pixels
      /// </summary>
      [DataMember(Name = "bottom")]
      public int Bottom { get; set; }

      /// <summary>
      /// Rotation angle in degrees (if any)
      /// </summary>
      [DataMember(Name = "rotationAngle")]
      public int RotationAngle { get; set; }

      /// <summary>
      /// Value, as string
      /// </summary>
      [DataMember(Name = "value")]
      public string Value { get; set; }

      /// <summary>
      /// Data, as bytes
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1819:PropertiesShouldNotReturnArrays")]
      [DataMember(Name = "data")]
      public byte[] Data { get; set; }
   }
}