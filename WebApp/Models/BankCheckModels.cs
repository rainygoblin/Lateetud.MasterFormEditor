using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.BankCheck
{
   /// <summary>
   /// A representation of a field from a processed bank check.
   /// </summary>
   [DataContract]
   public class BankCheckFieldData
   {
      public BankCheckFieldData() { }

      /// <summary>
      /// The original URI passed by the user
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
      [DataMember(Name = "uri")]
      public string Uri { get; set; }

      /// <summary>
      /// Field name
      /// </summary>
      [DataMember(Name = "name")]
      public string Name { get; set; }

      /// <summary>
      /// Value, as a string
      /// </summary>
      [DataMember(Name = "value")]
      public string Value { get; set; }

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
   }
}