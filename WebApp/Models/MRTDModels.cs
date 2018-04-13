using Leadtools.Forms.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.MRTD
{
   /// <summary>
   /// Representation of a single element from a MRTD (Machine Readable Travel Document)
   /// </summary>
   [DataContract]
   public class MRTDDataElement
   {
      public MRTDDataElement() { }

      /// <summary>
      /// Element name
      /// </summary>
      [DataMember]
      public string Name { get; set; }

      /// <summary>
      /// Beginning index
      /// </summary>
      [DataMember]
      public int BeginIndex { get; set; }

      /// <summary>
      /// Validity
      /// </summary>
      [DataMember]
      public bool IsValid { get; set; }

      /// <summary>
      /// Length
      /// </summary>
      [DataMember]
      public int Length { get; set; }

      /// <summary>
      /// Line index
      /// </summary>
      [DataMember]
      public int LineIndex { get; set; }

      /// <summary>
      /// MRZ Value
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Mrz")]
      [DataMember]
      public string MrzCharacters { get; set; }

      /// <summary>
      /// Value, as a readable string
      /// </summary>
      [DataMember]
      public string ReadableValue { get; set; }
   }

   /// <summary>
   /// Representation of the data from a MRTD (Machine Readable Travel Document)
   /// </summary>
   [DataContract]
   public class MRTDReaderData
   {
      public MRTDReaderData() { }

      /// <summary>
      /// The original URI passed by the user
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
      [DataMember]
      public string Uri { get; set; }

      /// <summary>
      /// Bounding rectangle left position in pixels
      /// </summary>
      [DataMember]
      public int Left { get; set; }

      /// <summary>
      /// Bounding rectangle top position in pixels
      /// </summary>
      [DataMember]
      public int Top { get; set; }

      /// <summary>
      /// Bounding rectangle right position in pixels
      /// </summary>
      [DataMember]
      public int Right { get; set; }

      /// <summary>
      /// Bounding rectangle bottom position in pixels
      /// </summary>
      [DataMember]
      public int Bottom { get; set; }

      /// <summary>
      /// MRTD Fields
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1819:PropertiesShouldNotReturnArrays")]
      [DataMember]
      public string[] Lines { get; set; }

      /// <summary>
      /// Array of MRZ Characters lines
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1819:PropertiesShouldNotReturnArrays")]
      [DataMember]
      public MRTDDataElement[] Results { get; set; }

      /// <summary>
      /// MRTD Errors
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1819:PropertiesShouldNotReturnArrays")]
      [DataMember]
      public string[] Errors { get; set; }
   }
}