var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnRichTextRenderer
    var AnnRichTextRenderer = (function (_super) {
        __extends(AnnRichTextRenderer, _super);
        function AnnRichTextRenderer() {
            _super.call(this);
        }
        AnnRichTextRenderer.prototype.get_locationsThumbStyle = function () { return _super.prototype.get_locationsThumbStyle.call(this); };
        AnnRichTextRenderer.prototype.set_locationsThumbStyle = function (value) { _super.prototype.set_locationsThumbStyle.call(this, value); };
        AnnRichTextRenderer.prototype.get_rotateCenterThumbStyle = function () { return _super.prototype.get_rotateCenterThumbStyle.call(this); };
        AnnRichTextRenderer.prototype.set_rotateCenterThumbStyle = function (value) { _super.prototype.set_rotateCenterThumbStyle.call(this, value); };
        AnnRichTextRenderer.prototype.get_rotateGripperThumbStyle = function () { return _super.prototype.get_rotateGripperThumbStyle.call(this); };
        AnnRichTextRenderer.prototype.set_rotateGripperThumbStyle = function (value) { _super.prototype.set_rotateGripperThumbStyle.call(this, value); };
        AnnRichTextRenderer.prototype.get_renderingEngine = function () { return _super.prototype.get_renderingEngine.call(this); };
        AnnRichTextRenderer.prototype.get_labelRenderer = function () { return _super.prototype.get_labelRenderer.call(this); };
        AnnRichTextRenderer.prototype.set_labelRenderer = function (value) { _super.prototype.set_labelRenderer.call(this, value); };
        AnnRichTextRenderer.prototype.initialize = function (renderingEngine) { _super.prototype.initialize.call(this, renderingEngine); };
        AnnRichTextRenderer.prototype.getRenderPoints = function (mapper, annObject) { return _super.prototype.getRenderPoints.call(this, mapper, annObject); };
        // Override the Render method in order to draw the 3 points as the user creates them.  
        AnnRichTextRenderer.prototype.render = function (mapper, annObject) {
            _super.prototype.render.call(this, mapper, annObject);
            var engine = _super.prototype.get_renderingEngine.call(this);
            if (engine != null) {
                var context = engine.get_context();
                if (context != null) {
                    context.save();
                    var richTextObject = annObject;
                    var defaultMapper = lt.Annotations.Core.AnnContainerMapper.createDefault();
                    var defaultRect = defaultMapper.rectFromContainerCoordinates(richTextObject.get_rect(), annObject.get_fixedStateOperations());
                    var transformedRect = mapper.rectFromContainerCoordinates(richTextObject.get_rect(), annObject.get_fixedStateOperations());
                    var scaleX = defaultRect.get_width() / transformedRect.get_width();
                    var scaleY = defaultRect.get_height() / transformedRect.get_height();
                    transformedRect.inflate(-annObject.stroke.strokeThickness.value / 2, -annObject.stroke.strokeThickness.value / 2);
                    if (transformedRect.width < 1)
                        transformedRect.width = 1;
                    if (transformedRect.height < 1)
                        transformedRect.height = 1;
                    if (richTextObject.IsImageLoaded) {
                        context.drawImage(richTextObject.Image, 0, 0, transformedRect.get_width() * scaleX, transformedRect.get_height() * scaleY, transformedRect.get_x(), transformedRect.get_y(), transformedRect.get_width(), transformedRect.get_height());
                    }
                    else {
                        var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="10000" height="10000">';
                        svgString += richTextObject.RichTextSvgString;
                        svgString += '</svg>';
                        richTextObject.Image = document.createElement("img");
                        richTextObject.Image.onload = function () {
                            richTextObject.IsImageLoaded = true;
                            context.drawImage(richTextObject.Image, 0, 0, transformedRect.get_width() * scaleX, transformedRect.get_height() * scaleY, transformedRect.get_x(), transformedRect.get_y(), transformedRect.get_width(), transformedRect.get_height());
                            richTextObject.Image.onload = null;
                        };
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
        };
        AnnRichTextRenderer.prototype.renderThumbs = function (mapper, thumbLocations, operations) { _super.prototype.renderThumbs.call(this, mapper, thumbLocations, operations); };
        AnnRichTextRenderer.prototype.renderRotatePointThumbs = function (mapper, rotateCenterLocation, rotateGripperLocation, operations) { _super.prototype.renderRotatePointThumbs.call(this, mapper, rotateCenterLocation, rotateGripperLocation, operations); };
        AnnRichTextRenderer.prototype.renderLocked = function (mapper, annObject, operations) { _super.prototype.renderLocked.call(this, mapper, annObject, operations); };
        AnnRichTextRenderer.prototype.renderNote = function (mapper, annObject, operations) { return; };
        AnnRichTextRenderer.prototype.renderSelection = function (mapper, annObject) { return; };
        AnnRichTextRenderer.prototype.addObject = function (annObject) { _super.prototype.addObject.call(this, annObject); };
        AnnRichTextRenderer.prototype.removeObject = function (annObject) { _super.prototype.removeObject.call(this, annObject); };
        return AnnRichTextRenderer;
    }(lt.Annotations.Rendering.AnnRectangleObjectRenderer));
    CustomAnnotations.AnnRichTextRenderer = AnnRichTextRenderer;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnRichTextRenderer.js.map