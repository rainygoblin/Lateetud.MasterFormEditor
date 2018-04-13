
class FieldInfo {
    Name: string;
    ObjectId: number;
    Bounds: Bounds;
    OcrFieldInfo: OcrFieldInfo;
    OmrFieldInfo: OmrFieldInfo;
    // constructor();
    constructor() {
        this.Name = "";
        this.ObjectId = 0;
        this.Bounds = new Bounds();
        this.OcrFieldInfo = new OcrFieldInfo();
        this.OmrFieldInfo = new OmrFieldInfo();
    }

}

class Bounds {
    Top: number;
    Left: number;
    Height: number;
    Width: number;
    //constructor();
    constructor() {
        this.Top = 0;
        this.Left = 0;
        this.Height = 0;
        this.Width = 0;
    }
}

class OcrFieldInfo {
    Character: boolean;
    Numeric: boolean;
    Data: boolean;
    EnableOCR: boolean;
    EnableICR: boolean;
    Words: boolean;
    CellBoarders: boolean;
    //constructor();
    constructor() {
        this.Character = false;
        this.Numeric = false;
        this.Data = false;
        this.EnableOCR = false;
        this.EnableICR = false;
        this.Words = false;
        this.CellBoarders = false;
    }
}

class OmrFieldInfo {
    Lowest: boolean;
    Low: boolean;
    High: boolean;
    Highest: boolean;
    Auto: boolean;
    WithFrame: boolean;
    WithoutFrame: boolean;
    // constructor();
    constructor() {
        this.Lowest = false;
        this.Low = false;
        this.High = false;
        this.Highest = false;
        this.Auto = false;
        this.WithFrame = false;
        this.WithoutFrame = false;
    }
}



