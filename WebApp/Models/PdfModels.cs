using Leadtools.Pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Leadtools.JSDemos.Models.Pdf
{
   /// <summary>
   /// Representation of a PDF bookmark.
   /// </summary>
   [DataContract]
   public class PdfBookmark
   {
      public PdfBookmark() { }

      /// <summary>
      /// The level in the hierarchy of this bookmark.
      /// </summary>
      [DataMember]
      public int Level { get; set; }

      /// <summary>
      /// The page number to which this bookmark maps.
      /// </summary>
      [DataMember]
      public int TargetPageNumber { get; set; }

      /// <summary>
      /// The bookmark title.
      /// </summary>
      [DataMember]
      public string Title { get; set; }

      /// <summary>
      /// The X coordinate of the bookmark.
      /// </summary>
      [DataMember]
      public double TargetXPosition { get; set; }

      /// <summary>
      /// The Y coordinate of the bookmark.
      /// </summary>
      [DataMember]
      public double TargetYPosition { get; set; }
   }
   /// <summary>
   /// Representation of a PDF's form field.
   /// </summary>
   [DataContract]
   public class PdfFormField
   {
      public PdfFormField() { }

      /// <summary>
      /// The bounds of the field.
      /// </summary>
      [DataMember]
      public PDFRect Bounds { get; set; }

      /// <summary>
      /// The page number that the field is on.
      /// </summary>
      [DataMember]
      public int PageNumber { get; set; }

      /// <summary>
      /// The field name.
      /// </summary>
      [DataMember]
      public string Name { get; set; }

      /// <summary>
      /// The alternate name for the field.
      /// </summary>
      [DataMember]
      public string AlternateName { get; set; }

      /// <summary>
      /// The mapping name.
      /// </summary>
      [DataMember]
      public string MappingName { get; set; }

      /// <summary>
      /// The optional name.
      /// </summary>
      [DataMember]
      public string OptionalName { get; set; }

      /// <summary>
      /// The type of form field on the PDF.
      /// </summary>
      [DataMember]
      public int FieldType { get; set; }

      /// <summary>
      /// The type of the field content.
      /// </summary>
      [DataMember]
      public int ContentType { get; set; }

      /// <summary>
      /// The contents, as an array of strings.
      /// </summary>
      [DataMember]
      public string[] Contents { get; set; }

      /// <summary>
      /// The associated content values.
      /// </summary>
      [DataMember]
      public string[] ContentValues { get; set; }

      /// <summary>
      /// The maximum allowed input length for the PDF field.
      /// </summary>
      [DataMember]
      public int MaxLength { get; set; }

      /// <summary>
      /// The associated Group ID.
      /// </summary>
      [DataMember]
      public int GroupId { get; set; }

      /// <summary>
      /// The contents that are selected.
      /// </summary>
      [DataMember]
      public string[] SelectedContents { get; set; }

      /// <summary>
      /// The field state.
      /// </summary>
      [DataMember]
      public int State { get; set; }

      /// <summary>
      /// The field flags.
      /// </summary>
      [DataMember]
      public long FieldFlags { get; set; }

      /// <summary>
      /// The view flags.
      /// </summary>
      [DataMember]
      public long ViewFlags { get; set; }

      /// <summary>
      /// The fill mode used on the PDF field.
      /// </summary>
      [DataMember]
      public int FillMode { get; set; }

      /// <summary>
      /// The fill color for the form field.
      /// </summary>
      [DataMember]
      public string FillColor { get; set; }

      /// <summary>
      /// The border style.
      /// </summary>
      [DataMember]
      public int BorderStyle { get; set; }

      /// <summary>
      /// The width of the border.
      /// </summary>
      [DataMember]
      public int BorderWidth { get; set; }

      /// <summary>
      /// The color of the border.
      /// </summary>
      [DataMember]
      public string BorderColor { get; set; }

      /// <summary>
      /// The color of the text.
      /// </summary>
      [DataMember]
      public string TextColor { get; set; }

      /// <summary>
      /// The name of the font used.
      /// </summary>
      [DataMember]
      public string FontName { get; set; }

      /// <summary>
      /// The size of the font.
      /// </summary>
      [DataMember]
      public int FontSize { get; set; }

      /// <summary>
      /// The justification of the form field text.
      /// </summary>
      [DataMember]
      public int TextJustification { get; set; }

      /// <summary>
      /// The rotation angle, if any.
      /// </summary>
      [DataMember]
      public int Rotation { get; set; }
   }

   /// <summary>
   /// A representation of the signature for a PDF.
   /// </summary>
   [DataContract]
   public class PdfSignature
   {
      public PdfSignature() { }

      /// <summary>
      /// The bounds of the signature.
      /// </summary>
      [DataMember]
      public PDFRect Bounds { get; set; }

      /// <summary>
      /// Can this signature be validated?
      /// </summary>
      [DataMember]
      public bool CanValidate { get; set; }

      /// <summary>
      /// A dictionary containing all certificate info found.
      /// </summary>
      [DataMember]
      public IDictionary<string, string> CertificateInfo { get; set; }

      /// <summary>
      /// The key usage.
      /// </summary>
      [DataMember]
      public int KeyUsage { get; set; }

      /// <summary>
      /// The page number of the signature.
      /// </summary>
      [DataMember]
      public int PageNumber { get; set; }

      /// <summary>
      /// The bits used for the public key.
      /// </summary>
      [DataMember]
      public int PublicKeyBits { get; set; }

      /// <summary>
      /// The type of public key being used.
      /// </summary>
      [DataMember]
      public int PublicKeyType { get; set; }

      /// <summary>
      /// The state of the signature.
      /// </summary>
      [DataMember]
      public int State { get; set; }

      /// <summary>
      /// The date and time from which the signature is valid.
      /// </summary>
      [DataMember]
      public DateTime ValidFrom { get; set; }

      /// <summary>
      /// The date and time until whcih the signature is valid.
      /// </summary>
      [DataMember]
      public DateTime ValidTo { get; set; }

      /// <summary>
      /// The associated version of the signature.
      /// </summary>
      [DataMember]
      public int Version { get; set; }
   }
}