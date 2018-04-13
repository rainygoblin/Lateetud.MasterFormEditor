module CustomAnnotations {
    // AnnRichTextObject
    export class AnnRichTextObject extends lt.Annotations.Core.AnnRectangleObject {

        constructor() {
            super();
            this._img = document.createElement("img");
            this._richTextString = '<p><span style="color: rgb(255, 0, 0);"></span><span style="color: rgb(0, 0, 0); font-size: 20px;"><span style="color: rgb(255, 0, 0); font-size: 20px;">Aa</span><span style="color: rgb(0, 255, 0); font-size: 20px;">Bb</span><span style="color: rgb(0, 0, 255); font-size: 20px;">Yy</span><span style="color: rgb(0, 0, 0); font-size: 20px;">Zz</span></span><span style="color: rgb(0, 0, 0); font-size: 14px;"></span></p>';
            //vipul
            //this._TextBoxTextString = 'Vipul';
            //vipul
            this._richTextSvgString = '';
            this._isSvgTextValid = false;
            this.loadSvgImage();
            this.setId(-200);// set the object id
            this.set_tag(null);

            //registerclass to annotation.Core for allowing it to get class Full Name 
            (<any>CustomAnnotations.AnnRichTextObject).registerClass('CustomAnnotations.AnnRichTextObject', lt.Annotations.Core.AnnObject);
        }

        private _img: HTMLImageElement;
        get Image(): HTMLImageElement {
            return this._img;
        }
        set Image(value: HTMLImageElement) {
            this._img = value;
        }

        private _richTextString: string;
        get RichTextString(): string {
            return this._richTextString;
        }
        set RichTextString(value: string) {
            this._richTextString = value;
        }

        //vipul
        //private _TextBoxTextString: string;
        //get TextBoxTextString(): string {
        //    return this._TextBoxTextString;
        //}
        //set TextBoxTextString(value: string) {
        //    this._TextBoxTextString = value;
        //}
        //vipul

        private _richTextSvgString: string;
        get RichTextSvgString(): string {
            return this._richTextSvgString;
        }
        set RichTextSvgString(value: string) {
            this._richTextSvgString = value;
        }

        private _isSvgTextValid: boolean;
        get IsSvgTextValid(): boolean {
            return this._isSvgTextValid;
        }
        set IsSvgTextValid(value: boolean) {
            this._isSvgTextValid = value;
        }

        private _isImageLoaded: boolean;
        get IsImageLoaded(): boolean {
            return this._isImageLoaded;
        }
        set IsImageLoaded(value: boolean) {
            this._isImageLoaded = value;
        }

        create(): AnnRichTextObject {
            return new AnnRichTextObject();
        }

        get_friendlyName(): string {
            return 'Rich Text';
        }

        get_supportsFill(): boolean {
            return true;
        }

        get_supportsFont(): boolean {
            return false;
        }

        get_canRotate(): boolean {
            return false;
        }

        get supportsContent(): boolean {
            return false;
        }

        validateSvgString(): void {
            this.RichTextSvgString = this.convertSvgNode(this.RichTextString);
            this.IsSvgTextValid = true;
        }

        convertSvgNode(htmlInput: string): string {
            var svgElements: string = "";
            if (htmlInput) {
                while (htmlInput.search("rgba") > 0) {
                    htmlInput = htmlInput.replace("rgba", "rgb");
                }
                while (htmlInput.search("&nbsp;") >= 0) {
                    htmlInput = htmlInput.replace("&nbsp;", " ");
                }
                while (htmlInput.search("div") > 0) {
                    htmlInput = htmlInput.replace("div", "p");
                }
                var startIndex = -1;
                var endIndex = -1;
                var lineCloseTag = "</p>";
                var line;
                var textElementsValues: string[] = [];
                var textElementsXPositions: string[] = [];
                var textElementsYPositions: string[] = [];
                var textElementsFill: string[] = [];
                var textElementsIsBold: string[] = [];
                var textElementsIsItalic: string[] = [];
                var textElementsIsStrike: string[] = [];
                var textElementsIsUnderline: string[] = [];
                var textElementsFontSizes: string[] = [];
                var textElementsFontTypes: string[] = [];

                var rectsHeights: string[] = [];
                var rectsWidths: string[] = [];
                var rectsXPositions: string[] = [];
                var rectsYPositions: string[] = [];
                var rectsFill: string[] = [];
                var lines: string[] = [];
                var isValid = false;
                while (true) {
                    var openTag1 = htmlInput.search("<p>");
                    var openTag2 = htmlInput.search("<p ");
                    if (openTag1 == -1 && openTag2 >= 0)
                        startIndex = openTag2;
                    else if (openTag2 == -1 && openTag1 >= 0)
                        startIndex = openTag1;
                    else if (openTag1 >= 0 && openTag2 >= 0)
                        startIndex = Math.min(openTag1, openTag2);
                    else if (!isValid) {
                        htmlInput = '<p>' + htmlInput + '</p>';
                        isValid = true;
                        continue;
                    }
                    else {
                        break;
                    }
                    endIndex = htmlInput.search("</p>");
                    line = htmlInput.substring(startIndex, htmlInput.search("</p>") + ("</p>").length);
                    htmlInput = htmlInput.substring(startIndex + line.length, htmlInput.length);
                    lines.push(line);
                }
                var lineNumber: number = -1;
                var currentLineFirstIndex: number;
                var currentLineRectFirstIndex: number;
                for (var i = 0; i < lines.length; i++) {
                    line = lines[i];
                    currentLineFirstIndex = textElementsValues.length;
                    currentLineRectFirstIndex = rectsFill.length;
                    var lineIsEmpty: boolean = true;
                    var isbold: number = 0;
                    var isItalic: number = 0;
                    var isUnderlined: number = 0;
                    var isStrike: number = 0;
                    var textColors: string[] = [];
                    var backgroundColors: string[] = [];
                    var fontTypes: string[] = [];
                    var xPosition: number = 0;
                    var fontSizes: string[] = [];
                    var biggestFontSize: number = 0;
                    startIndex = -1;
                    endIndex = -1;
                    while (true) {
                        startIndex = line.search('<');
                        endIndex = line.search('>');
                        //-------------------- Reading tag --------------------
                        if (startIndex == 0) {
                            if (line.search("<span ") == 0 || line.search("<span>") == 0) {
                                var colorKey = '';
                                if ((line.search('"color') < endIndex && line.search('"color') > 0))
                                    colorKey = '"color';
                                else if ((line.search(' color') < endIndex && line.search(' color') > 0))
                                    colorKey = ' color';
                                else if ((line.search(';color') < endIndex && line.search(';color') > 0))
                                    colorKey = ';color';
                                else if ((line.search("'color") < endIndex && line.search("'color") > 0))
                                    colorKey = "'color";
                                if (colorKey != '') {
                                    var colorValue = '';
                                    colorValue = line.substring(line.search(colorKey), line.length);
                                    colorValue = colorValue.substring(colorKey.length + 1, colorValue.indexOf(')') + 1);
                                    while (colorValue[0] == ' ') {
                                        colorValue = colorValue.slice(1, colorValue.length);
                                    }
                                    if (colorValue.search("rgb") == 0) {
                                        textColors.push(colorValue);
                                    }
                                }
                                else {
                                    textColors.push('rgb (0, 0, 0)');
                                }
                                if (line.search('background-color') < endIndex && line.search('background-color') > 0) {
                                    var colorValue = '';
                                    colorValue = line.substring(line.search("background-color:"), line.length);
                                    colorValue = colorValue.substring("background-color:".length, colorValue.indexOf(')') + 1);
                                    while (colorValue[0] == ' ') {
                                        colorValue = colorValue.slice(1, colorValue.length);
                                    }
                                    if (colorValue.search("rgb") == 0 && colorValue.search("254") < 0) {
                                        backgroundColors.push(colorValue);
                                    }
                                    else {
                                        backgroundColors.push("Transparent");
                                    }
                                }
                                else {
                                    backgroundColors.push("Transparent");
                                }
                                if (line.search('font-size') < endIndex && line.search('font-size') > 0) {
                                    var fontSizeValue = '';
                                    fontSizeValue = line.substring(line.search("font-size:"), line.length);
                                    fontSizeValue = fontSizeValue.substring("font-size:".length, fontSizeValue.indexOf('px'));
                                    while (fontSizeValue[0] == ' ') {
                                        fontSizeValue = fontSizeValue.slice(1, fontSizeValue.length);
                                    }
                                    fontSizes.push(fontSizeValue);
                                }
                                else {
                                    fontSizes.push('14');
                                }
                                if (line.search('font-family') < endIndex && line.search('font-family') > 0) {
                                    var fontTypeValue = '';
                                    fontTypeValue = line.substring(line.search("font-family:"), line.length);
                                    fontTypeValue = fontTypeValue.substring("font-family:".length, fontTypeValue.indexOf(';'));
                                    while (fontTypeValue[0] == ' ' || fontTypeValue[0] == "'" || fontTypeValue[0] == '"' || fontTypeValue[0] == "\\") {
                                        fontTypeValue = fontTypeValue.slice(1, fontTypeValue.length);
                                    }
                                    while (fontTypeValue[fontTypeValue.length - 1] == ' ' || fontTypeValue[fontTypeValue.length - 1] == "'" || fontTypeValue[fontTypeValue.length - 1] == '"' || fontTypeValue[fontTypeValue.length - 1] == "\\") {
                                        fontTypeValue = fontTypeValue.slice(0, fontTypeValue.length - 1);
                                    }
                                    if (fontTypeValue == "Arial" || fontTypeValue == "Courier New" || fontTypeValue == "Times New Roman" || fontTypeValue == "Verdana") {
                                        fontTypes.push(fontTypeValue);
                                    }
                                    else {
                                        fontTypes.push("Arial");
                                    }
                                }
                                else {
                                    fontTypes.push("Arial");
                                }
                            }
                            else if (line.search("<strong ") == 0 || line.search("<strong>") == 0 || line.search("<b ") == 0 || line.search("<b>") == 0) {
                                isbold++;
                            }
                            else if (line.search("<br>") == 0 || line.search("<br ") == 0) {
                                lineNumber++;
                            }
                            else if (line.search("<em ") == 0 || line.search("<em>") == 0 || line.search("<i ") == 0 || line.search("<i>") == 0) {
                                isItalic++;
                            }
                            else if (line.search("<strike ") == 0 || line.search("<strike>") == 0) {
                                isStrike++;
                            }
                            else if (line.search("<u ") == 0 || line.search("<u>") == 0) {
                                isUnderlined++;
                            }
                            else if (line.search("</strong ") == 0 || line.search("</strong>") == 0 || line.search("</b ") == 0 || line.search("</b>") == 0) {
                                isbold--;
                            }
                            else if (line.search("</em ") == 0 || line.search("</em>") == 0 || line.search("</i ") == 0 || line.search("</i>") == 0) {
                                isItalic--;
                            }
                            else if (line.search("</strike ") == 0 || line.search("</strike>") == 0) {
                                isStrike--;
                            }
                            else if (line.search("</u ") == 0 || line.search("</u>") == 0) {
                                isUnderlined--;
                            }
                            else if (line.search("</span ") == 0 || line.search("</span>") == 0) {
                                if (textColors.length > 0)
                                    textColors.pop();
                                if (backgroundColors.length > 0) {
                                    backgroundColors.pop();
                                }
                                if (fontTypes.length > 0) {
                                    fontTypes.pop();
                                }
                                if (fontSizes.length > 0) {
                                    fontSizes.pop();
                                }
                            }
                            line = line.substring(endIndex + 1, line.length);
                        }
                        //------------------------------------------------------
                        //-------------------- Reading Value --------------------
                        else if (startIndex > 0) {
                            var value = line.substring(0, startIndex);

                            var fontType: string = '';
                            if (fontTypes.length > 0) {
                                fontType = fontTypes[fontTypes.length - 1];
                            }
                            else {
                                fontType = "Arial";
                            }

                            var fontSize = '';
                            if (fontSizes.length > 0) {
                                fontSize = (fontSizes[fontSizes.length - 1]);
                            }
                            else {
                                fontSize = "14";
                            }
                            if (parseInt(fontSize) > biggestFontSize)
                                biggestFontSize = parseInt(fontSize);
                            if (lineIsEmpty) {
                                lineIsEmpty = false;
                                lineNumber++;
                            }

                            textElementsFontSizes.push(fontSize);
                            textElementsXPositions.push(xPosition.toString());
                            if (textColors.length > 0) {
                                textElementsFill.push(textColors[textColors.length - 1]);
                            }
                            else {
                                textElementsFill.push('rgb (0, 0, 0)');
                            }
                            if (backgroundColors.length > 0) {
                                if (backgroundColors[backgroundColors.length - 1] != "Transparent") {
                                    rectsXPositions.push(xPosition.toString());
                                    rectsWidths.push((this.getTextWidth(value, fontType, fontSize, isbold, isItalic)).toString());
                                    rectsFill.push(backgroundColors[backgroundColors.length - 1]);
                                }
                            }
                            textElementsFontTypes.push(fontType);
                            textElementsIsBold.push(isbold.toString());
                            textElementsIsItalic.push(isItalic.toString());
                            textElementsIsStrike.push(isStrike.toString());
                            textElementsIsUnderline.push(isUnderlined.toString());
                            textElementsValues.push(value);
                            xPosition += this.getTextWidth(value, fontType, fontSize, isbold, isItalic);
                            line = line.substring(startIndex, line.length);

                        }
                        //------------------------------------------------------
                        //-------------------- Reading line is done --------------------
                        else {
                            var shift: number = 5;
                            if (textElementsYPositions.length != 0) {
                                shift += parseInt(textElementsYPositions[textElementsYPositions.length - 1]);
                            }
                            for (var index = currentLineFirstIndex; index < textElementsValues.length; index++) {
                                textElementsYPositions.push((biggestFontSize + shift).toString());
                            }
                            for (var index = currentLineRectFirstIndex; index < rectsFill.length; index++) {
                                rectsYPositions.push((shift + biggestFontSize * 25 / 100).toString());
                            }
                            for (var index = currentLineRectFirstIndex; index < rectsFill.length; index++) {
                                rectsHeights.push((biggestFontSize).toString());
                            }
                            break;
                        }
                        //------------------------------------------------------
                    }

                }
            }
            var textElements = "";
            if (textElementsValues != null) {
                for (var i = 0; i < textElementsValues.length; i++) {
                    var textElement = '<text xml:space="preserve" font-size="' + textElementsFontSizes[i] + '" x ="' + textElementsXPositions[i] + '" y = "' + textElementsYPositions[i] + '" fill = "' + textElementsFill[i] + '" style = "font-family: ' + textElementsFontTypes[i] + '; ';
                    if (parseInt(textElementsIsBold[i]) > 0) {
                        textElement += 'font-weight: bold; ';
                    }
                    if (parseInt(textElementsIsItalic[i]) > 0) {
                        textElement += 'font-style: italic; ';
                    }
                    if (parseInt(textElementsIsStrike[i]) > 0) {
                        textElement += 'text-decoration: line-through; ';
                    }
                    if (parseInt(textElementsIsUnderline[i]) > 0) {
                        textElement += 'text-decoration: underline; ';
                    }

                    while (textElementsValues[i].search(" ") >= 0) {
                        textElementsValues[i] = textElementsValues[i].replace(" ", "&#160;");
                    }
                    textElement += '">' + textElementsValues[i] + '</text>';
                    textElements += textElement;
                }
            }
            var svgRects = "";
            if (rectsFill != null) {
                for (var i = 0; i < rectsFill.length; i++) {
                    var rect = '<rect x ="' + rectsXPositions[i] + '" y ="' + rectsYPositions[i] + '" width ="' + rectsWidths[i] + '" height ="' + rectsHeights[i] + '" fill ="' + rectsFill[i] + '"></rect>';
                    svgRects += rect;
                }
            }
            return svgRects + textElements;
        }

        loadSvgImage(): void {
            var richTextObject = this;
            if (!richTextObject.IsSvgTextValid) {
                richTextObject.validateSvgString();
            }


            var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="10000" height="10000">';

            svgString += richTextObject.RichTextSvgString;

            svgString += '</svg>';
            var oldOnLoadHandler: EventListener = richTextObject.Image.onload;
            richTextObject.Image.onload = function () {
                richTextObject.IsImageLoaded = true;
                if (oldOnLoadHandler != null)
                    oldOnLoadHandler.apply(richTextObject);
            }
            richTextObject.IsImageLoaded = false;

            if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTHelper.version <= 9) {
                var svgStringBytes = [];

                for (var i = 0; i < svgString.length; ++i) {
                    svgStringBytes.push(svgString.charCodeAt(i));
                }
                richTextObject.Image.src = "data:image/svg+xml;base64," + lt.Annotations.Core.Utils.toBase64String(svgStringBytes);
            }
            else {
                richTextObject.Image.src = "data:image/svg+xml;base64," + btoa(svgString);
            }
        }

        getTextWidth(text: string, font: string, fontSize: string, isBold: number, isItalic: number): number {
            var canvas: HTMLCanvasElement = document.createElement("canvas");
            var context: CanvasRenderingContext2D = canvas.getContext("2d");
            var textFont = '';
            if (isBold > 0) {
                textFont += 'Bold ';
            }
            if (isItalic > 0) {
                textFont += 'Italic ';
            }
            textFont += fontSize + 'px ' + font;
            context.font = textFont;
            var metrics: TextMetrics = context.measureText(text);
            return metrics.width;
        }

        clone(): AnnRichTextObject {
            var richTextObject: AnnRichTextObject = <AnnRichTextObject>super.clone();
            richTextObject.RichTextString = this.RichTextString;
            richTextObject.RichTextSvgString = this.RichTextSvgString;
            richTextObject.loadSvgImage();
            return richTextObject;
        }

        serialize(options: lt.Annotations.Core.AnnSerializeOptions, parentNode: Node, document: Document) {
            super.serialize(options, parentNode, document);
            var value = this.RichTextString;
            var element = document.createElement("RichTextString");
            var data = value == null ? "" : value;
            var node = document.createTextNode(data);
            element.appendChild(node);
            parentNode.appendChild(element);
        }

        deserialize(options: lt.Annotations.Core.AnnDeserializeOptions, element: Node, document: Document): void {
            super.deserialize(options, element, document);
            var data = "";

            var xmlElement: any = element;
            var nodeList = xmlElement.getElementsByTagName("RichTextString");

            for (var i = 0; i < nodeList.length; i++) {
                var childNode = nodeList[i];
                if (childNode != null && (childNode.parentNode == element)) {
                    data = childNode.firstChild.nodeValue.trim();
                    break;
                }
            }

            this.RichTextString = data;
            this.IsSvgTextValid = false;
            this.loadSvgImage();
        }
    }
}