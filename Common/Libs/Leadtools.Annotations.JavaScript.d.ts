/// <reference path="jquery/jquery.d.ts" />
/// <reference path="Leadtools.d.ts" />
/// <reference path="Leadtools.Controls.d.ts" />
/// <reference path="Leadtools.Annotations.Core.d.ts" />
/// <reference path="Leadtools.Annotations.Rendering.JavaScript.d.ts" />
/// <reference path="Leadtools.Annotations.Automation.d.ts" />
/// <reference path="bootstrap/bootstrap.d.ts" />
declare module lt.Annotations.JavaScript {
    class AnnPropertyInfo {
        valueChanged: AnnObjectEditorValueChangedHandler;
        constructor(propertyName: string, readOnly: boolean, value: any, category: string, description: string, displayName: string, visible: boolean, editorType: any);
        private editorType_OnValueChanged;
        private _editorType;
        editorType: IAnnEditor;
        private _isReadOnly;
        isReadOnly: boolean;
        private _isVisible;
        isVisible: boolean;
        private _value;
        value: any;
        private _displayName;
        displayName: string;
        private _values;
        values: {
            [key: string]: any;
        };
        private _type;
        type: any;
        private _hasValues;
        hasValues: boolean;
        private _category;
        category: string;
        private _description;
        description: string;
    }
    function isNullOrEmptyString(str: string): boolean;
}
declare module lt.Annotations.JavaScript {
    class AudioPlayerDialog {
        private _source;
        private _audioElement;
        private _sourceElement1;
        private _sourceElement2;
        private _sourceElement3;
        private dialogUI;
        private _OkClick;
        constructor();
        private Init();
        show(source1: string, source2: string, source3: string): void;
        audioElement: HTMLAudioElement;
        OkClick: {
            (): void;
        };
        private OkBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    class AutomationUpdateObjectDialog {
        private _initialPage;
        initialPage: AutomationUpdateObjectDlgTab;
        private _targetObject;
        targetObject: lt.Annotations.Core.AnnObject;
        private _automation;
        automation: lt.Annotations.Automation.AnnAutomation;
        private _userName;
        userName: string;
        private _onHide;
        private _tabVisible;
        tabVisible: boolean[];
        private dialogUI;
        private _propertiesPage;
        private _contentPage;
        private _reviewsPage;
        constructor();
        onHide: {
            (): void;
        };
        private automationUpdateObjectDialog_Hide();
        show: () => void;
        private generateDialogTabs;
        private initPropertiestab(isVisible);
        private initContenttab(isVisible);
        private initReviewstab(isVisible);
        setTabVisible(tab: AutomationUpdateObjectDlgTab, value: boolean): void;
    }
    enum AutomationUpdateObjectDlgTab {
        Properties = 0,
        Content = 1,
        Reviews = 2,
    }
}
declare module lt.Annotations.JavaScript {
    class ContentPage {
        private _outputDivId;
        outputDivId: string;
        _targetObject: lt.Annotations.Core.AnnObject;
        targetObject: lt.Annotations.Core.AnnObject;
        private _onContentChange;
        onContentChange: {
            (): void;
        };
        private _contentText;
        contentText: string;
        initialize: () => void;
        empty: () => void;
        private createUIElement;
    }
}
declare module lt.Annotations.JavaScript {
    class ListTreeNode {
        private _childNodes;
        childNodes: Array<ListTreeNode>;
        private _isExpanded;
        isExpanded: boolean;
        constructor();
        private _parentDiv;
        parentDiv: HTMLDivElement;
        private _headingDiv;
        headingDiv: HTMLDivElement;
        private _headingLabel;
        headingLabel: HTMLLabelElement;
        private _collapseExpandBtn;
        collapseExpandBtn: HTMLAnchorElement;
        private _contentDiv;
        contentDiv: HTMLDivElement;
        private _contextMenu;
        contextMenu: HTMLDivElement;
        private _contextMenu_collapseExpandBtn;
        contextMenu_collapseExpandBtn: HTMLButtonElement;
        createTreeNode(): void;
        clearContent(): void;
        private collapseExpandBtn_Click(e);
        updateNodeExpansion(): void;
        updateObjectInfoVisibility(): void;
        private showContextMenu(point);
        onShowContextMenu(): void;
        private contextMenu_collapseExpandBtn_Click(e);
        private _isTouchHold;
        private _canHideContextMenu;
        private _touchHoldTimeOutHandler;
        private _currentTouchPoint;
        private _touchMoveTolerance;
        private hideContextMenu(e);
        private contextmenu(e);
        private touchstart(e);
        private touchmove(e);
        private touchend(e);
        static isTouchDevice(): boolean;
        static BtnChecked(btn: JQuery, check: boolean): any;
    }
}
declare module lt.Annotations.JavaScript {
    class AnnObjectTreeNode extends ListTreeNode {
        private _automation;
        private _imageViewer;
        private _annContainer;
        private _annObject;
        annObject: lt.Annotations.Core.AnnObject;
        private _contentTextArea;
        private _contextMenu_replyBtn;
        private _contextMenu_deleteBtn;
        private _contextMenu_propertiesBtn;
        constructor(automation: lt.Annotations.Automation.AnnAutomation, imageViewer: lt.Controls.ImageViewer, annContainer: lt.Annotations.Core.AnnContainer, annObject: lt.Annotations.Core.AnnObject);
        static createContextMenu(): void;
        customizeTreeNode(): void;
        updateContent(): void;
        hookEvents(): void;
        private parentDiv_MouseDown(e);
        private contentTextArea_Change(e);
        selectNode(select: boolean): void;
        onShowContextMenu(): void;
        private contextMenu_replyBtn_Click(e);
        private contextMenu_deleteBtn_Click(e);
        private contextMenu_propertiesBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    class AutomationObjectsListControl {
        private _automation;
        automation: lt.Annotations.Automation.AnnAutomation;
        private _imageViewer;
        imageViewer: lt.Controls.ImageViewer;
        static userName: string;
        private _listContainerDiv;
        listContainerDiv: HTMLDivElement;
        private _pages;
        constructor();
        private _automation_AfterObjectChanged;
        private _automationContainers_CollectionChanged;
        private _automation_CurrentDesignerChanged;
        private _automation_AfterUndoRedo;
        private _automation_Edit;
        private hookEvents(hook);
        private automationContainers_CollectionChanged(sender, e);
        private automation_AfterUndoRedo(sender, e);
        private automation_Edit(e);
        private automation_AfterObjectChanged(sender, e);
        private automation_CurrentDesignerChanged(sender, e);
        private clear();
        populate(): void;
        populateContainer(annContainer: lt.Annotations.Core.AnnContainer): void;
    }
}
declare module lt.Annotations.JavaScript {
    class PageTreeNode extends ListTreeNode {
        private _automation;
        private _imageViewer;
        private _annContainer;
        annContainer: lt.Annotations.Core.AnnContainer;
        constructor(automation: lt.Annotations.Automation.AnnAutomation, imageViewer: lt.Controls.ImageViewer, annContainer: lt.Annotations.Core.AnnContainer);
        updateContent(): void;
    }
}
declare module lt.Annotations.JavaScript {
    class ReviewTreeNode extends ListTreeNode {
        private _automation;
        private _annObject;
        private _annReview;
        annReview: lt.Annotations.Core.AnnReview;
        private _parentTreeNode;
        private _dateTimeLabel;
        private _commentTextArea;
        private _checkedCheckbox;
        private _contextMenu_replyBtn;
        private _contextMenu_checkBtn;
        private _contextMenu_addBtn;
        private _contextMenu_deleteBtn;
        private _statusBtns;
        static undoImageUrl: string;
        constructor(automation: lt.Annotations.Automation.AnnAutomation, annObject: lt.Annotations.Core.AnnObject, annReview: lt.Annotations.Core.AnnReview, parentTreeNode: ListTreeNode);
        static createContextMenu(): void;
        customizeTreeNode(): void;
        updateContent(): void;
        hookEvents(): void;
        private checkedCheckbox_Change(e);
        private commentTextArea_Change(e);
        onShowContextMenu(): void;
        private contextMenu_replyBtn_Click(e);
        private contextMenu_checkBtn_Click(e);
        private contextMenu_addBtn_Click(e);
        private contextMenu_deleteBtn_Click(e);
        private statusBtns_BtnClicked(e);
    }
}
declare module lt.Annotations.JavaScript {
    class AutomationTextArea {
        private _textAreaElement;
        private _removeAction;
        private _automation;
        textObject: lt.Annotations.Core.AnnTextObject;
        constructor(parent: HTMLDivElement, automation: lt.Annotations.Automation.AnnAutomation, editTextEvent: lt.Annotations.Core.AnnEditTextEventArgs, removeAction: {
            (update: boolean): void;
        });
        remove(update: boolean): void;
        updateTextObject(): void;
        private textAreaElement_FocusOut;
        private viewer_GotFocus;
        private textAreaElement_KeyDown(e);
    }
}
declare module lt.Annotations.JavaScript {
    class TreeView implements ITree {
        onSelectionChanged: {
            (event: Event): void;
        };
        mainDiv: HTMLDivElement;
        childNodesDiv: HTMLDivElement;
        parentDiv: HTMLDivElement;
        private _selectedNode;
        selectedNode: TreeNode;
        private _nodes;
        nodes: TreeNode[];
        constructor(divID: string);
        addNode(node: TreeNode): void;
        deleteNode(node: TreeNode): void;
        private updateUIElements();
    }
    class TreeNode implements ITree {
        treeView: TreeView;
        parent: TreeNode;
        parentDiv: HTMLDivElement;
        childNodesDiv: HTMLDivElement;
        contentDiv: HTMLDivElement;
        mainDiv: HTMLDivElement;
        private collapseLabel;
        private isCollapsed;
        private _isSelected;
        isSelected: boolean;
        private _nodes;
        nodes: TreeNode[];
        private _tag;
        tag: any;
        private _content;
        content: HTMLElement;
        constructor(treeView: TreeView);
        private mainDiv_Click(ev);
        private collapseLabel_Click(ev);
        addNode(node: TreeNode): void;
        deleteNode(node: TreeNode): void;
    }
    interface ITree {
        mainDiv: HTMLDivElement;
        childNodesDiv: HTMLDivElement;
        addNode(node: TreeNode): any;
        deleteNode(node: TreeNode): any;
    }
}
declare module lt.Annotations.JavaScript {
    class MediaPlayerDialog {
        private _source;
        private _videoElement;
        private _sourceElement1;
        private _sourceElement2;
        private _sourceElement3;
        private dialogUI;
        private _OkClick;
        constructor();
        private Init();
        show(source1: string, source2: string, source3: string): void;
        videoElement: HTMLVideoElement;
        OkClick: {
            (): void;
        };
        private OkBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    interface AnnObjectEditorValueChangedHandler {
        (oldValue: any, newValue: any): void;
    }
    interface IAnnEditor {
        category: string;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
    }
    class AnnColorEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(color: string, category: string);
        private _color;
        value: any;
    }
    class AnnBooleanEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(value: boolean, category: string);
        private _value;
        value: boolean;
    }
    class AnnLengthEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(annLength: lt.LeadLengthD, category: string, propertyName: string, displayName: string);
        private _annLength;
        private info_ValueChanged;
    }
    class AnnSolidColorBrushEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(annSolidColorBrush: lt.Annotations.Core.AnnSolidColorBrush, category: string, propertyName: string, displayName: string);
        private _annSolidColorBrush;
        info_ValueChanged: (oldValue: any, newValue: any) => void;
    }
    class AnnDoubleEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(value: number, category: string);
        private _value;
        value: number;
    }
    class AnnStringEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(value: string, category: string);
        private _value;
        value: string;
    }
    class AnnPictureEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(value: lt.Annotations.Core.AnnPicture, category: string);
        private _value;
        value: lt.Annotations.Core.AnnPicture;
    }
    class AnnMediaEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(value: lt.Annotations.Core.AnnMedia, category: string);
        private _value;
        value: lt.Annotations.Core.AnnMedia;
    }
    class AnnIntegerEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(value: number, category: string);
        private _value;
        value: number;
    }
    class AnnStrokeEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(annStroke: lt.Annotations.Core.AnnStroke, category: string);
        private strokePropertyInfo_ValueChanged;
    }
    class AnnFontEditor implements IAnnEditor {
        onValueChanged: lt.Annotations.JavaScript.AnnObjectEditorValueChangedHandler;
        private _category;
        category: string;
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        constructor(annFont: lt.Annotations.Core.AnnFont, category: string);
        private _annFont;
        private fontSize_ValueChanged;
        private fontFamilyName_ValueChanged;
    }
    class AnnObjectEditor {
        private _properties;
        properties: {
            [key: string]: lt.Annotations.JavaScript.AnnPropertyInfo;
        };
        private _annObject;
        constructor(annObject: lt.Annotations.Core.AnnObject);
        private wordWrapInfo_ValueChanged;
        private pictureInfo_ValueChanged;
        private hyperlink_ValueChanged;
        private showPictureInfo_ValueChanged;
        private expandedInfo_ValueChanged;
        private fillPropertyInfo_ValueChanged;
        private strokePropertyInfo_ValueChanged;
        private ruberStampTypeinfo_ValueChanged;
        private acuteInfo_ValueChanged;
        private fixedPointerInfo_ValueChanged;
        private anglePrecisionInfo_ValueChanged;
        private precisionInfo_ValueChanged;
        private angularUnitInfo_ValueChanged;
        private showTickMarksInfo_ValueChanged;
        private measurementUnitInfo_ValueChanged;
        private showGauge_ValueChanged;
        private tensionInfo_ValueChanged;
        private horizontalAlignment_ValueChanged;
        private verticalAlignment_ValueChanged;
        private text_ValueChanged;
        private media_ValueChanged;
        private encryptKey_ValueChanged;
        private encryptor_ValueChanged;
        private RubberStampTypeToString(type);
        private fillEnumValue(info, type);
    }
}
declare module lt.Annotations.JavaScript {
    class ObjectsAlignmentDialog {
        private _onHide;
        onHide: {
            (actionId: number): void;
        };
        private _automation;
        automation: lt.Annotations.Automation.AnnAutomation;
        private dialogUI;
        constructor();
        private Init();
        show(): void;
        private enableObjectsAlignment_Change(e);
        private objectsAlignmentButtons_Click(e);
        private okButton_Click(e);
        static ToLeftActionId: number;
        static ToCenterActionId: number;
        static ToRightActionId: number;
        static ToTopActionId: number;
        static ToMiddleActionId: number;
        static ToBottomActionId: number;
        static SameWidthtActionId: number;
        static SameHeightActionId: number;
        static SameSizeActionId: number;
    }
}
declare module lt.Annotations.JavaScript {
    class PasswordDialog {
        private _lock;
        private _password;
        private dialogUI;
        private _OkClick;
        constructor();
        private Init();
        show(lock: boolean): void;
        password: string;
        OkClick: {
            (): void;
        };
        private OkBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    class PropertiesPage {
        private _outputDivId;
        outputDivId: string;
        private _automation;
        automation: lt.Annotations.Automation.AnnAutomation;
        private dialogUI;
        static onPropertiesChanged: {
            (value: string, userData: any): void;
        };
        private _groupCount;
        groupCount: number;
        private _properties;
        private _subGroupCount;
        private _cssItem;
        static _editorsLookup: Array<IAnnEditor>;
        static _propertiesLookup: Array<any>;
        initialize(): void;
        private createItem(groupName, rowType, propertyName, drpFields, isSubGroup, userData?, defaultValue?, displayName?);
        private createUIElement;
        private createObjectPropertiesTabs;
        private createPropertiestabs;
        private appendToGroup;
        private renderGridInput(type, outputDivId, cssId, fields, defaultValue, displayName);
        static validateNumbericalKey(event: Event): void;
        static UpdateStyleInnerNum(cssId: string, divId: string, value: any): void;
        static UpdateStyleInnerMedia(cssId: string, divId: string, id: string, value: any): void;
        static UpdateStyleInner(cssId: string, divId: string, value: any): void;
        static Expand(id: string, sub: string): void;
        private clearValues();
        private empty;
        private hideItems();
        private fillCss2();
        private enumEditObject(properties, group, subgroup?);
        private editObject;
        private canDeleteObject();
    }
}
declare module lt.Annotations.JavaScript {
    class ReviewsPage {
        private _userName;
        userName: string;
        private treeView;
        private date;
        pageUI: {
            page: string;
            header: string;
            contnet: string;
            details: string;
            author: string;
            day: string;
            month: string;
            year: string;
            status: string;
            checked: string;
            comment: string;
            replay: string;
            add: string;
            deleteBtn: string;
            treeView: string;
        };
        initialize(): void;
        private empty;
        private addUIEventHandler();
        private createUIElement;
        private treeView_SelectionChanged;
        copyReviewsFrom(annObject: lt.Annotations.Core.AnnObject): void;
        updateContent(annObject: lt.Annotations.Core.AnnObject): void;
        replacesReviewsIn(annObject: lt.Annotations.Core.AnnObject): void;
        private static getNode(treeView, node, annObject, parentReview);
        private static addNode(treeView, relativeNode, sibling, review);
        private static getReviewNodeText(review);
        private updateUIState();
        private replayNode_Click();
        private addNode_Click();
        private deleteNode_Click();
        private deleteReview(node);
        private addOrReply(node, isReply);
        private detailsTextBox_TextChanged();
        private checkedCheckBox_ValueChanged();
        private dateTimePicker_ValueChanged();
        private reviewToDetails();
        private detailsToReview();
        private getStatusSelectIndex(value);
        cleanUp(): void;
    }
}
declare function isNUllOrEmptyString(str: string): boolean;
declare module lt.Annotations.JavaScript {
    class SnapToGridPropertiesDialog {
        private _onHide;
        private dialogUI;
        private _automation;
        automation: lt.Annotations.Automation.AnnAutomation;
        private _snapToGridOptions;
        constructor();
        private Init();
        show(): void;
        private getLineStyleFromStrok(annStroke);
        private getSelectedColorFromStroke(annStroke);
        onHide: {
            (): void;
        };
        private okBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    enum AnnCursorType {
        selectObject = 0,
        selectedObject = 1,
        controlPoint = 2,
        controlPointNWSE = 3,
        controlPointNS = 4,
        controlPointNESW = 5,
        controlPointWE = 6,
        selectRectangle = 7,
        run = 8,
        rotateCenterControlPoint = 9,
        rotateGripperControlPoint = 10,
        Default = 11,
        count = 12,
    }
    class AutomationManagerHelper {
        private _manager;
        automationManager: lt.Annotations.Automation.AnnAutomationManager;
        private static _shiftKey;
        private static _ctrlKey;
        private static _altKey;
        private static _shiftKeyDown;
        private static _ctrlKeyDown;
        private static _altKeyDown;
        private _resourcesPath;
        static _resourcesTamplate: string;
        private static _drawCursorsTemplate;
        private static _objectsImagesTemplate;
        private _drawCursors;
        drawCursors: {
            [objectId: string]: string;
        };
        private _objectsImages;
        private static _undoImageUrlTemplate;
        private static _automationCursors;
        automationCursors: {
            [key: number]: string;
        };
        constructor(manager: lt.Annotations.Automation.AnnAutomationManager, resourcesPath: string);
        private updateResourcePaths(resourcesPath);
        updateAutomationObjects(): void;
        private static updateAutomationObject(automationObject);
        getAutomationObjectCursor(objectId: number): any;
        getAutomationObjectImage(objectId: number): any;
        private static checkModifierKey(annKey);
        LoadPackage(annPackage: lt.Annotations.Automation.IAnnPackage): void;
    }
}
declare module lt.Annotations.JavaScript {
    class AutomationImageViewer extends lt.Controls.ImageViewer implements lt.Annotations.Core.IAnnAutomationControl {
        constructor(createOptions: lt.Controls.ImageViewerCreateOptions);
        private handleGotFocus;
        automationObject: lt.Annotations.Automation.AnnAutomation;
        get_automationObject(): Automation.AnnAutomation;
        set_automationObject(value: lt.Annotations.Automation.AnnAutomation): void;
        automationPointerDown: lt.Annotations.Core.AnnPointerEventType;
        add_automationPointerDown(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationPointerDown(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        automationPointerMove: lt.Annotations.Core.AnnPointerEventType;
        add_automationPointerMove(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationPointerMove(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        automationPointerUp: lt.Annotations.Core.AnnPointerEventType;
        add_automationPointerUp(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationPointerUp(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        automationDoubleClick: lt.Annotations.Core.AnnPointerEventType;
        add_automationDoubleClick(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationDoubleClick(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        onAutomationPointerDown(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        onAutomationPointerMove(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        onAutomationPointerUp(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        onAutomationDoubleClick(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        automationDpiX: number;
        automationDpiY: number;
        get_automationDpiX(): number;
        get_automationDpiY(): number;
        automationEnabled: boolean;
        get_automationEnabled(): boolean;
        automationEnabledChanged: lt.LeadEventType;
        add_automationEnabledChanged(value: lt.LeadEventHandler): void;
        remove_automationEnabledChanged(value: lt.LeadEventHandler): void;
        onEnabledChanged(e: lt.LeadEventArgs): void;
        automationLostFocus: lt.LeadEventType;
        add_automationLostFocus(value: lt.LeadEventHandler): void;
        remove_automationLostFocus(value: lt.LeadEventHandler): void;
        automationGotFocus: lt.LeadEventType;
        add_automationGotFocus(value: lt.LeadEventHandler): void;
        remove_automationGotFocus(value: lt.LeadEventHandler): void;
        automationSizeChanged: lt.LeadEventType;
        add_automationSizeChanged(value: lt.LeadEventHandler): void;
        remove_automationSizeChanged(value: lt.LeadEventHandler): void;
        onItemChanged(e: lt.Controls.ImageViewerItemChangedEventArgs): void;
        automationTransform: lt.LeadMatrix;
        get_automationTransform(): lt.LeadMatrix;
        automationTransformChanged: lt.LeadEventType;
        add_automationTransformChanged(value: lt.LeadEventHandler): void;
        remove_automationTransformChanged(value: lt.LeadEventHandler): void;
        onTransformChanged(e: lt.LeadEventArgs): void;
        automationUseDpi: boolean;
        get_automationUseDpi(): boolean;
        automationUseDpiChanged: lt.LeadEventType;
        add_automationUseDpiChanged(value: lt.LeadEventHandler): void;
        remove_automationUseDpiChanged(value: lt.LeadEventHandler): void;
        get_useDpi(): boolean;
        set_useDpi(value: boolean): void;
        automationXResolution: number;
        automationYResolution: number;
        get_automationXResolution(): number;
        get_automationYResolution(): number;
        automationInvalidate(rc: lt.LeadRectD): void;
        automationAntiAlias: boolean;
        get_automationAntiAlias(): boolean;
        set_automationAntiAlias(value: boolean): void;
        renderingEngine: lt.Annotations.Core.AnnRenderingEngine;
        get_renderingEngine(): lt.Annotations.Core.AnnRenderingEngine;
        set_renderingEngine(value: lt.Annotations.Core.AnnRenderingEngine): void;
        onPostRender(e: lt.Controls.ImageViewerRenderEventArgs): void;
        private static renderContainer(e, engine, container);
        automationGetContainersCallback: lt.Annotations.Core.AnnAutomationControlGetContainersCallback;
        get_automationGetContainersCallback(): lt.Annotations.Core.AnnAutomationControlGetContainersCallback;
        set_automationGetContainersCallback(value: lt.Annotations.Core.AnnAutomationControlGetContainersCallback): void;
        automationContainerIndex: number;
        get_automationContainerIndex(): number;
        set_automationContainerIndex(value: number): void;
        container: lt.Annotations.Core.AnnContainer;
        automationAttach(container: lt.Annotations.Core.AnnContainer): void;
        automationDetach(): void;
        get_automationContainer(): lt.Annotations.Core.AnnContainer;
        isAutomationAttached(): boolean;
        automationDataProvider: lt.Annotations.Core.AnnDataProvider;
        get_automationDataProvider(): lt.Annotations.Core.AnnDataProvider;
        set_automationDataProvider(value: lt.Annotations.Core.AnnDataProvider): void;
        automationScrollOffset: lt.LeadPointD;
        get_automationScrollOffset(): lt.LeadPointD;
    }
}
declare module lt.Annotations.JavaScript {
    class AutomationInteractiveMode extends lt.Controls.ImageViewerInteractiveMode {
        automationId: number;
        constructor();
        private _id;
        get_id(): number;
        setId(value: number): void;
        private _automationControl;
        automationControl: lt.Annotations.Core.IAnnAutomationControl;
        private workAutomationControl;
        get_name(): string;
        canStartWork(e: lt.Controls.InteractiveEventArgs): boolean;
        private _dragStartedHandler;
        private _dragDeltaHandler;
        private _dragCompletedHandler;
        private _tapHandler;
        private _doubleTapHandler;
        private _moveHandler;
        start(imageViewer: lt.Controls.ImageViewer): void;
        stop(imageViewer: lt.Controls.ImageViewer): void;
        private static convertPointerEventArgs(e, isDoubleTap);
        private interactiveService_DragStarted;
        private interactiveService_DragDelta;
        private interactiveService_DragCompleted;
        private interactiveService_Tap;
        private interactiveService_DoubleTap;
        private interactiveService_Move;
    }
}
declare module lt.Annotations.JavaScript {
    class DocumentPackDialog {
        private _lock;
        private _objectID;
        private dialogUI;
        private _onHide;
        constructor();
        private Init();
        show(): void;
        objectID: number;
        onHide: {
            (objectID: number): void;
        };
        private documentPackDialog_Hide(e);
        private documentObjectBtns_BtnClicked(e);
        private CancelBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    class CanvasDataProvider extends lt.Annotations.Core.AnnDataProvider {
        private _acitveCanvas;
        private _orginalImageData;
        constructor(acitveCanvas: HTMLCanvasElement);
        private applyEncryptDecrypt(flags, bounds, key);
        decrypt(container: lt.Annotations.Core.AnnContainer, bounds: LeadRectD, key: number): void;
        encrypt(container: lt.Annotations.Core.AnnContainer, bounds: LeadRectD, key: number): void;
        fill(container: lt.Annotations.Core.AnnContainer, bounds: lt.LeadRectD, color: string): void;
        getImageData(container: lt.Annotations.Core.AnnContainer, bounds: lt.LeadRectD): number[];
        setImageData(container: lt.Annotations.Core.AnnContainer, bounds: lt.LeadRectD, data: any): void;
    }
}
declare module lt.Annotations.JavaScript {
    enum AutomationControlMultiContainerMode {
        SinglePage = 0,
        MultiPage = 1,
    }
    class ImageViewerAutomationControl implements lt.Annotations.Core.IAnnAutomationControl {
        constructor();
        private _multiContainerMode;
        multiContainerMode: AutomationControlMultiContainerMode;
        dispose(): void;
        private _imageViewer;
        imageViewer: lt.Controls.ImageViewer;
        private handleGotFocus;
        private hook();
        private unHook();
        automationObject: lt.Annotations.Automation.AnnAutomation;
        get_automationObject(): Automation.AnnAutomation;
        set_automationObject(value: lt.Annotations.Automation.AnnAutomation): void;
        automationPointerDown: lt.Annotations.Core.AnnPointerEventType;
        add_automationPointerDown(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationPointerDown(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        automationPointerMove: lt.Annotations.Core.AnnPointerEventType;
        add_automationPointerMove(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationPointerMove(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        automationPointerUp: lt.Annotations.Core.AnnPointerEventType;
        add_automationPointerUp(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationPointerUp(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        automationDoubleClick: lt.Annotations.Core.AnnPointerEventType;
        add_automationDoubleClick(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        remove_automationDoubleClick(value: lt.Annotations.Core.AnnPointerEventHandler): void;
        onAutomationPointerDown(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        onAutomationPointerMove(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        onAutomationPointerUp(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        onAutomationDoubleClick(args: lt.Annotations.Core.AnnPointerEventArgs): void;
        automationDpiX: number;
        automationDpiY: number;
        get_automationDpiX(): number;
        get_automationDpiY(): number;
        automationEnabled: boolean;
        get_automationEnabled(): boolean;
        automationEnabledChanged: lt.LeadEventType;
        add_automationEnabledChanged(value: lt.LeadEventHandler): void;
        remove_automationEnabledChanged(value: lt.LeadEventHandler): void;
        onEnabledChanged(e: lt.LeadEventArgs): void;
        automationLostFocus: lt.LeadEventType;
        add_automationLostFocus(value: lt.LeadEventHandler): void;
        remove_automationLostFocus(value: lt.LeadEventHandler): void;
        automationGotFocus: lt.LeadEventType;
        add_automationGotFocus(value: lt.LeadEventHandler): void;
        remove_automationGotFocus(value: lt.LeadEventHandler): void;
        automationSizeChanged: lt.LeadEventType;
        add_automationSizeChanged(value: lt.LeadEventHandler): void;
        remove_automationSizeChanged(value: lt.LeadEventHandler): void;
        private imageViewer_ItemChanged;
        private imageViewer_ActiveItemChanged;
        private automationObject_ActiveContainerChanged;
        private syncActiveItemContainer(fromViewer);
        private getItemForCurrentContainer();
        private getCurrentContainer();
        automationTransform: lt.LeadMatrix;
        get_automationTransform(): lt.LeadMatrix;
        automationTransformChanged: lt.LeadEventType;
        add_automationTransformChanged(value: lt.LeadEventHandler): void;
        remove_automationTransformChanged(value: lt.LeadEventHandler): void;
        private imageViewer_TransformChanged;
        automationUseDpi: boolean;
        get_automationUseDpi(): boolean;
        automationUseDpiChanged: lt.LeadEventType;
        add_automationUseDpiChanged(value: lt.LeadEventHandler): void;
        remove_automationUseDpiChanged(value: lt.LeadEventHandler): void;
        imageViewer_PropertyChanged: (sender: any, e: Controls.PropertyChangedEventArgs) => void;
        automationXResolution: number;
        automationYResolution: number;
        get_automationXResolution(): number;
        get_automationYResolution(): number;
        automationInvalidate(rc: lt.LeadRectD): void;
        automationAntiAlias: boolean;
        get_automationAntiAlias(): boolean;
        set_automationAntiAlias(value: boolean): void;
        renderingEngine: lt.Annotations.Core.AnnRenderingEngine;
        get_renderingEngine(): lt.Annotations.Core.AnnRenderingEngine;
        set_renderingEngine(value: lt.Annotations.Core.AnnRenderingEngine): void;
        private imageViewer_PostRender;
        private static renderContainer(e, renderingEngine, container, runMode);
        automationGetContainersCallback: lt.Annotations.Core.AnnAutomationControlGetContainersCallback;
        get_automationGetContainersCallback(): lt.Annotations.Core.AnnAutomationControlGetContainersCallback;
        set_automationGetContainersCallback(value: lt.Annotations.Core.AnnAutomationControlGetContainersCallback): void;
        automationContainerIndex: number;
        get_automationContainerIndex(): number;
        set_automationContainerIndex(value: number): void;
        _container: lt.Annotations.Core.AnnContainer;
        automationAttach(container: lt.Annotations.Core.AnnContainer): void;
        automationDetach(): void;
        automationDataProvider: lt.Annotations.Core.AnnDataProvider;
        get_automationDataProvider(): lt.Annotations.Core.AnnDataProvider;
        set_automationDataProvider(value: lt.Annotations.Core.AnnDataProvider): void;
        automationScrollOffset: lt.LeadPointD;
        get_automationScrollOffset(): lt.LeadPointD;
    }
}
declare module lt.Annotations.JavaScript {
    class MedicalPackDialog {
        private _lock;
        private _objectID;
        private dialogUI;
        private _onHide;
        constructor();
        private Init();
        show(): void;
        objectID: number;
        onHide: {
            (objectID: number): void;
        };
        private medicalPackDialog_Hide(e);
        private medicalObjectBtns_BtnClicked(e);
        private CancelBtn_Click(e);
    }
}
declare module lt.Annotations.JavaScript {
    class RightClickInteractiveMode extends lt.Controls.ImageViewerInteractiveMode {
        onRightClick: {
            (x: number, y: number): void;
        };
        _automation: lt.Annotations.Automation.AnnAutomation;
        automation: lt.Annotations.Automation.AnnAutomation;
        constructor();
        toString(): string;
        start(viewer: lt.Controls.ImageViewer): void;
        stop(viewer: lt.Controls.ImageViewer): void;
        private RightClickInteractiveMode_ServiceTap;
    }
}
