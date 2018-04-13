var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnRichTextDrawDesigner
    var AnnRichTextDrawDesigner = (function (_super) {
        __extends(AnnRichTextDrawDesigner, _super);
        function AnnRichTextDrawDesigner(automationControl, container, annRichTextObject) {
            _super.call(this, automationControl, container, annRichTextObject);
        }
        return AnnRichTextDrawDesigner;
    }(lt.Annotations.Designers.AnnRectangleDrawDesigner));
    CustomAnnotations.AnnRichTextDrawDesigner = AnnRichTextDrawDesigner;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnRichTextDrawDesigner.js.map