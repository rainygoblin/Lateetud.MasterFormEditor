var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnTriangleDrawDesigner
    var AnnTriangleDrawDesigner = (function (_super) {
        __extends(AnnTriangleDrawDesigner, _super);
        function AnnTriangleDrawDesigner(automationControl, container, annTriangleObject) {
            _super.call(this, automationControl, container, annTriangleObject);
        }
        // override the onPointerDown method and add 3 points for our triangle
        AnnTriangleDrawDesigner.prototype.onPointerDown = function (sender, e) {
            var handled = _super.prototype.onPointerDown.call(this, sender, e);
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
        };
        // override the onPointerUp method and end the drawing when we have our 3 points
        AnnTriangleDrawDesigner.prototype.onPointerUp = function (sender, e) {
            var handled = _super.prototype.onPointerUp.call(this, sender, e);
            handled = true;
            if (this.get_targetObject().get_points().get_count() >= 3) {
                this.get_targetObject().set_tag(null);
                this.endWorking();
            }
            return handled;
        };
        return AnnTriangleDrawDesigner;
    }(lt.Annotations.Designers.AnnDrawDesigner));
    CustomAnnotations.AnnTriangleDrawDesigner = AnnTriangleDrawDesigner;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnTriangleDrawDesigner.js.map