module CustomAnnotations {
   // AnnTriangleEditDesigner
   // We won't actually need to do any customization of this class.
   export class AnnTriangleEditDesigner extends lt.Annotations.Designers.AnnPolylineEditDesigner {
      constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annTriangleObject: CustomAnnotations.AnnTriangleObject) {
         super(automationControl, container, annTriangleObject);
      }
   }
} 