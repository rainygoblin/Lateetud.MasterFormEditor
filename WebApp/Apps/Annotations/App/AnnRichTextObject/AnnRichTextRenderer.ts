module CustomAnnotations {
   // AnnRichTextRenderer
   export class AnnRichTextRenderer extends lt.Annotations.Rendering.AnnRectangleObjectRenderer implements lt.Annotations.Core.IAnnObjectRenderer {

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

         var engine: lt.Annotations.Rendering.AnnHtml5RenderingEngine = <lt.Annotations.Rendering.AnnHtml5RenderingEngine>super.get_renderingEngine();

         if (engine != null) {

            var context = engine.get_context();

            if (context != null) {

               context.save();
               var richTextObject: AnnRichTextObject = <AnnRichTextObject> annObject;

               var defaultMapper: lt.Annotations.Core.AnnContainerMapper = lt.Annotations.Core.AnnContainerMapper.createDefault();
               var defaultRect: lt.LeadRectD = defaultMapper.rectFromContainerCoordinates(richTextObject.get_rect(), annObject.get_fixedStateOperations());


               var transformedRect: lt.LeadRectD = mapper.rectFromContainerCoordinates(richTextObject.get_rect(), annObject.get_fixedStateOperations());

               var scaleX: number = defaultRect.get_width() / transformedRect.get_width();
               var scaleY: number = defaultRect.get_height() / transformedRect.get_height();

               transformedRect.inflate(-annObject.stroke.strokeThickness.value / 2, -annObject.stroke.strokeThickness.value / 2);

               if (transformedRect.width < 1)
                  transformedRect.width = 1;

               if (transformedRect.height < 1)
                  transformedRect.height = 1;

               if (richTextObject.IsImageLoaded) {
               context.drawImage(richTextObject.Image, 0, 0, transformedRect.get_width() * scaleX, transformedRect.get_height() * scaleY, transformedRect.get_x(), transformedRect.get_y(), transformedRect.get_width(), transformedRect.get_height());
               }
                else{
                  var svgString: string = '<svg xmlns="http://www.w3.org/2000/svg" width="10000" height="10000">';

                  svgString += richTextObject.RichTextSvgString;

                   svgString += '</svg>';
                   richTextObject.Image = document.createElement("img");
                  richTextObject.Image.onload = function ()
                  {
                     richTextObject.IsImageLoaded = true;
                     context.drawImage(richTextObject.Image, 0, 0, transformedRect.get_width() * scaleX, transformedRect.get_height() * scaleY, transformedRect.get_x(), transformedRect.get_y(), transformedRect.get_width(), transformedRect.get_height());
                     richTextObject.Image.onload = null;
                  }
                  richTextObject.IsImageLoaded = false;
                  if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTHelper.version <= 9) {
                     var svgStringBytes = [];

                     for (var i = 0; i < svgString.length; ++i) {
                        svgStringBytes.push(svgString.charCodeAt(i));
                     }
                     richTextObject.Image.src = "data:image/svg+xml;base64," + lt.Annotations.Core.Utils.toBase64String(svgStringBytes);
                  }
                  else {
                     richTextObject.Image.src = "data:image/svg+xml;base64," + btoa(svgString);
                  }
               }

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