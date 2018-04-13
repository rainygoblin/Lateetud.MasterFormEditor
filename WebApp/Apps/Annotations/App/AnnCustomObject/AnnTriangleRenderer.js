var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnTriangleRenderer
    var AnnTriangleRenderer = (function (_super) {
        __extends(AnnTriangleRenderer, _super);
        function AnnTriangleRenderer() {
            _super.call(this);
        }
        AnnTriangleRenderer.prototype.get_locationsThumbStyle = function () { return _super.prototype.get_locationsThumbStyle.call(this); };
        AnnTriangleRenderer.prototype.set_locationsThumbStyle = function (value) { _super.prototype.set_locationsThumbStyle.call(this, value); };
        AnnTriangleRenderer.prototype.get_rotateCenterThumbStyle = function () { return _super.prototype.get_rotateCenterThumbStyle.call(this); };
        AnnTriangleRenderer.prototype.set_rotateCenterThumbStyle = function (value) { _super.prototype.set_rotateCenterThumbStyle.call(this, value); };
        AnnTriangleRenderer.prototype.get_rotateGripperThumbStyle = function () { return _super.prototype.get_rotateGripperThumbStyle.call(this); };
        AnnTriangleRenderer.prototype.set_rotateGripperThumbStyle = function (value) { _super.prototype.set_rotateGripperThumbStyle.call(this, value); };
        AnnTriangleRenderer.prototype.get_renderingEngine = function () { return _super.prototype.get_renderingEngine.call(this); };
        AnnTriangleRenderer.prototype.get_labelRenderer = function () { return _super.prototype.get_labelRenderer.call(this); };
        AnnTriangleRenderer.prototype.set_labelRenderer = function (value) { _super.prototype.set_labelRenderer.call(this, value); };
        AnnTriangleRenderer.prototype.initialize = function (renderingEngine) { _super.prototype.initialize.call(this, renderingEngine); };
        AnnTriangleRenderer.prototype.getRenderPoints = function (mapper, annObject) { return _super.prototype.getRenderPoints.call(this, mapper, annObject); };
        // Override the Render method in order to draw the 3 points as the user creates them.  
        AnnTriangleRenderer.prototype.render = function (mapper, annObject) {
            _super.prototype.render.call(this, mapper, annObject);
            // if we are finished 'drawing', allow the base class AnnPolylineObjectRenderer to handle the job
            if (annObject.get_tag() != 'drawing')
                return;
            var engine = _super.prototype.get_renderingEngine.call(this);
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
        };
        AnnTriangleRenderer.prototype.renderThumbs = function (mapper, thumbLocations, operations) { _super.prototype.renderThumbs.call(this, mapper, thumbLocations, operations); };
        AnnTriangleRenderer.prototype.renderRotatePointThumbs = function (mapper, rotateCenterLocation, rotateGripperLocation, operations) { _super.prototype.renderRotatePointThumbs.call(this, mapper, rotateCenterLocation, rotateGripperLocation, operations); };
        AnnTriangleRenderer.prototype.renderLocked = function (mapper, annObject, operations) { _super.prototype.renderLocked.call(this, mapper, annObject, operations); };
        AnnTriangleRenderer.prototype.renderNote = function (mapper, annObject, operations) { return; };
        AnnTriangleRenderer.prototype.renderSelection = function (mapper, annObject) { return; };
        AnnTriangleRenderer.prototype.addObject = function (annObject) { _super.prototype.addObject.call(this, annObject); };
        AnnTriangleRenderer.prototype.removeObject = function (annObject) { _super.prototype.removeObject.call(this, annObject); };
        return AnnTriangleRenderer;
    }(lt.Annotations.Rendering.AnnPolylineObjectRenderer));
    CustomAnnotations.AnnTriangleRenderer = AnnTriangleRenderer;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnTriangleRenderer.js.map