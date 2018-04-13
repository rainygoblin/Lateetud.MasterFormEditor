var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnTriangleEditDesigner
    // We won't actually need to do any customization of this class.
    var AnnTriangleEditDesigner = (function (_super) {
        __extends(AnnTriangleEditDesigner, _super);
        function AnnTriangleEditDesigner(automationControl, container, annTriangleObject) {
            _super.call(this, automationControl, container, annTriangleObject);
        }
        return AnnTriangleEditDesigner;
    }(lt.Annotations.Designers.AnnPolylineEditDesigner));
    CustomAnnotations.AnnTriangleEditDesigner = AnnTriangleEditDesigner;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnTriangleEditDesigner.js.map