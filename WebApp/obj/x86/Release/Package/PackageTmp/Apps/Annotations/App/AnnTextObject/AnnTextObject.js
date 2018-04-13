var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    var AnnTextObject = (function (_super) {
        __extends(AnnTextObject, _super);
        function AnnTextObject() {
            _super.call(this);
            this.setId(-51); // set the object id
        }
        AnnTextObject.prototype.create = function () {
            return new AnnTextObject();
        };
        return AnnTextObject;
    }(lt.Annotations.Core.AnnRectangleObject));
    CustomAnnotations.AnnTextObject = AnnTextObject;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnTextObject.js.map