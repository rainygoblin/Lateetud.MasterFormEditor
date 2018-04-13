using Leadtools.Forms;
using Leadtools.Forms.Common;
using Leadtools.Forms.Processing;
using Leadtools.Forms.Recognition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.DriversLicense
{
   /// <summary>
   /// A representation of a field from a processed driver's license.
   /// </summary>
   [DataContract]
   public class LicenseFieldData
   {
      public LicenseFieldData() { }

      /// <summary>
      /// Field name
      /// </summary>
      [DataMember]
      public string Name { get; set; }

      /// <summary>
      /// The original URI passed by the user
      /// </summary>
      [DataMember]
      public string Field { get; set; }

      /// <summary>
      /// Field Type "TextFormField"
      /// </summary>
      [DataMember]
      public string Type { get; set; }

      /// <summary>
      /// Recognition result
      /// </summary>
      [DataMember]
      public string Result { get; set; }

      /// <summary>
      /// Average confidence of all detected characters
      /// </summary>
      [DataMember]
      public string Confidence { get; set; }

      /// <summary>
      /// Bounding rectangle of the field
      /// </summary>
      [DataMember]
      public string BoundingRectangle { get; set; }

      /// <summary>
      /// Bounding rectangle left position in pixels
      /// </summary>
      [DataMember]
      public double Left { get; set; }

      /// <summary>
      /// Bounding rectangle top position in pixels
      /// </summary>
      [DataMember]
      public double Top { get; set; }

      /// <summary>
      /// Bounding rectangle right position in pixels
      /// </summary>
      [DataMember]
      public double Right { get; set; }

      /// <summary>
      /// Bounding rectangle bottom position in pixels
      /// </summary>
      [DataMember]
      public double Bottom { get; set; }
   }

   /// <summary>
   /// A representation of a Master Form.
   /// </summary>
   [DataContract]
   public class MasterForm
   {
      private RasterImage _image;
      private FormRecognitionAttributes _attributes;
      private FormRecognitionProperties _properties;
      private FormPages _processingPages;

      public MasterForm()
      {
         _image = null;
         _attributes = new FormRecognitionAttributes();
         _properties = FormRecognitionProperties.Empty;
         _processingPages = null;
      }

      /// <summary>
      /// Raster Image
      /// </summary>
      [DataMember]
      public RasterImage Image
      {
         get { return _image; }
         set { _image = value; }
      }

      /// <summary>
      /// Form Recognition Attributes
      /// </summary>
      [DataMember]
      public FormRecognitionAttributes Attributes
      {
         get { return _attributes; }
         set { _attributes = value; }
      }

      /// <summary>
      /// Form Recognition Properties
      /// </summary>
      [DataMember]
      public FormRecognitionProperties Properties
      {
         get { return _properties; }
         set { _properties = value; }
      }

      /// <summary>
      /// Form Pages
      /// </summary>
      [DataMember]
      public FormPages ProcessingPages
      {
         get { return _processingPages; }
         set { _processingPages = value; }
      }

   }

   /// <summary>
   /// A representation of a filled form.
   /// </summary>
   [DataContract]
   public class FilledForm
   {
      public FilledForm()
      {
      }

      /// <summary>
      /// The original URI
      /// </summary>
      [DataMember]
      public string Uri { get; set; }

      /// <summary>
      /// Alignment Pages
      /// </summary>
      [DataMember]
      public IList<PageAlignment> Alignment { get; set; }

      /// <summary>
      /// Form Recognition Result
      /// </summary>
      [DataMember]
      public FormRecognitionResult Result { get; set; }

      /// <summary>
      /// Raster Image
      /// </summary>
      [DataMember]
      public RasterImage Image { get; set; }

      /// <summary>
      /// Form Recognition Attributes
      /// </summary>
      [DataMember]
      public FormRecognitionAttributes Attributes { get; set; }

      /// <summary>
      /// Master Form
      /// </summary>
      [DataMember]
      public MasterForm Master { get; set; }

      /// <summary>
      /// Processing Pages
      /// </summary>
      [DataMember]
      public FormPages ProcessingPages { get; set; }

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
      /// Bounding rectangle right in pixels
      /// </summary>
      [DataMember]
      public int Right { get; set; }

      /// <summary>
      /// Bounding rectangle bottom in pixels
      /// </summary>
      [DataMember]
      public int Bottom { get; set; }
   }
}