var FieldInfo = (function () {
    // constructor();
    function FieldInfo() {
        this.Name = "";
        this.ObjectId = 0;
        this.Bounds = new Bounds();
        this.OcrFieldInfo = new OcrFieldInfo();
        this.OmrFieldInfo = new OmrFieldInfo();
    }
    return FieldInfo;
}());
var Bounds = (function () {
    //constructor();
    function Bounds() {
        this.Top = 0;
        this.Left = 0;
        this.Height = 0;
        this.Width = 0;
    }
    return Bounds;
}());
var OcrFieldInfo = (function () {
    //constructor();
    function OcrFieldInfo() {
        this.Character = false;
        this.Numeric = false;
        this.Data = false;
        this.EnableOCR = false;
        this.EnableICR = false;
        this.Words = false;
        this.CellBoarders = false;
    }
    return OcrFieldInfo;
}());
var OmrFieldInfo = (function () {
    // constructor();
    function OmrFieldInfo() {
        this.Lowest = false;
        this.Low = false;
        this.High = false;
        this.Highest = false;
        this.Auto = false;
        this.WithFrame = false;
        this.WithoutFrame = false;
    }
    return OmrFieldInfo;
}());
//# sourceMappingURL=CustomFieldInfo.js.map