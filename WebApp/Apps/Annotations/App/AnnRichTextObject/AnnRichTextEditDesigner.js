var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomAnnotations;
(function (CustomAnnotations) {
    // AnnRichTextEditDesigner
    // We won't actually need to do any customization of this class.
    var AnnRichTextEditDesigner = (function (_super) {
        __extends(AnnRichTextEditDesigner, _super);
        function AnnRichTextEditDesigner(automationControl, container, annRichTextObject) {
            _super.call(this, automationControl, container, annRichTextObject);
        }
        return AnnRichTextEditDesigner;
    }(lt.Annotations.Designers.AnnRectangleEditDesigner));
    CustomAnnotations.AnnRichTextEditDesigner = AnnRichTextEditDesigner;
})(CustomAnnotations || (CustomAnnotations = {}));
//# sourceMappingURL=AnnRichTextEditDesigner.js.map