﻿var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnMedicalPack = (function () {
                function AnnMedicalPack() {
                    this._thumbSize = 144;
                }
                AnnMedicalPack.prototype.createLocationThumbStyle = function () {
                    var locationThumbStyle = new lt.Annotations.Rendering.AnnRectangleThumbStyle();
                    var thumbSize = this._thumbSize;
                    locationThumbStyle.size = lt.LeadSizeD.create(thumbSize, thumbSize);
                    locationThumbStyle.stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("black"), lt.LeadLengthD.create(1));
                    locationThumbStyle.fill = lt.Annotations.Core.AnnSolidColorBrush.create("lightblue");
                    return locationThumbStyle;
                };
                AnnMedicalPack.prototype.createRotateCenterThumbStyle = function () {
                    var rotateCenterThumbStyle = new lt.Annotations.Rendering.AnnEllipseThumbStyle();
                    var thumbSize = this._thumbSize;
                    rotateCenterThumbStyle.size = lt.LeadSizeD.create(thumbSize / 2.0, thumbSize / 2.0);
                    rotateCenterThumbStyle.stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("black"), lt.LeadLengthD.create(1));
                    rotateCenterThumbStyle.fill = lt.Annotations.Core.AnnSolidColorBrush.create("lightgreen");
                    return rotateCenterThumbStyle;
                };
                AnnMedicalPack.prototype.createRotateGripperThumbStyle = function () {
                    var rotateGripperThumbStyle = new lt.Annotations.Rendering.AnnEllipseThumbStyle();
                    var thumbSize = this._thumbSize;
                    rotateGripperThumbStyle.size = lt.LeadSizeD.create(thumbSize, thumbSize);
                    rotateGripperThumbStyle.stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("black"), lt.LeadLengthD.create(1));
                    rotateGripperThumbStyle.fill = lt.Annotations.Core.AnnSolidColorBrush.create("lightgreen");
                    return rotateGripperThumbStyle;
                };
                AnnMedicalPack.prototype.createParallelLines = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annParallelLinesObject = new lt.Annotations.UserMedicalPack.AnnParallelLinesObject();
                    automationObj.id = annParallelLinesObject.id;
                    automationObj.name = "Two Parallel Lines";
                    automationObj.drawDesignerType = UserMedicalPack.AnnParallelLinesDrawer;
                    automationObj.editDesignerType = UserMedicalPack.AnnParallelLinesEditor;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annParallelLinesObject;
                    var renderer = new UserMedicalPack.AnnParallelLinesObjectRenderer();
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    automationObj.renderer = renderer;
                    return automationObj;
                };
                AnnMedicalPack.prototype.createFourParallelLines = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annParallelLinesObject = new lt.Annotations.UserMedicalPack.AnnParallelLinesObject();
                    annParallelLinesObject.setId(annParallelLinesObject.id - 1);
                    automationObj.id = annParallelLinesObject.id;
                    automationObj.name = "Four Parallel Lines";
                    automationObj.drawDesignerType = UserMedicalPack.AnnFourParallelLinesDrawer;
                    automationObj.editDesignerType = UserMedicalPack.AnnParallelLinesEditor;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annParallelLinesObject;
                    var renderer = new UserMedicalPack.AnnParallelLinesObjectRenderer();
                    automationObj.renderer = renderer;
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    return automationObj;
                };
                AnnMedicalPack.prototype.createMidline = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annMidlineObject = new lt.Annotations.UserMedicalPack.AnnMidlineObject();
                    automationObj.id = annMidlineObject.id;
                    automationObj.name = "MidLine";
                    automationObj.drawDesignerType = UserMedicalPack.AnnTwoLinesDrawer;
                    automationObj.editDesignerType = UserMedicalPack.AnnTwoLinesEditer;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annMidlineObject;
                    var renderer = new UserMedicalPack.AnnMidlineObjectRenderer();
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    renderer.rotateCenterThumbStyle = this.createRotateCenterThumbStyle();
                    renderer.rotateGripperThumbStyle = this.createRotateGripperThumbStyle();
                    automationObj.renderer = renderer;
                    return automationObj;
                };
                AnnMedicalPack.prototype.createSnapPoint = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annMidlineObject = new lt.Annotations.UserMedicalPack.AnnMidlineObject();
                    annMidlineObject.setId(annMidlineObject.id - 1);
                    automationObj.id = annMidlineObject.id;
                    automationObj.name = "SnapPoint";
                    automationObj.drawDesignerType = UserMedicalPack.AnnSnapPointDrawer;
                    automationObj.editDesignerType = UserMedicalPack.AnnSnapPointEditor;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annMidlineObject;
                    var renderer = new UserMedicalPack.AnnMidlineObjectRenderer();
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    automationObj.renderer = renderer;
                    return automationObj;
                };
                AnnMedicalPack.prototype.createIntersectionPoint = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annIntersectionPointObject = new lt.Annotations.UserMedicalPack.AnnIntersectionPointObject();
                    automationObj.id = annIntersectionPointObject.id;
                    automationObj.name = "Intersection Point";
                    automationObj.drawDesignerType = UserMedicalPack.AnnTwoLinesDrawer;
                    automationObj.editDesignerType = UserMedicalPack.AnnTwoLinesEditer;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annIntersectionPointObject;
                    var renderer = new UserMedicalPack.AnnIntersectionObjectRenderer();
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    renderer.rotateCenterThumbStyle = this.createRotateCenterThumbStyle();
                    renderer.rotateGripperThumbStyle = this.createRotateGripperThumbStyle();
                    automationObj.renderer = renderer;
                    return automationObj;
                };
                AnnMedicalPack.prototype.createCobbAngle = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annCobbAngleObject = new lt.Annotations.UserMedicalPack.AnnCobbAngleObject();
                    automationObj.id = annCobbAngleObject.id;
                    automationObj.name = "CobbAngle";
                    automationObj.drawDesignerType = UserMedicalPack.AnnTwoLinesDrawer;
                    automationObj.editDesignerType = UserMedicalPack.AnnTwoLinesEditer;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annCobbAngleObject;
                    var renderer = new UserMedicalPack.AnnCobbAngleObjectRenderer();
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    renderer.rotateCenterThumbStyle = this.createRotateCenterThumbStyle();
                    renderer.rotateGripperThumbStyle = this.createRotateGripperThumbStyle();
                    automationObj.renderer = renderer;
                    return automationObj;
                };
                AnnMedicalPack.prototype.createNorberg = function () {
                    var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                    var annNorbergObject = new lt.Annotations.UserMedicalPack.AnnNorbergObject();
                    automationObj.id = annNorbergObject.id;
                    automationObj.name = "Norberg";
                    automationObj.drawDesignerType = UserMedicalPack.AnnNorbergDrawer;
                    automationObj.editDesignerType = lt.Annotations.Designers.AnnPolylineEditDesigner;
                    automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                    automationObj.objectTemplate = annNorbergObject;
                    var renderer = new UserMedicalPack.AnnNorbergObjectRenderer();
                    renderer.locationsThumbStyle = this.createLocationThumbStyle();
                    renderer.rotateCenterThumbStyle = this.createRotateCenterThumbStyle();
                    renderer.rotateGripperThumbStyle = this.createRotateGripperThumbStyle();
                    automationObj.renderer = renderer;
                    return automationObj;
                };
                AnnMedicalPack.prototype.getAutomationObjects = function () {
                    var objects = [this.createParallelLines(), this.createFourParallelLines(), this.createMidline(),
                        this.createSnapPoint(), this.createIntersectionPoint(), this.createCobbAngle(), this.createNorberg()];
                    return objects;
                };
                Object.defineProperty(AnnMedicalPack.prototype, "author", {
                    get: function () {
                        return "Lead Technologies,Inc.";
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnMedicalPack.prototype.get_author = function () {
                    return this.author;
                };
                Object.defineProperty(AnnMedicalPack.prototype, "description", {
                    get: function () {
                        return "Medical Package";
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnMedicalPack.prototype.get_description = function () {
                    return this.description;
                };
                Object.defineProperty(AnnMedicalPack.prototype, "friendlyName", {
                    get: function () {
                        return "Medical Package";
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnMedicalPack.prototype.get_friendlyName = function () {
                    return this.friendlyName;
                };
                return AnnMedicalPack;
            })();
            UserMedicalPack.AnnMedicalPack = AnnMedicalPack;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnNorbergDrawer = (function (_super) {
                __extends(AnnNorbergDrawer, _super);
                function AnnNorbergDrawer(automationControl, container, annNorbergObject) {
                    _super.call(this, automationControl, container, new lt.Annotations.Core.AnnRectangleObject());
                    this._objectTemplate = new lt.Annotations.Core.AnnRectangleObject();
                    this._annNorbergObject = null;
                    this._annNorbergObject = annNorbergObject;
                    this._objectTemplate = this.targetObject;
                    this._objectTemplate.stroke.stroke = lt.Annotations.Core.AnnSolidColorBrush.create("black");
                }
                Object.defineProperty(AnnNorbergDrawer.prototype, "linesCount", {
                    get: function () {
                        return 2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnNorbergDrawer.prototype, "finalTargetObject", {
                    get: function () {
                        return this._annNorbergObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnNorbergDrawer.prototype.endWorking = function () {
                    var points = this._objectTemplate.points.toArray();
                    if (points != null && points.length > 0) {
                        this._annNorbergObject.points.clear();
                        this._annNorbergObject.points.add(points[0]);
                        this._annNorbergObject.points.add(points[3]);
                        this._annNorbergObject.points.add(points[2]);
                        this._annNorbergObject.points.add(points[1]);
                    }
                    this.container.children.remove(this._objectTemplate);
                    this.targetObject = this._annNorbergObject;
                    this.container.children.add(this._annNorbergObject);
                    return _super.prototype.endWorking.call(this);
                };
                return AnnNorbergDrawer;
            })(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            UserMedicalPack.AnnNorbergDrawer = AnnNorbergDrawer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnParallelLinesDrawer = (function (_super) {
                __extends(AnnParallelLinesDrawer, _super);
                function AnnParallelLinesDrawer(automationControl, container, annParallelLinesObject) {
                    _super.call(this, automationControl, container, new lt.Annotations.Core.AnnRectangleObject());
                    this._objectTemplate = new lt.Annotations.Core.AnnRectangleObject();
                    this._annParallelLinesObject = null;
                    this._annParallelLinesObject = annParallelLinesObject;
                    this._objectTemplate = this.targetObject;
                    this._objectTemplate.stroke.stroke = lt.Annotations.Core.AnnSolidColorBrush.create("Blue");
                }
                Object.defineProperty(AnnParallelLinesDrawer.prototype, "linesCount", {
                    get: function () {
                        return 2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnParallelLinesDrawer.prototype, "finalTargetObject", {
                    get: function () {
                        return this._annParallelLinesObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnParallelLinesDrawer.prototype.endWorking = function () {
                    var points = this._objectTemplate.points.toArray();
                    if (points != null && points.length > 0) {
                        this._annParallelLinesObject.points.add(points[0]);
                        this._annParallelLinesObject.points.add(points[1]);
                        var lineCount = this.linesCount - 2;
                        if (this.linesCount > 0) {
                            var x = (lineCount + 1);
                            var height = this._objectTemplate.rect.height / x;
                            var start = points[0];
                            var end = points[1];
                            for (var i = 0; i < lineCount; ++i) {
                                start = lt.LeadPointD.create(start.x, start.y + height);
                                end = lt.LeadPointD.create(end.x, end.y + height);
                                this._annParallelLinesObject.points.add(start);
                                this._annParallelLinesObject.points.add(end);
                            }
                        }
                        this._annParallelLinesObject.points.add(points[2]);
                        this._annParallelLinesObject.points.add(points[3]);
                    }
                    this.container.children.remove(this._objectTemplate);
                    this.targetObject = this._annParallelLinesObject;
                    this.container.children.add(this._annParallelLinesObject);
                    return _super.prototype.endWorking.call(this);
                };
                return AnnParallelLinesDrawer;
            })(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            UserMedicalPack.AnnParallelLinesDrawer = AnnParallelLinesDrawer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnFourParallelLinesDrawer = (function (_super) {
                __extends(AnnFourParallelLinesDrawer, _super);
                function AnnFourParallelLinesDrawer(automationControl, container, annParallelLinesObject) {
                    _super.call(this, automationControl, container, annParallelLinesObject);
                }
                Object.defineProperty(AnnFourParallelLinesDrawer.prototype, "linesCount", {
                    get: function () {
                        return 4;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnFourParallelLinesDrawer;
            })(UserMedicalPack.AnnParallelLinesDrawer);
            UserMedicalPack.AnnFourParallelLinesDrawer = AnnFourParallelLinesDrawer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnTwoLinesDrawer = (function (_super) {
                __extends(AnnTwoLinesDrawer, _super);
                function AnnTwoLinesDrawer() {
                    _super.apply(this, arguments);
                    this._end = lt.LeadPointD.empty;
                    this._clickCount = 0;
                }
                Object.defineProperty(AnnTwoLinesDrawer.prototype, "clickCount", {
                    get: function () {
                        return this._clickCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnTwoLinesDrawer.prototype.onPointerDown = function (sender, e) {
                    var handled = _super.prototype.onPointerDown.call(this, sender, e);
                    if (e.button != lt.Annotations.Core.AnnMouseButton.left)
                        return handled;
                    this._clickCount++;
                    if (e.button == lt.Annotations.Core.AnnMouseButton.left) {
                        var _begin = this.clipPoint(e.location, this.clipRectangle);
                        this._end = _begin;
                        if (this._clickCount == 1) {
                            this.targetObject.points.add(_begin);
                            this.targetObject.points.add(this._end);
                        }
                        else if (this._clickCount % 2 != 0) {
                            this.targetObject.points.add(_begin);
                            this.targetObject.points.add(this._end);
                        }
                        this.startWorking();
                        handled = true;
                    }
                    return handled;
                };
                AnnTwoLinesDrawer.prototype.onPointerMove = function (sender, e) {
                    var handled = false;
                    if (this.targetObject != null && this.hasStarted) {
                        var pt = this.clipPoint(e.location, this.clipRectangle);
                        if (!lt.LeadPointD.equals(pt, this._end)) {
                            this._end = pt;
                            if (this.targetObject.points.count > 1) {
                                if (this._clickCount % 2 != 0) {
                                    this.targetObject.points.set_item(this.targetObject.points.count - 1, pt);
                                }
                            }
                            if (this.targetObject instanceof UserMedicalPack.AnnIntersectionPointObject) {
                                var intersectionPointObject = this.targetObject;
                                intersectionPointObject.intersectionInsideContainer = this.clipRectangle.containsPoint(intersectionPointObject.intersectionPoint);
                            }
                            this.working();
                        }
                        handled = true;
                    }
                    return handled;
                };
                AnnTwoLinesDrawer.prototype.onPointerUp = function (sender, e) {
                    if (this._clickCount > 3) {
                        this.targetObject.points.add(this._end);
                        this.endWorking();
                    }
                    return true;
                };
                return AnnTwoLinesDrawer;
            })(lt.Annotations.Designers.AnnDrawDesigner);
            UserMedicalPack.AnnTwoLinesDrawer = AnnTwoLinesDrawer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnSnapPointDrawer = (function (_super) {
                __extends(AnnSnapPointDrawer, _super);
                function AnnSnapPointDrawer(automationControl, container, annMidlineObject) {
                    _super.call(this, automationControl, container, annMidlineObject);
                }
                AnnSnapPointDrawer.prototype.onPointerUp = function (sender, e) {
                    if (this.clickCount > 1) {
                        this.endWorking();
                    }
                    return true;
                };
                return AnnSnapPointDrawer;
            })(UserMedicalPack.AnnTwoLinesDrawer);
            UserMedicalPack.AnnSnapPointDrawer = AnnSnapPointDrawer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnParallelLinesEditor = (function (_super) {
                __extends(AnnParallelLinesEditor, _super);
                function AnnParallelLinesEditor(automationControl, container, annParallelLinesObject) {
                    _super.call(this, automationControl, container, annParallelLinesObject);
                }
                AnnParallelLinesEditor.prototype.moveThumb = function (thumbIndex, offset) {
                    var thumbsCount = this.getThumbLocations().length;
                    var targetPointsCount = this.targetObject.points.count;
                    var before = Math.max(0, (thumbIndex - 1));
                    var after = Math.min(thumbIndex + 1, thumbsCount - 1);
                    var offsetY = offset.y;
                    var beforePoint = this.targetObject.points.get_item(before * 2);
                    var current = this.targetObject.points.get_item(thumbIndex * 2);
                    var updated = lt.Annotations.Core.AnnTransformer.translatePoint(this.targetObject.points.get_item(thumbIndex * 2), 0, offsetY);
                    var afterPoint = this.targetObject.points.get_item(after * 2);
                    var x = lt.LeadPointD.equals(current, beforePoint) ? true : (updated.y > (beforePoint.y + 50));
                    var y = lt.LeadPointD.equals(current, afterPoint) ? true : updated.y < (afterPoint.y - 50);
                    if (x && y) {
                        this.targetObject.points.set_item(thumbIndex * 2, updated);
                        this.targetObject.points.set_item(thumbIndex * 2 + 1, lt.Annotations.Core.AnnTransformer.translatePoint(this.targetObject.points.get_item(thumbIndex * 2 + 1), 0, offsetY));
                    }
                };
                AnnParallelLinesEditor.prototype.getThumbLocations = function () {
                    var locations = null;
                    var points = this.targetObject.points.toArray();
                    var pointsCount = points.length / 2;
                    var pts = [];
                    for (var i = 0; i < pointsCount; ++i) {
                        var index = i * 2;
                        var start = points[index];
                        var end = points[index + 1];
                        pts[i] = lt.LeadPointD.create((start.x + end.x) / 2, (start.y + end.y) / 2);
                    }
                    locations = pts;
                    return locations;
                };
                return AnnParallelLinesEditor;
            })(lt.Annotations.Designers.AnnEditDesigner);
            UserMedicalPack.AnnParallelLinesEditor = AnnParallelLinesEditor;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnTwoLinesEditer = (function (_super) {
                __extends(AnnTwoLinesEditer, _super);
                function AnnTwoLinesEditer() {
                    _super.apply(this, arguments);
                }
                AnnTwoLinesEditer.prototype.getThumbLocations = function () {
                    var pointsCollection = this.targetObject.points;
                    if (pointsCollection.count == 2)
                        return pointsCollection.toArray();
                    else {
                        return [pointsCollection.get_item(0), pointsCollection.get_item(1), pointsCollection.get_item(2), pointsCollection.get_item(3)];
                    }
                };
                AnnTwoLinesEditer.prototype.moveThumb = function (thumbIndex, offset) {
                    var targetObject = this.targetObject;
                    var point = targetObject.points.get_item(thumbIndex);
                    targetObject.points.set_item(thumbIndex, this.clipPoint(lt.Annotations.Core.AnnTransformer.translatePoint(point, offset.x, offset.y), this.clipRectangle));
                    if (UserMedicalPack.AnnIntersectionPointObject.isInstanceOfType(this.targetObject)) {
                        var intersectionPointObject = this.targetObject;
                        intersectionPointObject.intersectionInsideContainer = this.clipRectangle.containsPoint(intersectionPointObject.intersectionPoint);
                    }
                    _super.prototype.moveThumb.call(this, thumbIndex, offset);
                };
                return AnnTwoLinesEditer;
            })(lt.Annotations.Designers.AnnEditDesigner);
            UserMedicalPack.AnnTwoLinesEditer = AnnTwoLinesEditer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnSnapPointEditor = (function (_super) {
                __extends(AnnSnapPointEditor, _super);
                function AnnSnapPointEditor(automationControl, container, annMidlineObject) {
                    _super.call(this, automationControl, container, annMidlineObject);
                }
                AnnSnapPointEditor.prototype.getThumbLocations = function () {
                    var pointsCollection = this.targetObject.points;
                    var points = [pointsCollection.get_item(0), pointsCollection.get_item(1)];
                    return points;
                };
                return AnnSnapPointEditor;
            })(UserMedicalPack.AnnTwoLinesEditer);
            UserMedicalPack.AnnSnapPointEditor = AnnSnapPointEditor;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnCobbAngleData = (function () {
                function AnnCobbAngleData() {
                    this._firstPoint = null;
                    this._secondPoint = null;
                    this._intersectionPoint = null;
                    this._angle = null;
                }
                Object.defineProperty(AnnCobbAngleData.prototype, "firstPoint", {
                    get: function () {
                        return this._firstPoint;
                    },
                    set: function (value) {
                        this._firstPoint = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnCobbAngleData.prototype, "secondPoint", {
                    get: function () {
                        return this._secondPoint;
                    },
                    set: function (value) {
                        this._secondPoint = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnCobbAngleData.prototype, "intersectionPoint", {
                    get: function () {
                        return this._intersectionPoint;
                    },
                    set: function (value) {
                        this._intersectionPoint = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnCobbAngleData.prototype, "angle", {
                    get: function () {
                        return this._angle;
                    },
                    set: function (value) {
                        this._angle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnCobbAngleData;
            })();
            UserMedicalPack.AnnCobbAngleData = AnnCobbAngleData;
            var AnnCobbAngleObject = (function (_super) {
                __extends(AnnCobbAngleObject, _super);
                function AnnCobbAngleObject() {
                    _super.call(this);
                    this._cobbAngleData = new AnnCobbAngleData();
                    this._anglePrecision = 2;
                    _super.prototype.setId.call(this, -1007);
                    this.labels["CobbAngle"] = new lt.Annotations.Core.AnnLabel();
                    lt.Annotations.UserMedicalPack.AnnCobbAngleObject.registerClass('lt.Annotations.UserMedicalPack.AnnCobbAngleObject', lt.Annotations.Core.AnnObject);
                }
                AnnCobbAngleObject.prototype.create = function () {
                    return new lt.Annotations.UserMedicalPack.AnnCobbAngleObject();
                };
                AnnCobbAngleObject.prototype.get_friendlyName = function () {
                    return "CobbAngle";
                };
                AnnCobbAngleObject.prototype.get_supportsStroke = function () {
                    return true;
                };
                AnnCobbAngleObject.prototype.get_supportsFill = function () {
                    return false;
                };
                Object.defineProperty(AnnCobbAngleObject.prototype, "cobbAngleData", {
                    get: function () {
                        this.calculateCobbAngleData();
                        return this._cobbAngleData;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnCobbAngleObject.prototype, "anglePrecision", {
                    get: function () {
                        return this._anglePrecision;
                    },
                    set: function (value) {
                        if (this._anglePrecision >= 0)
                            this._anglePrecision = value;
                        else
                            lt.Annotations.Core.ExceptionHelper.invalidOperationException("AnglePrecision should be greater than or equal 0");
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnCobbAngleObject.prototype.calculateCobbAngleData = function () {
                    if (this.points.count < 4)
                        return;
                    var points = this.points.toArray();
                    var startPoint1 = points[0].clone();
                    var endPoint1 = points[1].clone();
                    var startPoint2 = points[2].clone();
                    var endPoint2 = points[3].clone();
                    var angle1 = this.GetLineAngle(startPoint1, endPoint1);
                    var angle2 = this.GetLineAngle(startPoint2, endPoint2);
                    var point1;
                    var point2;
                    var intersectionPoint;
                    var distanceSS = this.Distance(startPoint1.x, startPoint1.y, startPoint2.x, startPoint2.y);
                    var distanceSE = this.Distance(startPoint1.x, startPoint1.y, endPoint2.x, endPoint2.y);
                    var distanceES = this.Distance(endPoint1.x, endPoint1.y, startPoint2.x, startPoint2.y);
                    var distanceEE = this.Distance(endPoint1.x, endPoint1.y, endPoint2.x, endPoint2.y);
                    var IsSS = false;
                    var minimumIndex = 0;
                    if (distanceSS < distanceSE) {
                        IsSS = true;
                    }
                    if (distanceES < distanceEE) {
                        if (IsSS) {
                            if (distanceSS < distanceES)
                                minimumIndex = 0;
                            else
                                minimumIndex = 2;
                        }
                        else {
                            if (distanceSE < distanceES)
                                minimumIndex = 1;
                            else
                                minimumIndex = 2;
                        }
                    }
                    else {
                        if (IsSS) {
                            if (distanceSS < distanceEE)
                                minimumIndex = 0;
                            else
                                minimumIndex = 3;
                        }
                        else {
                            if (distanceSE < distanceEE)
                                minimumIndex = 1;
                            else
                                minimumIndex = 3;
                        }
                    }
                    var factor1 = 1;
                    switch (minimumIndex) {
                        case 0:
                            {
                                factor1 = -1;
                                point1 = startPoint1;
                                point2 = startPoint2;
                            }
                            break;
                        case 1:
                            {
                                factor1 = -1;
                                point1 = startPoint1;
                                point2 = endPoint2;
                            }
                            break;
                        case 2:
                            {
                                point1 = endPoint1;
                                point2 = startPoint2;
                            }
                            break;
                        default:
                        case 3:
                            {
                                point1 = endPoint1;
                                point2 = endPoint2;
                            }
                            break;
                    }
                    var distance = 40;
                    intersectionPoint = this.GetPointExtension(point1, angle1, distance, factor1);
                    if (angle1 < 0)
                        angle1 += Math.PI;
                    if (angle2 < 0)
                        angle2 += Math.PI;
                    var resultAngle = ((angle1 - angle2) * 180 / Math.PI);
                    if (resultAngle < 0)
                        resultAngle += 180;
                    if (resultAngle > 90)
                        resultAngle = 180 - resultAngle;
                    this._cobbAngleData.firstPoint = point1;
                    this._cobbAngleData.secondPoint = point2;
                    this._cobbAngleData.intersectionPoint = intersectionPoint;
                    this._cobbAngleData.angle = resultAngle;
                };
                AnnCobbAngleObject.prototype.GetLineAngle = function (point1, point2) {
                    var value = Math.atan2((point2.y - point1.y), (point2.x - point1.x));
                    return value;
                };
                AnnCobbAngleObject.prototype.Distance = function (x1, y1, x2, y2) {
                    var dX = (x1 - x2);
                    var dY = (y1 - y2);
                    return Math.sqrt(dX * dX + dY * dY);
                };
                AnnCobbAngleObject.prototype.GetPointExtension = function (point1, angle, distance, factor) {
                    var dXRatio = factor * distance * Math.cos(angle);
                    var dYRatio = factor * distance * Math.sin(angle);
                    var resultPoint = lt.LeadPointD.create((point1.x + dXRatio), (point1.y + dYRatio));
                    return resultPoint;
                };
                AnnCobbAngleObject.prototype.hitTest = function (point, hitTestBuffer) {
                    var hit = _super.prototype.hitTest.call(this, point, hitTestBuffer);
                    if (hit) {
                        var line = new lt.Annotations.Core.AnnPolylineObject();
                        hit = false;
                        var pointsCount = parseInt((this.points.count / 2).toString());
                        for (var i = 0; i < pointsCount && !hit; ++i) {
                            line.points.add(this.points.get_item(2 * i));
                            line.points.add(this.points.get_item(2 * i + 1));
                            if (line.hitTest(point, hitTestBuffer))
                                hit = true;
                        }
                    }
                    return hit;
                };
                AnnCobbAngleObject.prototype.serialize = function (options, parentNode, document) {
                    _super.prototype.serialize.call(this, options, parentNode, document);
                    var value = this._anglePrecision.toString();
                    var element = document.createElement("AnglePrecision");
                    var data = value == null ? "" : value;
                    var node = document.createTextNode(data);
                    element.appendChild(node);
                    parentNode.appendChild(element);
                };
                AnnCobbAngleObject.prototype.deserialize = function (options, element, document) {
                    _super.prototype.deserialize.call(this, options, element, document);
                    var data = "";
                    var xmlElement = element;
                    var nodeList = xmlElement.getElementsByTagName("AnglePrecision");
                    for (var i = 0; i < nodeList.length; i++) {
                        var childNode = nodeList[i];
                        if (childNode != null && (childNode.parentNode == element)) {
                            data = childNode.firstChild.nodeValue.trim();
                            break;
                        }
                    }
                    this._anglePrecision = parseFloat(data);
                };
                return AnnCobbAngleObject;
            })(lt.Annotations.Core.AnnObject);
            UserMedicalPack.AnnCobbAngleObject = AnnCobbAngleObject;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnIntersectionPointObject = (function (_super) {
                __extends(AnnIntersectionPointObject, _super);
                function AnnIntersectionPointObject() {
                    _super.call(this);
                    this._intersectionInsideContainer = false;
                    this._intersectionPoint = lt.LeadPointD.empty;
                    this._intersectionPointRadius = lt.LeadLengthD.create(30);
                    _super.prototype.setId.call(this, -1006);
                    lt.Annotations.UserMedicalPack.AnnIntersectionPointObject.registerClass('lt.Annotations.UserMedicalPack.AnnIntersectionPointObject', lt.Annotations.Core.AnnObject);
                }
                AnnIntersectionPointObject.prototype.create = function () {
                    return new lt.Annotations.UserMedicalPack.AnnIntersectionPointObject();
                };
                AnnIntersectionPointObject.prototype.get_friendlyName = function () {
                    return "Intersection Point";
                };
                AnnIntersectionPointObject.prototype.get_supportsStroke = function () {
                    return true;
                };
                AnnIntersectionPointObject.prototype.get_supportsFill = function () {
                    return false;
                };
                Object.defineProperty(AnnIntersectionPointObject.prototype, "intersectionInsideContainer", {
                    get: function () {
                        return this._intersectionInsideContainer;
                    },
                    set: function (value) {
                        this._intersectionInsideContainer = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnIntersectionPointObject.prototype, "intersectionPoint", {
                    get: function () {
                        this.calculateIntersectionPoint();
                        return this._intersectionPoint;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnIntersectionPointObject.prototype, "intersectionPointRadius", {
                    get: function () {
                        return this._intersectionPointRadius;
                    },
                    set: function (value) {
                        if (this._intersectionPointRadius.get_value() >= 0)
                            this._intersectionPointRadius = value;
                        else
                            lt.Annotations.Core.ExceptionHelper.invalidOperationException("IntersectionPointRadius should be greater than or equal 0");
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnIntersectionPointObject.prototype.getBoundingRectangle = function () {
                    var rc = _super.prototype.getBoundingRectangle.call(this);
                    var radius = this._intersectionPointRadius.value;
                    if (!(isFinite(radius) || (isFinite(radius)))) {
                        if (!this._intersectionPoint.isEmpty && this._intersectionInsideContainer) {
                            var intersectionBounds = lt.LeadRectD.create(this._intersectionPoint.x - radius, this._intersectionPoint.y - radius, radius * 2, radius * 2);
                            rc = lt.LeadRectD.unionRects(rc, intersectionBounds);
                        }
                    }
                    return rc;
                };
                AnnIntersectionPointObject.prototype.calculateIntersectionPoint = function () {
                    var firstLineLength, cos, sin, newX, firstLinePosition;
                    if (this.points.count < 4) {
                        this._intersectionPoint = lt.LeadPointD.empty;
                        return;
                    }
                    var Line1FirstPoint = this.points.get_item(0).clone();
                    var Line1SecondPoint = this.points.get_item(1).clone();
                    var Line2FirstPoint = this.points.get_item(2).clone();
                    var Line2SecondPoint = this.points.get_item(3).clone();
                    if (lt.LeadPointD.equals(Line2FirstPoint, Line2SecondPoint)) {
                        this._intersectionPoint = lt.LeadPointD.empty;
                        return;
                    }
                    Line1SecondPoint.x -= Line1FirstPoint.x;
                    Line1SecondPoint.y -= Line1FirstPoint.y;
                    Line2FirstPoint.x -= Line1FirstPoint.x;
                    Line2FirstPoint.y -= Line1FirstPoint.y;
                    Line2SecondPoint.x -= Line1FirstPoint.x;
                    Line2SecondPoint.y -= Line1FirstPoint.y;
                    firstLineLength = Math.sqrt(Line1SecondPoint.x * Line1SecondPoint.x + Line1SecondPoint.y * Line1SecondPoint.y);
                    cos = Line1SecondPoint.x / firstLineLength;
                    sin = Line1SecondPoint.y / firstLineLength;
                    newX = Line2FirstPoint.x * cos + Line2FirstPoint.y * sin;
                    Line2FirstPoint.y = Line2FirstPoint.y * cos - Line2FirstPoint.x * sin;
                    Line2FirstPoint.x = newX;
                    newX = Line2SecondPoint.x * cos + Line2SecondPoint.y * sin;
                    Line2SecondPoint.y = Line2SecondPoint.y * cos - Line2SecondPoint.x * sin;
                    Line2SecondPoint.x = newX;
                    if (Line2FirstPoint.y == Line2SecondPoint.y) {
                        this._intersectionPoint = lt.LeadPointD.empty;
                        return;
                    }
                    firstLinePosition = Line2SecondPoint.x + (Line2FirstPoint.x - Line2SecondPoint.x) * Line2SecondPoint.y / (Line2SecondPoint.y - Line2FirstPoint.y);
                    this._intersectionPoint = lt.LeadPointD.create(Line1FirstPoint.x + firstLinePosition * cos, Line1FirstPoint.y + firstLinePosition * sin);
                };
                AnnIntersectionPointObject.prototype.hitTest = function (point, hitTestBuffer) {
                    var hit = _super.prototype.hitTest.call(this, point, hitTestBuffer);
                    if (hit) {
                        var line = new lt.Annotations.Core.AnnPolylineObject();
                        hit = false;
                        var pointsCount = Math.floor(this.points.count / 2);
                        for (var i = 0; i < pointsCount && !hit; ++i) {
                            line.points.add(this.points.get_item(2 * i));
                            line.points.add(this.points.get_item(2 * i + 1));
                            if (line.hitTest(point, hitTestBuffer))
                                hit = true;
                        }
                    }
                    return hit;
                };
                AnnIntersectionPointObject.prototype.serialize = function (options, parentNode, document) {
                    _super.prototype.serialize.call(this, options, parentNode, document);
                    var value = this._intersectionPointRadius.get_value().toString();
                    var element = document.createElement("IntersectionPointRadius");
                    var data = value == null ? "" : value;
                    var node = document.createTextNode(data);
                    element.appendChild(node);
                    parentNode.appendChild(element);
                };
                AnnIntersectionPointObject.prototype.deserialize = function (options, element, document) {
                    _super.prototype.deserialize.call(this, options, element, document);
                    var data = "";
                    var xmlElement = element;
                    var nodeList = xmlElement.getElementsByTagName("IntersectionPointRadius");
                    for (var i = 0; i < nodeList.length; i++) {
                        var childNode = nodeList[i];
                        if (childNode != null && (childNode.parentNode == element)) {
                            data = childNode.firstChild.nodeValue.trim();
                            break;
                        }
                    }
                    this._intersectionPointRadius = lt.LeadLengthD.create(parseFloat(data));
                };
                return AnnIntersectionPointObject;
            })(lt.Annotations.Core.AnnObject);
            UserMedicalPack.AnnIntersectionPointObject = AnnIntersectionPointObject;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnMidlineObject = (function (_super) {
                __extends(AnnMidlineObject, _super);
                function AnnMidlineObject() {
                    _super.call(this);
                    this._centerPointRadius = lt.LeadLengthD.create(30);
                    _super.prototype.setId.call(this, -1004);
                    lt.Annotations.UserMedicalPack.AnnMidlineObject.registerClass('lt.Annotations.UserMedicalPack.AnnMidlineObject', lt.Annotations.Core.AnnObject);
                }
                AnnMidlineObject.prototype.create = function () {
                    return new lt.Annotations.UserMedicalPack.AnnMidlineObject();
                };
                AnnMidlineObject.prototype.get_friendlyName = function () {
                    return "Midline";
                };
                AnnMidlineObject.prototype.get_supportsStroke = function () {
                    return true;
                };
                AnnMidlineObject.prototype.get_supportsFill = function () {
                    return false;
                };
                Object.defineProperty(AnnMidlineObject.prototype, "centerPointRadius", {
                    get: function () {
                        return this._centerPointRadius;
                    },
                    set: function (value) {
                        if (this._centerPointRadius.get_value() >= 0)
                            this._centerPointRadius = value;
                        else
                            lt.Annotations.Core.ExceptionHelper.invalidOperationException("CenterPointRadius should be greater than or equal 0");
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnMidlineObject.prototype.getBoundingRectangle = function () {
                    var rc = _super.prototype.getBoundingRectangle.call(this);
                    var radius = this._centerPointRadius.get_value();
                    rc = lt.LeadRectD.inflateRect(rc, radius, radius);
                    return rc;
                };
                AnnMidlineObject.prototype.hitTest = function (point, hitTestBuffer) {
                    var hit = _super.prototype.hitTest.call(this, point, hitTestBuffer);
                    if (hit) {
                        var line = new lt.Annotations.Core.AnnPolylineObject();
                        hit = false;
                        var pointsCount = parseInt((this.points.count / 2).toString());
                        for (var i = 0; i < pointsCount && !hit; ++i) {
                            line.points.add(this.points.get_item(2 * i));
                            line.points.add(this.points.get_item(2 * i + 1));
                            if (line.hitTest(point, hitTestBuffer))
                                hit = true;
                        }
                    }
                    return hit;
                };
                AnnMidlineObject.prototype.serialize = function (options, parentNode, document) {
                    _super.prototype.serialize.call(this, options, parentNode, document);
                    var value = this._centerPointRadius.get_value().toString();
                    var element = document.createElement("CenterPointRadius");
                    var data = value == null ? "" : value;
                    var node = document.createTextNode(data);
                    element.appendChild(node);
                    parentNode.appendChild(element);
                };
                AnnMidlineObject.prototype.deserialize = function (options, element, document) {
                    _super.prototype.deserialize.call(this, options, element, document);
                    var data = "";
                    var xmlElement = element;
                    var nodeList = xmlElement.getElementsByTagName("CenterPointRadius");
                    for (var i = 0; i < nodeList.length; i++) {
                        var childNode = nodeList[i];
                        if (childNode != null && (childNode.parentNode == element)) {
                            data = childNode.firstChild.nodeValue.trim();
                            break;
                        }
                    }
                    this._centerPointRadius = lt.LeadLengthD.create(parseFloat(data));
                };
                return AnnMidlineObject;
            })(lt.Annotations.Core.AnnObject);
            UserMedicalPack.AnnMidlineObject = AnnMidlineObject;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnNorbergObject = (function (_super) {
                __extends(AnnNorbergObject, _super);
                function AnnNorbergObject() {
                    _super.call(this);
                    _super.prototype.setId.call(this, -1008);
                    this.labels["FirstAngle"] = new lt.Annotations.Core.AnnLabel();
                    this.labels["SecondAngle"] = new lt.Annotations.Core.AnnLabel();
                    this.labels["AngleText"].background = lt.Annotations.Core.AnnSolidColorBrush.create("white");
                    this.labels["AngleText"].foreground = lt.Annotations.Core.AnnSolidColorBrush.create("blue");
                    this.showTickMarks = false;
                    this.labels["FirstRulerLength"].isVisible = false;
                    this.labels["SecondRulerLength"].isVisible = false;
                    lt.Annotations.UserMedicalPack.AnnNorbergObject.registerClass('lt.Annotations.UserMedicalPack.AnnNorbergObject', lt.Annotations.Core.AnnProtractorObject);
                }
                AnnNorbergObject.prototype.create = function () {
                    return new lt.Annotations.UserMedicalPack.AnnNorbergObject();
                };
                AnnNorbergObject.prototype.get_friendlyName = function () {
                    return "Norberg";
                };
                AnnNorbergObject.prototype.get_supportsStroke = function () {
                    return true;
                };
                AnnNorbergObject.prototype.get_supportsFill = function () {
                    return false;
                };
                AnnNorbergObject.prototype.get_supportsOpacity = function () {
                    return false;
                };
                AnnNorbergObject.prototype.get_canRotate = function () {
                    return false;
                };
                AnnNorbergObject.prototype.get_ShowGauge = function () {
                    return false;
                };
                AnnNorbergObject.prototype.get_ShowTickMarks = function () {
                    return false;
                };
                return AnnNorbergObject;
            })(lt.Annotations.Core.AnnProtractorObject);
            UserMedicalPack.AnnNorbergObject = AnnNorbergObject;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnParallelLinesObject = (function (_super) {
                __extends(AnnParallelLinesObject, _super);
                function AnnParallelLinesObject() {
                    _super.call(this);
                    _super.prototype.setId.call(this, -1001);
                    lt.Annotations.UserMedicalPack.AnnParallelLinesObject.registerClass('lt.Annotations.UserMedicalPack.AnnParallelLinesObject', lt.Annotations.Core.AnnObject);
                }
                AnnParallelLinesObject.prototype.create = function () {
                    return new lt.Annotations.UserMedicalPack.AnnParallelLinesObject();
                };
                AnnParallelLinesObject.prototype.get_supportsStroke = function () {
                    return true;
                };
                AnnParallelLinesObject.prototype.get_friendlyName = function () {
                    return "Parallel Lines";
                };
                AnnParallelLinesObject.prototype.get_supportsFill = function () {
                    return false;
                };
                AnnParallelLinesObject.prototype.get_canRotate = function () {
                    return false;
                };
                AnnParallelLinesObject.prototype.hitTest = function (point, hitTestBuffer) {
                    var hit = _super.prototype.hitTest.call(this, point, hitTestBuffer);
                    if (hit) {
                        var line = new lt.Annotations.Core.AnnPolylineObject();
                        hit = false;
                        var pointsCount = this.points.count / 2;
                        for (var i = 0; i < pointsCount && !hit; ++i) {
                            line.points.add(this.points.get_item(2 * i));
                            line.points.add(this.points.get_item(2 * i + 1));
                            if (line.hitTest(point, hitTestBuffer))
                                hit = true;
                        }
                    }
                    return hit;
                };
                return AnnParallelLinesObject;
            })(lt.Annotations.Core.AnnObject);
            UserMedicalPack.AnnParallelLinesObject = AnnParallelLinesObject;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnNorbergObjectRenderer = (function (_super) {
                __extends(AnnNorbergObjectRenderer, _super);
                function AnnNorbergObjectRenderer() {
                    _super.call(this);
                }
                AnnNorbergObjectRenderer.prototype.render = function (mapper, annObject) {
                    if (mapper == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
                    if (annObject == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
                    var firstProtractorObject = annObject.clone();
                    firstProtractorObject.points.clear();
                    firstProtractorObject.points.add(annObject.points.get_item(0));
                    firstProtractorObject.points.add(annObject.points.get_item(1));
                    firstProtractorObject.points.add(annObject.points.get_item(2));
                    _super.prototype.render.call(this, mapper, firstProtractorObject);
                    var secondProtractorObject = annObject.clone();
                    secondProtractorObject.points.clear();
                    secondProtractorObject.points.add(annObject.points.get_item(1));
                    secondProtractorObject.points.add(annObject.points.get_item(2));
                    secondProtractorObject.points.add(annObject.points.get_item(3));
                    _super.prototype.render.call(this, mapper, secondProtractorObject);
                    annObject.labels["FirstAngle"] = firstProtractorObject.labels["AngleText"].clone();
                    annObject.labels["SecondAngle"] = secondProtractorObject.labels["AngleText"].clone();
                };
                return AnnNorbergObjectRenderer;
            })(lt.Annotations.Rendering.AnnProtractorObjectRenderer);
            UserMedicalPack.AnnNorbergObjectRenderer = AnnNorbergObjectRenderer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnParallelLinesObjectRenderer = (function (_super) {
                __extends(AnnParallelLinesObjectRenderer, _super);
                function AnnParallelLinesObjectRenderer() {
                    _super.apply(this, arguments);
                }
                AnnParallelLinesObjectRenderer.prototype.render = function (mapper, annObject) {
                    if (mapper == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
                    if (annObject == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
                    var engine = this.get_renderingEngine();
                    if (engine != null && engine.get_context() != null) {
                        engine.get_context().save();
                        var count = annObject.get_points().count / 2;
                        if (count > 1) {
                            var tmpPoints = mapper.pointsFromContainerCoordinates(annObject.get_points().toArray(), annObject.get_fixedStateOperations());
                            engine.get_context().beginPath();
                            for (var i = 0; i < count; i++) {
                                var index = 2 * i;
                                engine.get_context().moveTo(tmpPoints[index].x, tmpPoints[index].y);
                                engine.get_context().lineTo(tmpPoints[index + 1].x, tmpPoints[index + 1].y);
                            }
                            if (annObject.get_supportsStroke() && annObject.get_stroke() != null) {
                                lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(engine.get_context(), annObject.get_stroke(), annObject.get_opacity());
                                engine.get_context().stroke();
                            }
                            engine.get_context().closePath();
                        }
                        engine.get_context().restore();
                    }
                };
                return AnnParallelLinesObjectRenderer;
            })(lt.Annotations.Rendering.AnnObjectRenderer);
            UserMedicalPack.AnnParallelLinesObjectRenderer = AnnParallelLinesObjectRenderer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnTwoLinesObjectRenderer = (function (_super) {
                __extends(AnnTwoLinesObjectRenderer, _super);
                function AnnTwoLinesObjectRenderer() {
                    _super.apply(this, arguments);
                }
                AnnTwoLinesObjectRenderer.prototype.render = function (mapper, annObject) {
                    if (mapper == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
                    if (annObject == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
                    var engine = this.get_renderingEngine();
                    if (engine != null && engine.get_context() != null) {
                        var leadPoints = annObject.get_points().toArray();
                        var linesCount = parseInt((leadPoints.length / 2).toString());
                        if (linesCount > 0) {
                            leadPoints = mapper.pointsFromContainerCoordinates(leadPoints, annObject.get_fixedStateOperations());
                            engine.get_context().save();
                            engine.get_context().beginPath();
                            for (var i = 0; i < linesCount; ++i) {
                                var firstPoint = leadPoints[2 * i];
                                var secondPoint = leadPoints[2 * i + 1];
                                engine.get_context().moveTo(firstPoint.x, firstPoint.y);
                                engine.get_context().lineTo(secondPoint.x, secondPoint.y);
                            }
                            if (annObject.get_supportsStroke() && annObject.get_stroke() != null) {
                                lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(engine.get_context(), annObject.get_stroke(), annObject.get_opacity());
                                engine.get_context().stroke();
                            }
                            engine.get_context().closePath();
                            engine.get_context().restore();
                        }
                    }
                };
                return AnnTwoLinesObjectRenderer;
            })(lt.Annotations.Rendering.AnnObjectRenderer);
            UserMedicalPack.AnnTwoLinesObjectRenderer = AnnTwoLinesObjectRenderer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnMidlineObjectRenderer = (function (_super) {
                __extends(AnnMidlineObjectRenderer, _super);
                function AnnMidlineObjectRenderer() {
                    _super.apply(this, arguments);
                }
                AnnMidlineObjectRenderer.prototype.render = function (mapper, annObject) {
                    if (mapper == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
                    if (annObject == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
                    var engine = this.get_renderingEngine();
                    if (engine != null && engine.get_context() != null) {
                        _super.prototype.render.call(this, mapper, annObject);
                        var annMidlineObject = annObject;
                        if (annMidlineObject != null) {
                            var leadPoints = annMidlineObject.get_points().toArray();
                            var linesCount = parseInt((leadPoints.length / 2).toString());
                            if (linesCount > 0) {
                                engine.get_context().save();
                                var linesCenters = [];
                                leadPoints = mapper.pointsFromContainerCoordinates(leadPoints, annMidlineObject.get_fixedStateOperations());
                                var radius = mapper.lengthFromContainerCoordinates(annMidlineObject.centerPointRadius, annMidlineObject.get_fixedStateOperations());
                                for (var i = 0; i < linesCount; ++i) {
                                    var firstPoint = leadPoints[2 * i];
                                    var secondPoint = leadPoints[2 * i + 1];
                                    var center = lt.LeadPointD.create((firstPoint.x + secondPoint.x) / 2, (firstPoint.y + secondPoint.y) / 2);
                                    this.drawPoint(annMidlineObject, engine.get_context(), center, radius);
                                    linesCenters[i] = center;
                                }
                                if (linesCount > 1) {
                                    var count = linesCount - 1;
                                    for (var i = 0; i < count; ++i) {
                                        engine.get_context().beginPath();
                                        this.drawLine(engine.get_context(), linesCenters[i], linesCenters[i + 1]);
                                        if (annObject.get_supportsStroke() && annObject.get_stroke() != null) {
                                            lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(engine.get_context(), annObject.get_stroke(), annObject.get_opacity());
                                            engine.get_context().stroke();
                                        }
                                        engine.get_context().closePath();
                                    }
                                }
                                engine.get_context().restore();
                            }
                        }
                    }
                };
                AnnMidlineObjectRenderer.prototype.drawLine = function (context, firstPoint, secondPoint) {
                    context.moveTo(firstPoint.x, firstPoint.y);
                    context.lineTo(secondPoint.x, secondPoint.y);
                };
                AnnMidlineObjectRenderer.prototype.drawPoint = function (annObject, context, point, radius) {
                    var pointBounds = lt.LeadRectD.create(point.x - radius, point.y - radius, radius * 2, radius * 2);
                    var topLeft = pointBounds.topLeft;
                    var topRight = pointBounds.topRight;
                    var bottomLeft = pointBounds.bottomLeft;
                    var bottomRight = pointBounds.bottomRight;
                    context.beginPath();
                    var stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("Blue"), annObject.get_stroke().get_strokeThickness());
                    this.drawLine(context, topLeft, bottomRight);
                    this.drawLine(context, bottomLeft, topRight);
                    this.drawLine(context, lt.LeadPointD.create(point.x, point.y - pointBounds.width / 2), lt.LeadPointD.create(point.x, point.y + pointBounds.width / 2));
                    this.drawLine(context, lt.LeadPointD.create(point.x - pointBounds.width / 2, point.y), lt.LeadPointD.create(point.x + pointBounds.width / 2, point.y));
                    lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(context, stroke, annObject.get_opacity());
                    context.stroke();
                    context.closePath();
                };
                return AnnMidlineObjectRenderer;
            })(UserMedicalPack.AnnTwoLinesObjectRenderer);
            UserMedicalPack.AnnMidlineObjectRenderer = AnnMidlineObjectRenderer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnIntersectionObjectRenderer = (function (_super) {
                __extends(AnnIntersectionObjectRenderer, _super);
                function AnnIntersectionObjectRenderer() {
                    _super.apply(this, arguments);
                }
                AnnIntersectionObjectRenderer.prototype.render = function (mapper, annObject) {
                    if (mapper == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
                    if (annObject == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
                    var engine = this.get_renderingEngine();
                    if (engine != null && engine.get_context() != null) {
                        _super.prototype.render.call(this, mapper, annObject);
                        if (UserMedicalPack.AnnIntersectionPointObject.isInstanceOfType(annObject)) {
                            var annIntersectionPointObject = annObject;
                            var count = annIntersectionPointObject.get_points().get_count();
                            if (count < 2)
                                return;
                            engine.get_context().save();
                            var points = mapper.pointsFromContainerCoordinates(annIntersectionPointObject.get_points().toArray(), annIntersectionPointObject.get_fixedStateOperations());
                            if (points.length > 2) {
                                var intersectionPoint = mapper.pointFromContainerCoordinates(annIntersectionPointObject.intersectionPoint.clone(), lt.Annotations.Core.AnnFixedStateOperations.none);
                                var radius = mapper.lengthFromContainerCoordinates(annIntersectionPointObject.intersectionPointRadius, annIntersectionPointObject.get_fixedStateOperations());
                                this.drawPoint(annIntersectionPointObject, engine.get_context(), intersectionPoint, radius);
                                if (points.length < 5 && annIntersectionPointObject.intersectionInsideContainer) {
                                    engine.get_context().beginPath();
                                    this.drawLine(engine.get_context(), points[3], intersectionPoint);
                                    if (annObject.get_supportsStroke() && annObject.get_stroke() != null) {
                                        var stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("Green"), annObject.get_stroke().get_strokeThickness());
                                        lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(engine.get_context(), stroke, annObject.get_opacity());
                                        engine.get_context().stroke();
                                    }
                                    engine.get_context().closePath();
                                }
                            }
                            engine.get_context().restore();
                        }
                    }
                };
                AnnIntersectionObjectRenderer.prototype.drawPoint = function (annObject, context, point, radius) {
                    var pointBounds = lt.LeadRectD.create(point.x - radius, point.y - radius, radius * 2, radius * 2);
                    var topLeft = pointBounds.topLeft;
                    var topRight = pointBounds.topRight;
                    var bottomLeft = pointBounds.bottomLeft;
                    var bottomRight = pointBounds.bottomRight;
                    context.beginPath();
                    var stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("Blue"), annObject.get_stroke().get_strokeThickness());
                    this.drawLine(context, topLeft, bottomRight);
                    this.drawLine(context, bottomLeft, topRight);
                    this.drawLine(context, lt.LeadPointD.create(point.x, point.y - pointBounds.width / 2), lt.LeadPointD.create(point.x, point.y + pointBounds.width / 2));
                    this.drawLine(context, lt.LeadPointD.create(point.x - pointBounds.width / 2, point.y), lt.LeadPointD.create(point.x + pointBounds.width / 2, point.y));
                    lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(context, stroke, annObject.get_opacity());
                    context.stroke();
                    context.closePath();
                };
                AnnIntersectionObjectRenderer.prototype.drawLine = function (context, firstPoint, secondPoint) {
                    context.moveTo(firstPoint.x, firstPoint.y);
                    context.lineTo(secondPoint.x, secondPoint.y);
                };
                return AnnIntersectionObjectRenderer;
            })(UserMedicalPack.AnnTwoLinesObjectRenderer);
            UserMedicalPack.AnnIntersectionObjectRenderer = AnnIntersectionObjectRenderer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var UserMedicalPack;
        (function (UserMedicalPack) {
            var AnnCobbAngleObjectRenderer = (function (_super) {
                __extends(AnnCobbAngleObjectRenderer, _super);
                function AnnCobbAngleObjectRenderer() {
                    _super.apply(this, arguments);
                }
                AnnCobbAngleObjectRenderer.prototype.render = function (mapper, annObject) {
                    if (mapper == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
                    if (annObject == null)
                        lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
                    var engine = this.get_renderingEngine();
                    if (engine != null && engine.get_context() != null) {
                        _super.prototype.render.call(this, mapper, annObject);
                        var annCobbAngleObject = annObject;
                        if (annCobbAngleObject != null) {
                            var count = annCobbAngleObject.get_points().get_count();
                            if (count < 2)
                                return;
                            var points = mapper.pointsFromContainerCoordinates(annCobbAngleObject.points.toArray(), annCobbAngleObject.get_fixedStateOperations());
                            if (points.length > 3) {
                                var cobbAngleData = annCobbAngleObject.cobbAngleData;
                                var firstPoint = mapper.pointFromContainerCoordinates(cobbAngleData.firstPoint, annCobbAngleObject.get_fixedStateOperations());
                                var secondPoint = mapper.pointFromContainerCoordinates(cobbAngleData.secondPoint, annCobbAngleObject.get_fixedStateOperations());
                                var intersectionPoint = mapper.pointFromContainerCoordinates(cobbAngleData.intersectionPoint, annCobbAngleObject.get_fixedStateOperations());
                                engine.get_context().save();
                                engine.get_context().beginPath();
                                this.drawLine(engine.get_context(), firstPoint, intersectionPoint);
                                this.drawLine(engine.get_context(), secondPoint, intersectionPoint);
                                if (annObject.get_supportsStroke() && annObject.get_stroke() != null) {
                                    var stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("Blue"), annObject.get_stroke().get_strokeThickness());
                                    lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStrokeWithOpacity(engine.get_context(), stroke, annObject.get_opacity());
                                    engine.get_context().stroke();
                                }
                                engine.get_context().closePath();
                                var label = annCobbAngleObject.labels["CobbAngle"];
                                if (label != null) {
                                    label.text = this.getAngleText(cobbAngleData.angle, annCobbAngleObject.anglePrecision);
                                    label.foreground = lt.Annotations.Core.AnnSolidColorBrush.create("White");
                                    label.background = lt.Annotations.Core.AnnSolidColorBrush.create("Blue");
                                    label.originalPosition = cobbAngleData.intersectionPoint;
                                }
                                engine.get_context().restore();
                            }
                        }
                    }
                };
                AnnCobbAngleObjectRenderer.prototype.drawLine = function (context, firstPoint, secondPoint) {
                    context.moveTo(firstPoint.x, firstPoint.y);
                    context.lineTo(secondPoint.x, secondPoint.y);
                };
                AnnCobbAngleObjectRenderer.prototype.getAngleText = function (angle, precision) {
                    var integerPart = parseInt(angle.toString());
                    var floatingPart = angle - integerPart;
                    floatingPart = parseFloat(floatingPart.toPrecision(precision));
                    var angleText = (integerPart + floatingPart).toString() + "\u00B0";
                    return angleText;
                };
                return AnnCobbAngleObjectRenderer;
            })(UserMedicalPack.AnnTwoLinesObjectRenderer);
            UserMedicalPack.AnnCobbAngleObjectRenderer = AnnCobbAngleObjectRenderer;
        })(UserMedicalPack = Annotations.UserMedicalPack || (Annotations.UserMedicalPack = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
