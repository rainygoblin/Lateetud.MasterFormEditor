/// <reference path="Leadtools.d.ts" />
/// <reference path="Leadtools.Annotations.Core.d.ts" />
/// <reference path="Leadtools.Annotations.Designers.d.ts" />
/// <reference path="Leadtools.Annotations.Rendering.JavaScript.d.ts" />
/// <reference path="Leadtools.Annotations.Automation.d.ts" />
declare module lt.Annotations.UserMedicalPack {
    class AnnMedicalPack implements lt.Annotations.Automation.IAnnPackage {
        private _thumbSize;
        private createLocationThumbStyle();
        private createRotateCenterThumbStyle();
        private createRotateGripperThumbStyle();
        private createParallelLines();
        private createFourParallelLines();
        private createMidline();
        private createSnapPoint();
        private createIntersectionPoint();
        private createCobbAngle();
        private createNorberg();
        getAutomationObjects(): lt.Annotations.Automation.AnnAutomationObject[];
        author: string;
        get_author(): string;
        description: string;
        get_description(): string;
        friendlyName: string;
        get_friendlyName(): string;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnNorbergDrawer extends lt.Annotations.Designers.AnnRectangleDrawDesigner {
        private _objectTemplate;
        linesCount: number;
        private _annNorbergObject;
        finalTargetObject: lt.Annotations.Core.AnnObject;
        constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annNorbergObject: AnnNorbergObject);
        endWorking(): boolean;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnParallelLinesDrawer extends lt.Annotations.Designers.AnnRectangleDrawDesigner {
        private _objectTemplate;
        linesCount: number;
        private _annParallelLinesObject;
        finalTargetObject: lt.Annotations.Core.AnnObject;
        constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annParallelLinesObject: AnnParallelLinesObject);
        endWorking(): boolean;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnFourParallelLinesDrawer extends AnnParallelLinesDrawer {
        constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annParallelLinesObject: AnnParallelLinesObject);
        linesCount: number;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnTwoLinesDrawer extends lt.Annotations.Designers.AnnDrawDesigner {
        private _end;
        private _clickCount;
        clickCount: number;
        onPointerDown(sender: lt.Annotations.Core.AnnContainer, e: lt.Annotations.Core.AnnPointerEventArgs): boolean;
        onPointerMove(sender: lt.Annotations.Core.AnnContainer, e: lt.Annotations.Core.AnnPointerEventArgs): boolean;
        onPointerUp(sender: lt.Annotations.Core.AnnContainer, e: lt.Annotations.Core.AnnPointerEventArgs): boolean;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnSnapPointDrawer extends AnnTwoLinesDrawer {
        constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annMidlineObject: AnnMidlineObject);
        onPointerUp(sender: lt.Annotations.Core.AnnContainer, e: lt.Annotations.Core.AnnPointerEventArgs): boolean;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnParallelLinesEditor extends lt.Annotations.Designers.AnnEditDesigner {
        constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annParallelLinesObject: AnnParallelLinesObject);
        moveThumb(thumbIndex: number, offset: lt.LeadPointD): void;
        getThumbLocations(): lt.LeadPointD[];
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnTwoLinesEditer extends lt.Annotations.Designers.AnnEditDesigner {
        getThumbLocations(): lt.LeadPointD[];
        moveThumb(thumbIndex: number, offset: lt.LeadPointD): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnSnapPointEditor extends AnnTwoLinesEditer {
        constructor(automationControl: lt.Annotations.Core.IAnnAutomationControl, container: lt.Annotations.Core.AnnContainer, annMidlineObject: AnnMidlineObject);
        getThumbLocations(): lt.LeadPointD[];
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnCobbAngleData {
        private _firstPoint;
        firstPoint: lt.LeadPointD;
        private _secondPoint;
        secondPoint: lt.LeadPointD;
        private _intersectionPoint;
        intersectionPoint: lt.LeadPointD;
        private _angle;
        angle: number;
    }
    class AnnCobbAngleObject extends lt.Annotations.Core.AnnObject {
        constructor();
        create(): lt.Annotations.Core.AnnObject;
        get_friendlyName(): string;
        get_supportsStroke(): boolean;
        get_supportsFill(): boolean;
        private _cobbAngleData;
        cobbAngleData: AnnCobbAngleData;
        private _anglePrecision;
        anglePrecision: number;
        private calculateCobbAngleData();
        private GetLineAngle(point1, point2);
        private Distance(x1, y1, x2, y2);
        private GetPointExtension(point1, angle, distance, factor);
        hitTest(point: lt.LeadPointD, hitTestBuffer: number): boolean;
        serialize(options: lt.Annotations.Core.AnnSerializeOptions, parentNode: Node, document: Document): void;
        deserialize(options: lt.Annotations.Core.AnnDeserializeOptions, element: Node, document: Document): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnIntersectionPointObject extends lt.Annotations.Core.AnnObject {
        constructor();
        create(): lt.Annotations.Core.AnnObject;
        get_friendlyName(): string;
        get_supportsStroke(): boolean;
        get_supportsFill(): boolean;
        private _intersectionInsideContainer;
        intersectionInsideContainer: boolean;
        private _intersectionPoint;
        intersectionPoint: lt.LeadPointD;
        private _intersectionPointRadius;
        intersectionPointRadius: lt.LeadLengthD;
        getBoundingRectangle(): lt.LeadRectD;
        private calculateIntersectionPoint();
        hitTest(point: lt.LeadPointD, hitTestBuffer: number): boolean;
        serialize(options: lt.Annotations.Core.AnnSerializeOptions, parentNode: Node, document: Document): void;
        deserialize(options: lt.Annotations.Core.AnnDeserializeOptions, element: Node, document: Document): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnMidlineObject extends lt.Annotations.Core.AnnObject {
        constructor();
        create(): lt.Annotations.Core.AnnObject;
        get_friendlyName(): string;
        get_supportsStroke(): boolean;
        get_supportsFill(): boolean;
        private _centerPointRadius;
        centerPointRadius: lt.LeadLengthD;
        getBoundingRectangle(): lt.LeadRectD;
        hitTest(point: lt.LeadPointD, hitTestBuffer: number): boolean;
        serialize(options: lt.Annotations.Core.AnnSerializeOptions, parentNode: Node, document: Document): void;
        deserialize(options: lt.Annotations.Core.AnnDeserializeOptions, element: Node, document: Document): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnNorbergObject extends lt.Annotations.Core.AnnProtractorObject {
        constructor();
        create(): lt.Annotations.Core.AnnObject;
        get_friendlyName(): string;
        get_supportsStroke(): boolean;
        get_supportsFill(): boolean;
        get_supportsOpacity(): boolean;
        get_canRotate(): boolean;
        get_ShowGauge(): boolean;
        get_ShowTickMarks(): boolean;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnParallelLinesObject extends lt.Annotations.Core.AnnObject {
        constructor();
        create(): lt.Annotations.Core.AnnObject;
        get_supportsStroke(): boolean;
        get_friendlyName(): string;
        get_supportsFill(): boolean;
        get_canRotate(): boolean;
        hitTest(point: lt.LeadPointD, hitTestBuffer: number): boolean;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnNorbergObjectRenderer extends lt.Annotations.Rendering.AnnProtractorObjectRenderer {
        constructor();
        render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnParallelLinesObjectRenderer extends lt.Annotations.Rendering.AnnObjectRenderer {
        render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnTwoLinesObjectRenderer extends lt.Annotations.Rendering.AnnObjectRenderer {
        render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void;
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnMidlineObjectRenderer extends AnnTwoLinesObjectRenderer {
        render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void;
        private drawLine(context, firstPoint, secondPoint);
        private drawPoint(annObject, context, point, radius);
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnIntersectionObjectRenderer extends AnnTwoLinesObjectRenderer {
        render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void;
        private drawPoint(annObject, context, point, radius);
        private drawLine(context, firstPoint, secondPoint);
    }
}
declare module lt.Annotations.UserMedicalPack {
    class AnnCobbAngleObjectRenderer extends AnnTwoLinesObjectRenderer {
        render(mapper: lt.Annotations.Core.AnnContainerMapper, annObject: lt.Annotations.Core.AnnObject): void;
        private drawLine(context, firstPoint, secondPoint);
        private getAngleText(angle, precision);
    }
}
