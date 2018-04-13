module CustomAnnotations {
   // AnnRichTextDrawDesigner
   export class AnnRichTextDrawDesigner extends lt.Annotations.Designers.AnnRectangleDrawDesigner {

      constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annRichTextObject: lt.Annotations.Core.AnnObject) {
         super(automationControl, container, <lt.Annotations.Core.AnnRectangleObject>annRichTextObject);
      }
   }
}