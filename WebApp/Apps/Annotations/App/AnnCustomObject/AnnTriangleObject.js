var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnTriangleObject
    var AnnTriangleObject = (function (_super) {
        __extends(AnnTriangleObject, _super);
        function AnnTriangleObject() {
            _super.call(this);
            this.set_isClosed(true); // triangle is a closed figure
            this.setId(-99); // set the object id
            this.set_tag(null);
        }
        AnnTriangleObject.prototype.create = function () {
            return new AnnTriangleObject();
        };
        return AnnTriangleObject;
    }(lt.Annotations.Core.AnnPolylineObject));
    CustomAnnotations.AnnTriangleObject = AnnTriangleObject;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnTriangleObject.js.map