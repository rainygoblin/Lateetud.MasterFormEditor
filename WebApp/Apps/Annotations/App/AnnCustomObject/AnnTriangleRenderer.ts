module CustomAnnotations {
   // AnnTriangleRenderer
   export class AnnTriangleRenderer extends lt.Annotations.Rendering.AnnPolylineObjectRenderer implements lt.Annotations.Core.IAnnObjectRenderer {

      constructor() {
         super();
      }

      get_locationsThumbStyle(): lt.Annotations.Core.IAnnThumbStyle { return super.get_locationsThumbStyle(); }

      set_locationsThumbStyle(value: lt.Annotations.Core.IAnnThumbStyle): void { super.set_locationsThumbStyle(value); }

      get_rotateCenterThumbStyle(): lt.Annotations.Core.IAnnThumbStyle { return super.get_rotateCenterThumbStyle(); }

      set_rotateCenterThumbStyle(value: lt.Annotations.Core.IAnnThumbStyle): void { super.set_rotateCenterThumbStyle(value); }

      get_rotateGripperThumbStyle(): lt.Annotations.Core.IAnnThumbStyle { return super.get_rotateGripperThumbStyle(); }

      set_rotateGripperThumbStyle(value: lt.Annotations.Core.IAnnThumbStyle): void { super.set_rotateGripperThumbStyle(value); }

      get_renderingEngine(): lt.Annotations.Core.AnnRenderingEngine { return super.get_renderingEngine(); }

      get_labelRenderer(): lt.Annotations.Core.IAnnLabelRenderer { return super.get_labelRenderer(); }

      set_labelRenderer(value: lt.Annotations.Core.IAnnLabelRenderer): void { super.set_labelRenderer(value); }

      initialize(renderingEngine: lt.Annotations.Core.AnnRenderingEngine): void { super.initialize(renderingEngine) }

      getRenderPoints(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): lt.LeadPointD[] { return super.getRenderPoints(mapper, annObject); }

      // Override the Render method in order to draw the 3 points as the user creates them.  
      render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject) {
         super.render(mapper, annObject);

         // if we are finished 'drawing', allow the base class AnnPolylineObjectRenderer to handle the job
         if (annObject.get_tag() != 'drawing')
            return;

         var engine: lt.Annotations.Rendering.AnnHtml5RenderingEngine = <lt.Annotations.Rendering.AnnHtml5RenderingEngine>super.get_renderingEngine();

         if (engine != null) {

            var context = engine.get_context();

            if (context != null) {

               context.save();

               var points = mapper.pointsFromContainerCoordinates(annObject.get_points().toArray(), annObject.get_fixedStateOperations());

               lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStroke(context, lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create('green'), lt.LeadLengthD.create(1)));

               context.beginPath();

               for (var x = 0; x < points.length; x++) {
                  var point = points[x];

                  if (!point.get_isEmpty()) {

                     var rect = lt.LeadRectD.create(point.get_x() - 10, point.get_y() - 10, 20, 20);

                     lt.Annotations.Rendering.AnnHtml5RenderingEngine.drawEllipse(context, rect);
                  }
               }
               context.stroke();

               context.closePath();

               context.restore();
            }
         }
      }

      renderThumbs(mapper: lt.Annotations.Core.AnnContainerMapper, thumbLocations: lt.LeadPointD[], operations: lt.Annotations.Core.AnnFixedStateOperations): void { super.renderThumbs(mapper, thumbLocations, operations); }

      renderRotatePointThumbs(mapper: lt.Annotations.Core.AnnContainerMapper, rotateCenterLocation: lt.LeadPointD, rotateGripperLocation: lt.LeadPointD, operations: lt.Annotations.Core.AnnFixedStateOperations): void { super.renderRotatePointThumbs(mapper, rotateCenterLocation, rotateGripperLocation, operations); }

      renderLocked(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject, operations: lt.Annotations.Core.AnnFixedStateOperations): void { super.renderLocked(mapper, annObject, operations); }

      renderNote(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject, operations: lt.Annotations.Core.AnnFixedStateOperations): void { return; }

      renderSelection(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void { return; }

      addObject(annObject: lt.Annotations.Core.AnnObject): void { super.addObject(annObject); }

      removeObject(annObject: lt.Annotations.Core.AnnObject): void { super.removeObject(annObject); }

      locationsThumbStyle: lt.Annotations.Core.IAnnThumbStyle;
      rotateCenterThumbStyle: lt.Annotations.Core.IAnnThumbStyle;
      rotateGripperThumbStyle: lt.Annotations.Core.IAnnThumbStyle;
      renderingEngine: lt.Annotations.Core.AnnRenderingEngine; // read-only
      labelRenderer: lt.Annotations.Core.IAnnLabelRenderer;
   }
}