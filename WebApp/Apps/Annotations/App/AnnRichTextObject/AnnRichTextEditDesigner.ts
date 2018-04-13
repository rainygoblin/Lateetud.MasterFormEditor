module CustomAnnotations {
   // AnnRichTextEditDesigner
   // We won't actually need to do any customization of this class.
   export class AnnRichTextEditDesigner extends lt.Annotations.Designers.AnnRectangleEditDesigner {
      constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annRichTextObject: CustomAnnotations.AnnRichTextObject) {
         super(automationControl, container, <lt.Annotations.Core.AnnRectangleObject>annRichTextObject);
      }
   }
} 