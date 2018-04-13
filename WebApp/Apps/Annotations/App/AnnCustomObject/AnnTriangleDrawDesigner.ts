module CustomAnnotations {
   // AnnTriangleDrawDesigner
   export class AnnTriangleDrawDesigner extends lt.Annotations.Designers.AnnDrawDesigner {

      constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annTriangleObject: lt.Annotations.Core.AnnObject) {
         super(automationControl, container, annTriangleObject);
      }

      // override the onPointerDown method and add 3 points for our triangle
      onPointerDown(sender: lt.Annotations.Core.AnnContainer, e: lt.Annotations.Core.AnnPointerEventArgs): boolean {

         var handled = super.onPointerDown(sender, e);

         if (this.get_targetObject().get_points().get_count() < 3) {

            this.get_targetObject().set_tag('drawing');

            if (e.get_button() === lt.Annotations.Core.AnnMouseButton.left) {

                this.get_targetObject().get_points().add(this.snapPointToGrid(e.get_location(), false));

               this.startWorking();

               handled = true;
            }
         }

         this.invalidate(lt.LeadRectD.empty);

         return handled;
      }

      // override the onPointerUp method and end the drawing when we have our 3 points
      onPointerUp(sender: lt.Annotations.Core.AnnContainer, e: lt.Annotations.Core.AnnPointerEventArgs): boolean {

         var handled = super.onPointerUp(sender, e);

         handled = true;

         if (this.get_targetObject().get_points().get_count() >= 3) {

            this.get_targetObject().set_tag(null);

            this.endWorking();
         }

         return handled;
      }
   }
}