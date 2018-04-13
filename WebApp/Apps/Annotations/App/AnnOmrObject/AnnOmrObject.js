var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    var AnnOmrObject = (function (_super) {
        __extends(AnnOmrObject, _super);
        function AnnOmrObject() {
            _super.call(this);
            this.setId(-50); // set the object id
            this.set_tag(null);
        }
        AnnOmrObject.prototype.create = function () {
            return new AnnOmrObject();
        };
        return AnnOmrObject;
    }(lt.Annotations.Core.AnnRectangleObject));
    CustomAnnotations.AnnOmrObject = AnnOmrObject;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnOmrObject.js.map