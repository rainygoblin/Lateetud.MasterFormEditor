var USE_ImageViewerAutomationControl: boolean = true;

module HTML5Demos {
    export module AnnotationsDemo {
        export class AnnotationsDemoApp {
            // <!-- Variables -->
            //Image Viewer Objects
            imageViewer: lt.Controls.ImageViewer;
            automationControl: lt.Annotations.Core.IAnnAutomationControl;
            tempUrl: string;
            currentImageUrl: string;
            imageDPI: number;
            isDialogOpen: boolean;

            // DPI to set 
            private _imageDPI: number;
            private _isPageBeingRefreshed = false;
            private _isPdf = false;
            private _currentDocumentUrl: string;
            public _omrAnnotationColor: string;
            public _textAnnotationColor: string;
            public isAnyChangeInAnnotation: boolean;
            public _hyperlink: string;

            private _totalPages: number = 0;
            private _currentPageNumber: number = 0;
            private _height: number;
            private _resolution: number;
            private _position: number;
            private _heightResizeFactor: number;
            private _sidebarThumbnailCanvas: HTMLCanvasElement = null;
            private _newFieldCounter: number = 0;


            //Automation Objects
            automationInteractiveMode: lt.Annotations.JavaScript.AutomationInteractiveMode;
            rightClickInteractiveMode: lt.Annotations.JavaScript.RightClickInteractiveMode;
            panZoomInteractiveMode: lt.Controls.ImageViewerPanZoomInteractiveMode;
            automationManager: lt.Annotations.Automation.AnnAutomationManager;
            activeAutomation: lt.Annotations.Automation.AnnAutomation;
            managerHelper: lt.Annotations.JavaScript.AutomationManagerHelper;
            renderingEngine: lt.Annotations.Rendering.AnnHtml5RenderingEngine;

            //Leadtools.Annotations.JavaScript Dialogs
            automationUpdateObjectDialog: lt.Annotations.JavaScript.AutomationUpdateObjectDialog;
            passwordDialog: lt.Annotations.JavaScript.PasswordDialog;
            mediaPlayerDialog: lt.Annotations.JavaScript.MediaPlayerDialog;
            audioPlayerDialog: lt.Annotations.JavaScript.AudioPlayerDialog;
            documentPackDialog: lt.Annotations.JavaScript.DocumentPackDialog;
            medicalPackDialog: lt.Annotations.JavaScript.MedicalPackDialog;
            snapToGridPropertiesDialog: lt.Annotations.JavaScript.SnapToGridPropertiesDialog;
            objectsAlignmentDialog: lt.Annotations.JavaScript.ObjectsAlignmentDialog;

            //Common Dialogs
            openFileDlg: Dialogs.OpenFileDlg;
            loadingDlg: Dialogs.LoadingDlg;
            aboutDlg: Dialogs.AboutDlg;

            // Control to use when the a text object is being edited
            private automationTextArea: lt.Annotations.JavaScript.AutomationTextArea;

            private loadSaveHelper: AnnotationLoadSaveHelper;
            private annMedicalPackPackage = new lt.Annotations.UserMedicalPack.AnnMedicalPack;
            private isMedicalPackLoaded: boolean = false;


            get demoName(): string {
                return "LEADTOOLS JavaScript Annotations Demo";
            }

            public run(): void {
                this._newFieldCounter = 0;
                this._omrAnnotationColor = "magenta";
                this._textAnnotationColor = "green";
                this.isAnyChangeInAnnotation = false;
                this._hyperlink = "http://www.lateetud.com";

                this.initUI();
                this.initAutomation();
                this.createAutomationControl(USE_ImageViewerAutomationControl);
                this.createDemoAutomations(2)
                this.initInteractiveModes();

                var fileSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("fileSelect");
                this.activeAutomation = this.automationManager.automations.item(fileSelect.selectedIndex);
                this.activeAutomation.active = true;
                this.loadSaveHelper.automation = this.activeAutomation;
                //$('.splitter-resizebar').on("onImageViewerResize", $.proxy(this.onImageViewerResize, this));
                this.beginOperation("Verifying Service Connection...")
                $.getJSON("../../apps/serviceConfig.json")
                    .done((json: {}) => {

                        // If other than "LEADTOOLS", specify where your license directory is.
                        lt.LTHelper.licenseDirectory = json["licenseDirectory"];

                        this.initService(json);
                    })
                    .fail(() => {

                        // If other than "LEADTOOLS", specify where your license directory is.
                        lt.LTHelper.licenseDirectory = "../../License";

                        // The json configuration file wasn't found. Just manually set.
                        this.initService(null);
                    })
                    .always(() => {
                        // Regardless of what happens, this runs after.
                        Utils.ServiceHelper.verifyService()
                            .done((response: Utils.PingResponse) => {
                                // Check if the LEADTOOLS license on the server is usable, otherwise, show a warning
                                if (!response.isLicenseChecked) {
                                    // The server has failed to check the license, could be an invalid license or one that does not exist
                                    window.alert("Warning!\n\nThe LEADTOOLS License used in the service could not be found. This demo may not function as expected.");
                                } else if (response.isLicenseExpired) {
                                    // The server has detected that the license used has expired
                                    window.alert("Warning!\n\nThe LEADTOOLS Kernel has expired. This demo may not function as expected.");
                                }
                                // If the kernel is not release, log it (for debugging)
                                if (response.kernelType != null && response.kernelType != "Release") {
                                    console.log("Server LEADTOOLS Kernel type: " + response.kernelType);
                                }
                                // On Success
                                this.LoadDocument();
                                //$(".splitter-resizebar").trigger("onImageViewerResize");

                            })
                            .fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => {
                                // On Failure
                                this.endOperation(false);
                                window.alert("The LEADTOOLS Service could not be reached - Check your service path.");
                            });
                    });
            }

            private initService(json?: {}): void {
                Utils.ServiceHelper.init();
                // If you have a different route to verify service, change it here
                //Utils.ServiceHelper.serviceTestResource = "Path/To/Ping"

                //Utils.ServiceHelper.serviceHost = (json && json["serviceHost"]) ? json["serviceHost"] : null;
                //Utils.ServiceHelper.servicePath = (json && json["servicePath"]) ? json["servicePath"] : null;

                ////Change the relative path from our client side (/webapp) to service routing (/api)
                //Utils.ServiceHelper.serviceApiPath = (json && json["serviceApiPath"]) ? json["serviceApiPath"] : "../../api";

                Utils.ServiceHelper.serviceHost = "";
                Utils.ServiceHelper.servicePath = "";
                Utils.ServiceHelper.serviceApiPath = "/api";
            }

            // <!-- Initailize UI Controls -->
            private initUI(): void {
                if (lt.LTHelper.OS == lt.LTOS.iOS) {
                    $("#loadAnnotations").hide();
                    $("#saveAnnotations").hide();
                    $("#loadBatesStamp").hide();
                }


                if (Utils.DemoHelper.isTouchDevice()) {
                    $(".headerToolbarDiv").css("overflow", "hidden");
                    $(".footerToolbarDiv").css("overflow", "hidden");
                    var headerToolbarDiv: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('headerToolbarDiv').item(0);
                    var footerToolbarDiv: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('footerToolbarDiv').item(0);

                    //  Handle touch scroll 
                    Utils.DemoHelper.touchScroll(headerToolbarDiv);
                    Utils.DemoHelper.touchScroll(footerToolbarDiv);
                }

                // Init Automation Update Object tDialog
                this.automationUpdateObjectDialog = new lt.Annotations.JavaScript.AutomationUpdateObjectDialog();
                this.automationUpdateObjectDialog.onHide = (() => this.automationUpdateObjectDialog_Hide());
                // Init Password dialog
                this.passwordDialog = new lt.Annotations.JavaScript.PasswordDialog();
                // Init Media Palyer dialog
                this.mediaPlayerDialog = new lt.Annotations.JavaScript.MediaPlayerDialog();
                // Init Audio Palyer dialog
                this.audioPlayerDialog = new lt.Annotations.JavaScript.AudioPlayerDialog();
                // Init Document Pack dialog
                this.documentPackDialog = new lt.Annotations.JavaScript.DocumentPackDialog();
                this.documentPackDialog.onHide = ((objectID: number) => this.documentPackDialog_Hide(objectID));
                // Init Medical Pack dialog
                this.medicalPackDialog = new lt.Annotations.JavaScript.MedicalPackDialog();
                this.medicalPackDialog.onHide = ((objectID: number) => this.medicalPackDialog_Hide(objectID));
                // Init Snap To Grid Properties dialog
                this.snapToGridPropertiesDialog = new lt.Annotations.JavaScript.SnapToGridPropertiesDialog();
                this.snapToGridPropertiesDialog.onHide = () => this.snapToGridPropertiesDialog_Hide();
                // Init Objects Alignment Dialog dialog
                this.objectsAlignmentDialog = new lt.Annotations.JavaScript.ObjectsAlignmentDialog();
                this.objectsAlignmentDialog.onHide = (actionId: number) => this.objectsAlignmentDialog_Hide(actionId);
                // Init loading dialog 
                this.loadingDlg = new Dialogs.LoadingDlg();
                // Init about dialog
                this.aboutDlg = new Dialogs.AboutDlg(this.demoName);

                this.loadSaveHelper = new AnnotationLoadSaveHelper();

                this.addUIEventHandler();

                this.isDialogOpen = false;

                $(document).bind("keydown", (e: JQueryEventObject) => this.window_keydown(e));

                $('#richTextEditorDialog').bind("hide.bs.modal", $.proxy(function () {
                    this.isDialogOpen = false;
                    var automation = this.activeAutomation;
                    if (automation == null)
                        return;
                    var richTextObject: CustomAnnotations.AnnRichTextObject = this.activeAutomation.get_currentEditObject();
                    if (richTextObject != null) {
                        richTextObject.RichTextString = $('#richTextEditor').closest(".jqte").find(".jqte_editor").html();
                        richTextObject.IsSvgTextValid = false;
                        richTextObject.Image.onload = function () {
                            automation.invalidate(lt.LeadRectD.empty);
                            richTextObject.Image.onload = null;
                        };
                        richTextObject.loadSvgImage();
                    }
                }, this));



            }


            private window_keydown(e: JQueryEventObject) {
                if (e.keyCode == 46 && this.isDialogOpen == false)
                    this.deleteAnnotationBtn_Click(e);
            }

            private LoadDocument(): void {

                this.beginOperation('Loading New Document...');

                var baseUrl = document.getElementById('BaseUrl').attributes["value"].value;
                var rootFolderName = document.getElementById('hdnRootFolderName').attributes["value"].value;
                var key = document.getElementById('hdnKey').attributes["value"].value;
                var friendlyName = document.getElementById('hdnfriendlyName').attributes["value"].value;


                var rest: string = [Utils.ServiceHelper.serviceUri, "Raster", "Info"].join("/");

                this._position = 0;
                this._currentPageNumber = 0;

                this._currentDocumentUrl = baseUrl + "/" + rootFolderName + "/" + friendlyName + "/" + friendlyName + ".tif";
                var params = {
                    uri: this._currentDocumentUrl
                };

                $.get(rest, params)
                    .done((documentInfo: ImageInfo) => {
                        if (documentInfo.uri == null) {
                            this.endOperation(false);
                        }
                        else {
                            this.getInfo(documentInfo);
                            this.loadThumbnails();
                            this.LoadSelectedPage(1);
                        }

                        //$(this.demoUI.bookmarksDiv).empty();
                        //if (this._isPdf) {
                        //    this.loadBookmarks();
                        //}
                    })
                    .fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown))
            }

            private LoadSelectedPage(selectedPage: number, changePosition: boolean = true): void {
                if (selectedPage == this._currentPageNumber && changePosition) {
                    this.endOperation(false);
                    return;
                }

                this._position = 0;
                this.beginOperation('Loading New Page...');

                if (selectedPage > this._totalPages || selectedPage < 0) {
                    window.alert("Selected Page is Unavailable");
                    return;
                }
                $('img').removeClass("selected");
                // Get the image element for the current thumbnail 
                var imgElement = $('#img_' + this._currentPageNumber);
                // Mark it as unselected
                imgElement.removeClass("selected");

                imgElement = $('#img_' + selectedPage);

                this._currentPageNumber = selectedPage;

                var rest = [Utils.ServiceHelper.serviceUri, "Raster", "Load"].join("/");
                var params = {
                    uri: this._currentDocumentUrl,
                    pageNumber: selectedPage
                };
                rest = Utils.ServiceHelper.addParamsToUrl(rest, params);

                this.imageViewer.beginUpdate();
                this.imageViewer.imageUrl = rest;
                this.imageViewer.endUpdate();

                // Draw new selected image border
                imgElement.addClass("selected");

                if (this.activeAutomation != null) {
                    this.activeAutomation.container.children.clear(); //clear old page annotation
                }

                this.LoadSelectedPageAnnotation(selectedPage, this._currentDocumentUrl, this.activeAutomation, this.imageViewer);
                var that = this;
                setTimeout(function () {
                    $(".lt-imageviewer-forecanvas").prop("height", (parseInt($(".lt-imageviewer-forecanvas").prop("height")) - 20).toString());
                    that.imageViewer.onSizeChanged();
                }, 500);
                //if (this._currentPageNumber == this._totalPages) {
                //    $(this.demoUI.NextBtn).prop('disabled', true);
                //    $(this.demoUI.LastPageBtn).prop('disabled', true);
                //}
                //else {
                //    $(this.demoUI.NextBtn).prop('disabled', false);
                //    $(this.demoUI.LastPageBtn).prop('disabled', false);
                //}

                //if (this._currentPageNumber == 1) {
                //    $(this.demoUI.PreviousBtn).prop('disabled', true);
                //    $(this.demoUI.FirstPageBtn).prop('disabled', true);
                //}
                //else {
                //    $(this.demoUI.PreviousBtn).prop('disabled', false);
                //    $(this.demoUI.FirstPageBtn).prop('disabled', false);
                //}
            }

            private LoadSelectedPageAnnotation(selectedPage: number, currentDocumentUri: string, activeAutomation: lt.Annotations.Automation.AnnAutomation, imageViewer: lt.Controls.ImageViewer): void {

                var rest: string = [Utils.ServiceHelper.serviceUri, "Data", "LoadXml"].join("/");
                var FolderName: string = document.getElementById('hdnKey').attributes["value"].value;
                $.ajax(rest, {
                    'type': "GET",
                    headers: { "cache-control": "no-cache" },
                    data: "FolderName=" + FolderName.toString(),
                }).done((xmlcontent: string) => {
                    this.loadSaveHelper.automation = activeAutomation;
                    this.loadSaveHelper.imageViewer = imageViewer
                    this.loadSaveHelper.loadContent(xmlcontent, selectedPage, false);
                    this.onFieldMappingliClick();
                })
                    .fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown))
            }

            private getInfo(info: ImageInfo): void {
                if (!info.formatId) {
                    alert('This document has an unrecognized file format.');
                    this.endOperation(false);
                }

                this._isPdf = info.formatName == 'RasPdf';
                this._totalPages = info.totalPages;
                //this._currentPageNumber = 1;
                this._imageDPI = info.xResolution;
                this._height = info.height;
                this._heightResizeFactor = 1;
                if (info.hasResolution) {
                    this._resolution = info.yResolution;
                }
            }

            public loadThumbnails(): void {
                $("#thumbnailsDiv").empty();

                var rest = [Utils.ServiceHelper.serviceUri, "Raster", "Load"].join("/");
                for (var pageNumber = 1; pageNumber <= this._totalPages; pageNumber++) {
                    var params = {
                        uri: this._currentDocumentUrl,
                        pageNumber: pageNumber,
                        imageWidth: parseInt(($('.sidebar-left').width() / 1.5).toString(), 10),
                    };

                    var imageRest = Utils.ServiceHelper.addParamsToUrl(rest, params);

                    var $img = $(document.createElement("img")).attr({
                        id: "img_" + pageNumber,
                        src: imageRest,
                        "data-page-number": pageNumber.toString()
                    }).addClass("thumbnail-img");
                    $img.click($.proxy(this.onThumbnailsSelect, this));

                    $("#thumbnailsDiv").append($img);
                }
            }

            private onThumbnailsSelect(e: JQueryEventObject): void {
                var clickedPageNumber = $(e.currentTarget).attr("data-page-number");
                //Save Current page Annotations

                this.loadSaveHelper.automation = this.activeAutomation;
                this.loadSaveHelper.imageViewer = this.imageViewer
                this.loadSaveHelper.saveAnnotations(this._currentPageNumber);
                this.LoadSelectedPage(parseInt(clickedPageNumber, 10));
                this.isAnyChangeInAnnotation = false;
            }

            private showRequestError(jqXHR: JQueryXHR, textStatus: string, errorThrown: string): void {
                if (this._isPageBeingRefreshed) {
                    this._isPageBeingRefreshed = false;
                    return;
                }

                this.endOperation(false);
                var body: any = null;
                var detail: string = null;
                try {
                    body = JSON.parse(jqXHR.responseText);
                    detail = "(" + body["detail"] + ")";
                    console.error("Error: " + detail);
                }
                catch (e) {
                    console.error("Could not parse JSON from Error")
                    detail = "(Error " + jqXHR.status + ": " + jqXHR.statusText + ")"
                }

                var message: string = [
                    "An error has occurred in the application.",
                    detail
                ].join("\n");
                window.alert(message);
                jqXHR = null;
            }



            private addUIEventHandler() {
                //$("#openFile").bind("click", $.proxy(this.openBtn_Click, this));
                $("#saveImage").bind("click", $.proxy(this.saveImageBtn_Click, this));
                $("#loadAnnotations").bind("click", $.proxy(this.loadAnnotationsBtn_Click, this));
                $("#saveAnnotations").bind("click", $.proxy(this.saveAnnotationsBtn_Click, this));
                $("#DeletePage").bind("click", $.proxy(this.deletePageBtn_Click, this));
                $("#loadBatesStamp").bind("click", $.proxy(this.loadBatesStampBtn_Click, this));
                $("#undo").bind("click", $.proxy(this.undoBtn_Click, this));
                $("#redo").bind("click", $.proxy(this.redoBtn_Click, this));
                $("#deleteAnnotation").bind("click", $.proxy(this.deleteAnnotationBtn_Click, this));
                $("#duplicate").bind("click", $.proxy(this.duplicateBtn_Click, this));
                $("#lockObject").bind("click", $.proxy(this.lockObjectBtn_Click, this));
                $("#unlockObject").bind("click", $.proxy(this.unlockObjectBtn_Click, this));
                $("#applyEncryptor").bind("click", $.proxy(this.applyEncryptorBtn_Click, this));
                $("#applyDecryptor").bind("click", $.proxy(this.applyDecryptorBtn_Click, this));
                $("#realizeRedact").bind("click", $.proxy(this.realizeRedactBtn_Click, this));
                $("#restoreRedact").bind("click", $.proxy(this.restoreRedactBtn_Click, this));
                $("#annotationsProperties").bind("click", $.proxy(this.annotationsPropertiesBtn_Click, this));
                $("#objectsAlignmentOptions").bind("click", $.proxy(this.objectsAlignmentOptionsBtn_Click, this));
                $("#burnAnnotations").bind("click", $.proxy(this.burnAnnotationsBtn_Click, this));
                $("#runUserMode").bind("click", $.proxy(this.runUserModeBtn_Click, this));
                $("#designUserMode").bind("click", $.proxy(this.designUserModeBtn_Click, this));
                $("#about").bind("click", $.proxy(this.aboutBtn_Click, this));
                $("#panZoom").bind("click", $.proxy(this.annotationsObjectsBtns_BtnClicked, this));
                $(".annotationObjectBtn").bind("click", $.proxy(this.annotationsObjectsBtns_BtnClicked, this));
                $("#documentAnnotations").bind("click", $.proxy(this.documentAnnotationsBtn_BtnClicked, this));
                $("#medicalAnnotations").bind("click", $.proxy(this.medicalAnnotationsBtn_BtnClicked, this));
                $("#documentAnnotations").bind("click", $.proxy(this.documentAnnotationsBtn_BtnClicked, this));
                $("#medicalAnnotations").bind("click", $.proxy(this.medicalAnnotationsBtn_BtnClicked, this));
                $("#zoomIn").bind("click", $.proxy(this.zoomIn_BtnClicked, this));
                $("#zoomOut").bind("click", $.proxy(this.zoomOut_BtnClicked, this));
                $("#fit").bind("click", $.proxy(this.fit_BtnClicked, this));
                $("#actualSize").bind("click", $.proxy(this.actualSize_BtnClicked, this));
                //$("#file").on("click", UploadFile(this.isAnyChangeInAnnotation));
                $("#file").bind("click", $.proxy(this.onFileClick, this));
                $('#btnback').bind("click", $.proxy(this.onBtnBackClick, this));
                $("#fitWidth").bind("click", $.proxy(this.fitWidth_BtnClicked, this));
                //$("#fieldmappingli").bind("click", $.proxy(this.onFieldMappingliClick, this));


            }

            // <!-- Initailize Automation Objects and load resources -->
            private initAutomation() {
                this.automationManager = new lt.Annotations.Automation.AnnAutomationManager();
                this.automationManager.createDefaultObjects();
                this.automationManager.editTextAfterDraw = true;
                this.automationManager.editContentAfterDraw = true;

                this.renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                this.automationManager.renderingEngine = this.renderingEngine;

                var resources: lt.Annotations.Core.AnnResources = this.loadResources();
                this.automationManager.resources = resources;
                // register custom triangle object
                // Create a triangle object
                var triangle = new CustomAnnotations.AnnTriangleObject();
                // Create user defined automation object
                var triangleAutomation = this.createTriangleAutomationObject(triangle);

                var automationObjects = this.automationManager.objects;
                automationObjects.add(triangleAutomation);

                // register custom rich text object
                // Create a rich text object
                var richText = new CustomAnnotations.AnnRichTextObject();
                // Create user defined automation object
                var richTextAutomation = this.createRichTextAutomationObject(richText);

                var automationObjects = this.automationManager.objects;
                automationObjects.add(richTextAutomation);

                //Added by ankit bhanderi => for create new custom object 
                var omrText = new CustomAnnotations.AnnOmrObject();
                omrText.supportsStroke = true;
                omrText.set_stroke(lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create(this._omrAnnotationColor), lt.LeadLengthD.create(1)));
                omrText.supportsFill = true;
                omrText.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create(this._omrAnnotationColor));
                omrText.set_opacity(0.4);


                var omrTextAutomation = this.createOmrAutomationObject(omrText);
                var automationObjects = this.automationManager.objects;
                automationObjects.add(omrTextAutomation);

                var text = new CustomAnnotations.AnnTextObject();
                text.supportsStroke = true;
                text.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create(this._textAnnotationColor));
                text.set_opacity(0.4);
                text.set_stroke(lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create(this._textAnnotationColor), lt.LeadLengthD.create(1)));
                var textAutomation = this.createTextAutomationObject(text);
                var automationObjects = this.automationManager.objects;
                automationObjects.add(textAutomation);
                //ended by ankit bhanderi

                this.renderingEngine.loadPicture.add((sender: any, e: lt.Annotations.Core.AnnLoadPictureEventArgs) => this.renderingEngine_LoadPicture(sender, e));
                this.managerHelper = new lt.Annotations.JavaScript.AutomationManagerHelper(this.automationManager, "../../apps/Resources");

                // Set http://www.lateetud.com as the default hyperlink for all object templates
                // Set the default stroke thickness to 2
                var isDesktop: boolean = (lt.LTHelper.device === lt.LTDevice.desktop);

                var automationObjectsCount: number = automationObjects.count;

                for (var i: number = 0; i < automationObjectsCount; ++i) {

                    var automationObject: lt.Annotations.Automation.AnnAutomationObject = automationObjects.item(i);
                    automationObject.useRotateThumbs = false;

                    //this.automationManager.automations.automationObject
                    //ImageViewerAutomationControl.prototype.remove_automationDoubleClick = function (value) { this.automationDoubleClick.remove(value); };

                    //var automationObject = automationObjects.item(i);
                    var annObjectTemplate = automationObject.objectTemplate;


                    if (annObjectTemplate != null) {
                        // Set the object draw cursor 
                        automationObject.drawCursor = this.managerHelper.getAutomationObjectCursor(automationObject.id);

                        if (!isDesktop && annObjectTemplate.supportsStroke) {
                            var stroke = annObjectTemplate.stroke;

                            stroke.strokeThickness = lt.LeadLengthD.create(2);
                            annObjectTemplate.stroke = stroke;
                        }

                        var isAudioObject = annObjectTemplate instanceof lt.Annotations.Core.AnnAudioObject;
                        if (isAudioObject) {
                            var audioObject = <lt.Annotations.Core.AnnAudioObject>annObjectTemplate;
                            audioObject.media.source1 = "http://demo.leadtools.com/media/mp3/NewAudio.mp3";
                            audioObject.media.type1 = "audio/mp3";
                            audioObject.media.source2 = "http://demo.leadtools.com/media/wav/newaudio.wav";
                            audioObject.media.type2 = "audio/wav";
                            audioObject.media.source3 = "http://demo.leadtools.com/media/OGG/NewAudio_uncompressed.ogg";
                            audioObject.media.type3 = "audio/ogg";
                        }
                        else if (annObjectTemplate instanceof lt.Annotations.Core.AnnMediaObject) {
                            var videoObject = <lt.Annotations.Core.AnnMediaObject>annObjectTemplate;
                            videoObject.media.source1 = "http://demo.leadtools.com/media/mp4/dada_h264.mp4";
                            videoObject.media.type1 = "video/mp4";
                            videoObject.media.source2 = "http://demo.leadtools.com/media/WebM/DaDa_VP8_Vorbis.mkv";
                            videoObject.media.type2 = "video/webm";
                            videoObject.media.source3 = "http://demo.leadtools.com/media/OGG/DaDa_Theora_Vorbis.ogg";
                            videoObject.media.type3 = "video/ogg";
                        }
                        annObjectTemplate.hyperlink = this._hyperlink;
                    }
                }


                this.fixedTextPadding(this.renderingEngine, false);
            }

            private fixedTextPadding(engine: lt.Annotations.Core.AnnRenderingEngine, enable: boolean) {
                for (var key in engine.renderers) {
                    var annTextObjectRenderer = <lt.Annotations.Rendering.AnnTextObjectRenderer>engine.renderers[key];
                    if (annTextObjectRenderer != null)
                        annTextObjectRenderer.fixedPadding = enable;
                }
            }

            private loadResources(): lt.Annotations.Core.AnnResources {
                var resources: lt.Annotations.Core.AnnResources = new lt.Annotations.Core.AnnResources();
                var rubberStampsResources = resources.rubberStamps;
                var imagesResources = resources.images;
                var objects = "Resources/Objects/";
                var rubberStamps = "Resources/Objects/RubberStamps/";

                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampApproved] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Approved.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampAssigned] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Assigned.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampClient] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Client.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampChecked] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Checked.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampCopy] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Copy.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampDraft] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Draft.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampExtended] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Extended.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampFax] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Fax.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampFaxed] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Faxed.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampImportant] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Important.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampInvoice] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Invoice.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampNotice] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Notice.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampPaid] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Paid.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampOfficial] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Official.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampOnFile] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Onfile.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampPassed] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Passed.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampPending] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Pending.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampProcessed] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Processed.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampReceived] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Received.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampRejected] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Rejected.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampRelease] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Release.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampSent] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Sent.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampShipped] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Shipped.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampTopSecret] = new lt.Annotations.Core.AnnPicture(rubberStamps + "TopSecret.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampUrgent] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Urgent.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampVoid] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Void.png");

                imagesResources[0] = new lt.Annotations.Core.AnnPicture(objects + "Point.png");
                imagesResources[1] = new lt.Annotations.Core.AnnPicture(objects + "Lock.png");
                imagesResources[2] = new lt.Annotations.Core.AnnPicture(objects + "Hotspot.png");
                imagesResources[3] = new lt.Annotations.Core.AnnPicture(objects + "Audio.png");
                imagesResources[4] = new lt.Annotations.Core.AnnPicture(objects + "Video.png");
                imagesResources[5] = new lt.Annotations.Core.AnnPicture(objects + "EncryptPrimary.png");
                imagesResources[6] = new lt.Annotations.Core.AnnPicture(objects + "EncryptSecondary.png");
                imagesResources[7] = new lt.Annotations.Core.AnnPicture(objects + "Note.png");
                imagesResources[8] = new lt.Annotations.Core.AnnPicture(objects + "StickyNote.png");

                return resources;
            }

            private createTriangleAutomationObject(annObject: lt.Annotations.Core.AnnObject): lt.Annotations.Automation.AnnAutomationObject {
                var triangleObjectId = -99;
                // Create the custom automation object and hook the designers
                var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                automationObj.id = triangleObjectId;
                automationObj.name = "Triangle";
                automationObj.drawDesignerType = CustomAnnotations.AnnTriangleDrawDesigner; // hook the custom draw designer
                automationObj.editDesignerType = CustomAnnotations.AnnTriangleEditDesigner; // hook the custom edit designer
                automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;

                var annTriangleRenderer = new CustomAnnotations.AnnTriangleRenderer();
                var annPolylineRenderer = this.renderingEngine.renderers[lt.Annotations.Core.AnnObject.polylineObjectId];

                annTriangleRenderer.locationsThumbStyle = annPolylineRenderer.locationsThumbStyle;
                annTriangleRenderer.rotateCenterThumbStyle = annPolylineRenderer.rotateCenterThumbStyle;
                annTriangleRenderer.rotateGripperThumbStyle = annPolylineRenderer.rotateGripperThumbStyle;

                this.renderingEngine.renderers[triangleObjectId] = annTriangleRenderer;   // hook the custom renderer
                automationObj.objectTemplate = annObject;

                this.renderingEngine.renderers[triangleObjectId] = annTriangleRenderer;   // hook the custom renderer

                annTriangleRenderer.initialize(this.renderingEngine);

                return automationObj;
            }

            private createRichTextAutomationObject(annObject: lt.Annotations.Core.AnnObject): lt.Annotations.Automation.AnnAutomationObject {
                var RichTextObjectId = -200;
                // Create the custom automation object and hook the designers
                var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                automationObj.id = RichTextObjectId;
                automationObj.name = "RichText";
                automationObj.drawDesignerType = CustomAnnotations.AnnRichTextDrawDesigner; // hook the custom draw designer
                automationObj.editDesignerType = CustomAnnotations.AnnRichTextEditDesigner; // hook the custom edit designer
                automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;

                var annRichTextRenderer = new CustomAnnotations.AnnRichTextRenderer();
                var annRectangleRenderer = this.renderingEngine.renderers[lt.Annotations.Core.AnnObject.rectangleObjectId];

                annRichTextRenderer.locationsThumbStyle = annRectangleRenderer.locationsThumbStyle;
                annRichTextRenderer.rotateCenterThumbStyle = annRectangleRenderer.rotateCenterThumbStyle;
                annRichTextRenderer.rotateGripperThumbStyle = annRectangleRenderer.rotateGripperThumbStyle;

                this.renderingEngine.renderers[RichTextObjectId] = annRichTextRenderer;   // hook the custom renderer
                automationObj.objectTemplate = annObject;

                this.renderingEngine.renderers[RichTextObjectId] = annRichTextRenderer;   // hook the custom renderer

                annRichTextRenderer.initialize(this.renderingEngine);

                return automationObj;
            }
            private createOmrAutomationObject(annObject: lt.Annotations.Core.AnnObject): lt.Annotations.Automation.AnnAutomationObject {
                var RichOmrObjectId = -50;
                // Create the custom automation object and hook the designers
                var automationObj = new lt.Annotations.Automation.AnnAutomationObject();

                automationObj.id = RichOmrObjectId;
                automationObj.name = "Omr";
                automationObj.drawDesignerType = lt.Annotations.Designers.AnnRectangleDrawDesigner; // hook the custom draw designer
                automationObj.editDesignerType = lt.Annotations.Designers.AnnRectangleEditDesigner; // hook the custom edit designer
                automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                var annRichTextRenderer = new CustomAnnotations.AnnRichTextRenderer();
                var annRectangleRenderer = this.renderingEngine.renderers[lt.Annotations.Core.AnnObject.rectangleObjectId];
                annRichTextRenderer.locationsThumbStyle = annRectangleRenderer.locationsThumbStyle;
                //annRichTextRenderer.rotateCenterThumbStyle = annRectangleRenderer.rotateCenterThumbStyle;
                //annRichTextRenderer.rotateGripperThumbStyle = annRectangleRenderer.rotateGripperThumbStyle;

                this.renderingEngine.renderers[RichOmrObjectId] = annRichTextRenderer;   // hook the custom renderer
                automationObj.objectTemplate = annObject;
                annRichTextRenderer.initialize(this.renderingEngine);
                return automationObj;
            }

            private createTextAutomationObject(annObject: lt.Annotations.Core.AnnObject): lt.Annotations.Automation.AnnAutomationObject {
                var RichTextObjectId = -51;
                // Create the custom automation object and hook the designers
                var automationObj = new lt.Annotations.Automation.AnnAutomationObject();

                automationObj.id = RichTextObjectId;
                automationObj.name = "Rectangle";
                automationObj.drawDesignerType = lt.Annotations.Designers.AnnRectangleDrawDesigner; // hook the custom draw designer
                automationObj.editDesignerType = lt.Annotations.Designers.AnnRectangleEditDesigner; // hook the custom edit designer
                automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;

                var annRichTextRenderer = new CustomAnnotations.AnnRichTextRenderer();
                var annRectangleRenderer = this.renderingEngine.renderers[lt.Annotations.Core.AnnObject.rectangleObjectId];
                annRichTextRenderer.locationsThumbStyle = annRectangleRenderer.locationsThumbStyle;
                //annRichTextRenderer.rotateCenterThumbStyle = annRectangleRenderer.rotateCenterThumbStyle;
                //annRichTextRenderer.rotateGripperThumbStyle = annRectangleRenderer.rotateGripperThumbStyle;

                this.renderingEngine.renderers[RichTextObjectId] = annRichTextRenderer;   // hook the custom renderer
                automationObj.objectTemplate = annObject;
                annRichTextRenderer.initialize(this.renderingEngine);
                return automationObj;
            }
            private renderingEngine_LoadPicture(sender: any, e: lt.Annotations.Core.AnnLoadPictureEventArgs): void {
                this.activeAutomation.invalidate(lt.LeadRectD.empty);
            }

            // <!-- Create The Automation Control -->
            private createAutomationControl(isUseImageViewerAutomationControl) {
                var createOptions: lt.Controls.ImageViewerCreateOptions = new lt.Controls.ImageViewerCreateOptions(<HTMLDivElement>document.getElementById('imageViewerDiv'));

                if (USE_ImageViewerAutomationControl) {
                    this.imageViewer = new lt.Controls.ImageViewer(createOptions);
                    this.automationControl = new lt.Annotations.JavaScript.ImageViewerAutomationControl();
                    (<lt.Annotations.JavaScript.ImageViewerAutomationControl>this.automationControl).imageViewer = this.imageViewer;
                }
                else {
                    this.imageViewer = new lt.Annotations.JavaScript.AutomationImageViewer(createOptions);
                    this.automationControl = <lt.Annotations.JavaScript.AutomationImageViewer>this.imageViewer;
                }
                //this.automationControl.remove_automationDoubleClick();

                this.imageViewer.autoCreateCanvas = true;
                this.imageViewer.itemError.add((sender: any, e: lt.Controls.ImageViewerItemErrorEventArgs) => this.viewer_ItemError(sender, e));
                this.imageViewer.itemChanged.add((sender: any, e: lt.Controls.ImageViewerItemChangedEventArgs) => this.viewer_ItemChanged(sender, e));
                this.imageViewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
                this.imageViewer.viewVerticalAlignment = lt.Controls.ControlAlignment.center;
                this.imageViewer.autoResetOptions = lt.Controls.ImageViewerAutoResetOptions.all;

                if (lt.LTHelper.msPointerEnabled && !lt.LTHelper.supportsMouse)
                    this.imageViewer.scrollMode = lt.Controls.ControlScrollMode.hidden;
            }

            private viewer_ItemError(sender: any, e: lt.Controls.ImageViewerItemErrorEventArgs): void {
                //window.alert("Cannot open: " + this.tempUrl);
                $('img').removeClass("selected");
                var lastPageNumber: string = e.item.url.substr(e.item.url.indexOf("PageNumber"))
                $('#img_' + lastPageNumber).addClass("selected");
                this.LoadSelectedPage(Number(lastPageNumber));
                window.alert("Please try after some time.");
                this.endOperation(false);
            }

            private viewer_ItemChanged(sender: any, e: lt.Controls.ImageViewerItemChangedEventArgs): void {
                if (e.reason == lt.Controls.ImageViewerItemChangedReason.url) {
                    this.endOperation(true);

                    //create new canvas data provider for the new image
                    var canvasDataProvider = new lt.Annotations.JavaScript.CanvasDataProvider(this.imageViewer.activeItem.canvas);
                    this.automationControl.automationDataProvider = canvasDataProvider;

                    //load MedicalPack Package
                    if (!this.isMedicalPackLoaded) {
                        this.annMedicalPackPackage = new lt.Annotations.UserMedicalPack.AnnMedicalPack();
                        this.managerHelper.LoadPackage(this.annMedicalPackPackage);
                        this.isMedicalPackLoaded = true;
                    }

                    this.updateUIState();
                }
            }
            private onImageViewerResize() {
                this.imageViewer.onSizeChanged();
            }
            private onFieldMappingliClick() {
                this.generateFieldMappingHtml(this.activeAutomation.activeContainer.get_children());
            }
            private onBtnBackClick() {
                if (this.isAnyChangeInAnnotation == true) {
                    var flag = confirm("Your data might be lost, do you want to continue?")
                    if (flag == true) {
                        window.location.href = "../../Masterform/index";
                    }
                }
                else {
                    window.location.href = "../../Masterform/index";
                }
            }
            private generateFieldMappingHtml(AnnObjectCollection: lt.Annotations.Core.AnnObjectCollection) {
                var AnnObjectCount = AnnObjectCollection.count;
                var html = '';
                if (AnnObjectCount == 0) {
                    html = "<div class=\"well well-sm\"> No Fields Found !!!</div>";
                }
                else {
                    var html = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
                    for (var i = 0; i < AnnObjectCount; i++) {
                        var item: lt.Annotations.Core.AnnObject = AnnObjectCollection.get_item(i);
                        var tag = JSON.parse(item.tag);
                        var ObjectId = tag.ObjectId;
                        var className = "clsomrfield";
                        if (ObjectId == -51) {
                            className = "clstextfield";
                        }
                        //bind multiple index tag because we need to prevent event bubbling
                        //do not remove index tag
                        html += "         <div class='panel panel-default'>";
                        html += "     <div class='panel-heading " + className + "' role='tab'  index='" + i.toString() + "'  id='heading" + i.toString() + "'>";
                        html += "         <h4 class='panel-title' index='" + i.toString() + "' >";
                        html += "             <a class='collapsed IconPosition'  index='" + i.toString() + "' data-toggle='collapse' style=\"text-decoration: none;\" data-parent='#accordion' href='#collapse" + i.toString() + "' aria-expanded='false' aria-controls='collapse" + i.toString() + "'>";
                        html += "                 " + tag.Name + "";
                        html += "             </a>";
                        html += "         </h4>";
                        html += "     </div>";
                        html += "     <div id='collapse" + i.toString() + "' index='" + i.toString() + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i.toString() + "'>";
                        html += "         <div class='panel-body' id='panel-body" + i.toString() + "'>";
                        html += "            Comming Soon...";
                        html += "         </div>";
                        html += "     </div>";
                        html += " </div>";
                    }

                    html += " </div>";
                }
                $('#fieldmappingDiv').html(html);
                $('#accordion').on("show.bs.collapse", $.proxy(this.onFieldSelect, this));
                $('#accordion').on("click", $.proxy(this.onFieldClick, this));
            }

            private onFieldClick(e: JQueryEventObject) {
                var index = $(e.target).attr('index');
                var item: lt.Annotations.Core.AnnObject = this.activeAutomation.activeContainer.get_children().get_item(parseInt(index));
                this.activeAutomation.selectObject(item);
            }

            private onFieldSelect(e: JQueryEventObject) {
                $('.in').removeClass('in');
                var index = $(e.target).attr('index');
                var item: lt.Annotations.Core.AnnObject = this.activeAutomation.activeContainer.get_children().get_item(parseInt(index));
                var html = "    <ul class=\"nav nav-pills\">";
                html += "<li title=\"Field Info\" class=\"active\"><a data-toggle=\"pill\" class=\"PanelTab \" href=\"#fieldinfo" + index + "\">Field Info</a></li>";
                html += "<li title=\"OCR\"><a data-toggle=\"pill\" class=\"PanelTab \" href=\"#ocr" + index + "\">OCR</a></li>   ";
                html += "<li title=\"OMR\"><a data-toggle=\"pill\" class=\"PanelTab \" href=\"#omr" + index + "\">OMR</a></li>   ";
                html += "<li style=\"display: none;\" title=\"Table\"><a data-toggle=\"pill\" href=\"#table" + index + "\">Table</a></li> ";
                html += "</ul>";
                html += "<div class=\"tab-content\">";
                html += BindFieldInfo(index, item);
                html += BindOcrInfo(index, item);
                html += BindOmrInfo(index, item);
                html += BindTableInfo(index, item);
                $('#panel-body' + index).html(html);
                $('#ocr' + index).on("change", $.proxy(this.ocrChange, this, index));
                $('#omr' + index).on("change", $.proxy(this.omrChange, this, index));
                $('#txtName' + index).on("blur ", $.proxy(this.fieldNameblur, this, index));
            }
            private fieldNameblur(id: string, e: JQueryEventObject) {
                var item: lt.Annotations.Core.AnnObject = this.activeAutomation.activeContainer.get_children().get_item(parseInt(id));
                var fieldInfo = <FieldInfo>JSON.parse(item.tag);
                var previousValue = $.trim($(e.target).attr("prev"));
                var currentValue = $.trim($(e.target).val());
                $(e.target).val(currentValue);

                if (previousValue == currentValue) {
                    $(e.target).val(currentValue);
                    return;
                }

                if (currentValue == "" || !ValidateMasterFormName($(e.target))) {
                    $(e.target).focus();
                    $(e.target).val(currentValue);
                    return;
                }

                var FieldName = "";
                if (item.id == -50)
                    FieldName = "New OMR Field";
                else
                    FieldName = "New Text Field";

                fieldInfo.Name = currentValue;
                $(e.target).attr("prev", currentValue);

                $('#heading' + id).children().children().text(currentValue);

                var count = 0;
                var Iscount = false;
                var doubplicateValue = "";
                var n = 1
                for (var j = 0; j < n; j++) {
                    Iscount = false;
                    n += 1;
                    if (count >= 1) {
                        var customname = FieldName + (j + 1);
                        $(e.target).val(customname);
                        fieldInfo.Name = customname;
                        $(e.target).attr("prev", customname);
                        $('#heading' + id).children().children().text(customname);
                        for (var i = 0; i < this.activeAutomation.activeContainer.get_children().get_count(); i++) {
                            var test = this.activeAutomation.activeContainer.get_children().get_item(i).tag;
                            if (test != null) {
                                var fieldInfo1 = new FieldInfo();
                                fieldInfo1 = JSON.parse(test);
                                if (fieldInfo1.Name == customname) {
                                    count += 1;
                                    if (!Iscount) {
                                        Iscount = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else {

                        for (var i = 0; i < this.activeAutomation.activeContainer.get_children().get_count(); i++) {
                            var test = this.activeAutomation.activeContainer.get_children().get_item(i).tag;
                            if (test != null) {
                                var fieldInfo1 = new FieldInfo();
                                fieldInfo1 = JSON.parse(test);
                                if (fieldInfo1.Name == fieldInfo.Name) {
                                    count += 1;
                                    doubplicateValue = fieldInfo1.Name;
                                    if (!Iscount) {
                                        Iscount = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    if (!Iscount) {
                        break;
                    }
                }
                this.activeAutomation.activeContainer.get_children().get_item(parseInt(id)).set_tag(JSON.stringify(fieldInfo));

                if (count > 0) {
                    //alert(doubplicateValue + " is already exists");
                    Notify(doubplicateValue + " is already exists", null, null, 'danger');
                }

            }
            private ocrChange(id: string, e: JQueryEventObject) {
                var FieldInfo = <FieldInfo>(JSON.parse(this.activeAutomation.activeContainer.get_children().get_item(parseInt(id)).get_tag()));
                //FieldInfo.OcrFieldInfo=new 
                var ocrFieldInfo = new OcrFieldInfo();
                $("#paneltexttype" + id + " [type='radio']").each(function () {
                    if ($(this).attr("value") == "Character") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.Character = true;
                        }
                    }
                    if ($(this).attr("value") == "Numeric") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.Numeric = true;
                        }
                    }
                    if ($(this).attr("value") == "Data") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.Data = true;
                        }
                    }
                });
                $("#panelmethod" + id + " [type='checkbox']").each(function () {
                    if ($(this).attr("value") == "EnableOCR") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.EnableOCR = true;
                        }
                    }
                    if ($(this).attr("value") == "EnableICR") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.EnableICR = true;
                        }
                    }
                });
                $("#panelDropout" + id + " [type='checkbox']").each(function () {
                    if ($(this).attr("value") == "Words") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.Words = true;
                        }
                    }
                    if ($(this).attr("value") == "CellBoarders") {
                        if ($(this).is(":checked") == true) {
                            ocrFieldInfo.CellBoarders = true;
                        }
                    }
                });
                FieldInfo.OcrFieldInfo = ocrFieldInfo;
                this.activeAutomation.activeContainer.get_children().get_item(parseInt(id)).set_tag(JSON.stringify(FieldInfo));
            }
            private omrChange(id: string, e: JQueryEventObject) {
                var FieldInfo = <FieldInfo>(JSON.parse(this.activeAutomation.activeContainer.get_children().get_item(parseInt(id)).get_tag()));
                var omrFieldInfo = new OmrFieldInfo();
                $("#panelsensitivity" + id + " [type='radio']").each(function () {
                    if ($(this).attr("value") == "Lowest") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.Lowest = true;
                        }
                    }
                    if ($(this).attr("value") == "Low") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.Low = true;
                        }
                    }
                    if ($(this).attr("value") == "High") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.High = true;
                        }
                    }
                    if ($(this).attr("value") == "Highest") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.Highest = true;
                        }
                    }

                });
                $("#panelframe" + id + " [type='radio']").each(function () {
                    if ($(this).attr("value") == "Auto") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.Auto = true;
                        }
                    }
                    if ($(this).attr("value") == "WithFrame") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.WithFrame = true;
                        }
                    }
                    if ($(this).attr("value") == "WithoutFrame") {
                        if ($(this).is(":checked") == true) {
                            omrFieldInfo.WithoutFrame = true;
                        }
                    }
                });
                FieldInfo.OmrFieldInfo = omrFieldInfo;
                this.activeAutomation.activeContainer.get_children().get_item(parseInt(id)).set_tag(JSON.stringify(FieldInfo));
            }

            // <!-- Create Automation for each image -->
            private createDemoAutomations(imageNumber: number): void {
                for (var i = 0; i < imageNumber; i++) {
                    //automatically added to the automation manger automations
                    var automation: lt.Annotations.Automation.AnnAutomation = new lt.Annotations.Automation.AnnAutomation(this.automationManager, this.automationControl);

                    automation.draw.add((sender: any, e: lt.Annotations.Core.AnnDrawDesignerEventArgs) => this.automation_Draw(sender, e));
                    automation.editText.add((sender: any, e: lt.Annotations.Core.AnnEditTextEventArgs) => this.automation_EditText(sender, e));
                    automation.editContent.add((sender: any, e: lt.Annotations.Core.AnnEditContentEventArgs) => this.automation_EditContent(sender, e));
                    automation.run.add((sender: any, e: lt.Annotations.Core.AnnRunDesignerEventArgs) => this.automation_Run(sender, e));
                    automation.setCursor.add((sender: any, e: lt.Annotations.Automation.AnnCursorEventArgs) => this.automation_SetCursor(sender, e));
                    automation.restoreCursor.add((sender: any, e: lt.LeadEventArgs) => this.automation_RestoreCursor(sender, e));
                    automation.selectedObjectsChanged.add((sender: any, e: lt.LeadEventArgs) => this.automation_SelectedObjectsChanged(sender, e));
                    automation.onShowObjectProperties.add((sender: any, e: lt.Annotations.Automation.AnnAutomationEventArgs) => this.automation_OnShowObjectProperties(sender, e));

                }
            }

            private automation_OnShowObjectProperties(sender: any, e: lt.Annotations.Automation.AnnAutomationEventArgs): void {
                this.showAutomationUpdateObjectDialog(true, true, true, this.activeAutomation.currentEditObject);
            }

            private automation_Draw(sender: any, e: lt.Annotations.Core.AnnDrawDesignerEventArgs): void {

                if (e.operationStatus == lt.Annotations.Core.AnnDesignerOperationStatus.end) {

                    this.updateAnnotationsObjectsBtnsCheckedState();
                    this.onFieldMappingliClick();

                    var index = this.activeAutomation.activeContainer.get_children().indexOf(this.activeAutomation.currentEditObject);
                    $('a[data-toggle="collapse"]').addClass('collapsed');
                    $('.in').removeClass('in');
                    $('#collapse' + index.toString()).collapse('show');
                    $('#heading' + index.toString()).children().children().removeClass("collapsed");
                }
            }

            private automation_EditText(sender: any, e: lt.Annotations.Core.AnnEditTextEventArgs): void {
                var automation = this.activeAutomation;
                if (automation == null)
                    return;

                this.removeAutomationTextArea(true);

                if (e.textObject == null)
                    return;

                var imageViewer = this.imageViewer;
                this.automationTextArea = new lt.Annotations.JavaScript.AutomationTextArea(<HTMLDivElement>imageViewer.mainDiv.parentNode, automation, e, (update: boolean) => this.removeAutomationTextArea(update));

                e.cancel;
            }

            private automation_EditContent(sender: any, e: lt.Annotations.Core.AnnEditContentEventArgs): void {
                var automation = this.activeAutomation;
                if (automation == null)
                    return;

                if (e.targetObject == null)
                    return;


                if (e.targetObject.tag != null) {
                    return;
                }
                var FieldName = "";
                if (e.targetObject.id == -50)
                    FieldName = "New OMR Field";
                else
                    FieldName = "New Text Field";


                var fieldInfo = new FieldInfo();
                fieldInfo.Name = "NewField" + this._newFieldCounter.toString();
                fieldInfo.ObjectId = e.targetObject.id;
                var count = 0;
                var Iscount = false;
                var n = 1
                for (var j = 0; j < n; j++) {
                    Iscount = false;
                    n += 1;
                    fieldInfo.Name = FieldName + (j + 1);

                    for (var i = 0; i < this.activeAutomation.activeContainer.get_children().get_count(); i++) {
                        var test = this.activeAutomation.activeContainer.get_children().get_item(i).tag;
                        if (test != null) {
                            var fieldInfo1 = new FieldInfo();
                            fieldInfo1 = JSON.parse(test);
                            if (fieldInfo1.Name == fieldInfo.Name) {
                                count += 1;
                                if (!Iscount) {
                                    Iscount = true;
                                    break;
                                }

                                fieldInfo.Name = FieldName + (i + 1);
                            }

                        }
                    }

                    if (!Iscount) {
                        break;
                    }

                }

                if (e.targetObject.id == -50) {
                    fieldInfo.OmrFieldInfo.Auto = true;
                    fieldInfo.OmrFieldInfo.High = false;
                    fieldInfo.OmrFieldInfo.Highest = true;
                    fieldInfo.OmrFieldInfo.Low = false;
                    fieldInfo.OmrFieldInfo.Lowest = false;
                    fieldInfo.OmrFieldInfo.WithFrame = false;
                    fieldInfo.OmrFieldInfo.WithoutFrame = false;
                }
                if (e.targetObject.id == -51) {
                    fieldInfo.OcrFieldInfo.CellBoarders = false;
                    fieldInfo.OcrFieldInfo.Character = true;
                    fieldInfo.OcrFieldInfo.Data = false;
                    fieldInfo.OcrFieldInfo.EnableICR = false;
                    fieldInfo.OcrFieldInfo.EnableOCR = true;
                    fieldInfo.OcrFieldInfo.Numeric = false;
                    fieldInfo.OcrFieldInfo.Words = false;
                }
                e.targetObject.set_tag(JSON.stringify(fieldInfo));
                $('#contentTextArea').focus();
                if (e.targetObject.id == -200) {
                    (<any>$('#txtReactangle')).jqteVal((<CustomAnnotations.AnnRichTextObject>e.targetObject).RichTextString);

                    this.isDialogOpen = true;
                    $("#richTextEditorDialog").modal();
                    return;
                }

                if (!e.targetObject.supportsContent || (<any>lt.Annotations.Core.AnnSelectionObject).isInstanceOfType(e.targetObject))
                    return;

                if ((<any>lt.Annotations.Designers.AnnDrawDesigner).isInstanceOfType(sender) && e.targetObject.id != lt.Annotations.Core.AnnObject.stickyNoteObjectId && e.targetObject.id != -51 && e.targetObject.id != -50)
                    return;
                this.showAutomationUpdateObjectDialog(false, false, true, e.targetObject);

            }

            private removeAutomationTextArea(update: boolean): void {
                if (this.automationTextArea == null)
                    return;

                this.automationTextArea.remove(update);
                this.automationTextArea = null;
            }

            private automation_Run(sender: any, e: lt.Annotations.Core.AnnRunDesignerEventArgs): void {
                if (e.operationStatus == lt.Annotations.Core.AnnDesignerOperationStatus.start) {
                    var hyperlink: string = e.object.hyperlink;

                    var id = e.object.id;

                    if (id == lt.Annotations.Core.AnnObject.textRollupObjectId)
                        return;

                    if (id == lt.Annotations.Core.AnnObject.mediaObjectId) {
                        var mediaObject = <lt.Annotations.Core.AnnMediaObject>e.object;
                        this.mediaPlayerDialog.show(mediaObject.media.source1, mediaObject.media.source2, mediaObject.media.source3);
                    }
                    else if (id == lt.Annotations.Core.AnnObject.audioObjectId) {
                        var audioObject = <lt.Annotations.Core.AnnAudioObject>e.object;
                        this.audioPlayerDialog.show(audioObject.media.source1, audioObject.media.source2, audioObject.media.source3);
                    }

                    else if (!isNullOrEmptyString(hyperlink)) {
                        var oWin = null;

                        var strings = hyperlink.split("//");
                        if (strings != null && strings.length < 2) {
                            hyperlink = "http://" + hyperlink;
                        }
                        if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer) {
                            oWin = window.open("");
                            oWin.navigate(hyperlink);
                        }
                        else {
                            oWin = window.open(hyperlink);
                        }

                        if (oWin == null || typeof oWin == 'undefined') {
                            alert('Your Popup Blocker has blocked opening this hyperlink. Disable the Popup Blocker for this web site and try again.');
                        }
                    }
                }
            }

            private automation_SetCursor(sender: any, e: lt.Annotations.Automation.AnnCursorEventArgs): void {
                // If there's an interactive mode working and its not automation, then don't do anything
                var imageViewer = this.imageViewer;
                if (imageViewer.workingInteractiveMode != null && imageViewer.workingInteractiveMode != this.automationInteractiveMode)
                    return;

                var automation = <lt.Annotations.Automation.AnnAutomation>sender;
                var newCursor: any = null;

                switch (e.designerType) {
                    case lt.Annotations.Automation.AnnDesignerType.draw:
                        {
                            var allow = true;

                            var drawDesigner = <lt.Annotations.Designers.AnnDrawDesigner>automation.currentDesigner;
                            if (drawDesigner != null && !drawDesigner.isTargetObjectAdded && e.pointerEvent != null) {
                                // See if we can draw or not
                                var container = automation.activeContainer;

                                allow = false;

                                if (automation.hitTestContainer(e.pointerEvent.location, false) != null)
                                    allow = true;
                            }

                            if (allow) {
                                var annAutomationObject = automation.manager.findObjectById(e.id);
                                if (annAutomationObject != null)
                                    newCursor = annAutomationObject.drawCursor;
                            }
                            else {
                                newCursor = "not-allowed";
                            }
                        }
                        break;

                    case lt.Annotations.Automation.AnnDesignerType.edit:
                        if (e.isRotateCenter)
                            newCursor = this.managerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.rotateCenterControlPoint];
                        else if (e.isRotateGripper)
                            newCursor = this.managerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.rotateGripperControlPoint];
                        else if (e.thumbIndex < 0) {
                            if (e.dragDropEvent != null && !e.dragDropEvent.allowed)
                                newCursor = "not-allowed";
                            else
                                newCursor = this.managerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.selectedObject];
                        }
                        else {
                            newCursor = this.managerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.controlPoint];
                        }
                        break;

                    case lt.Annotations.Automation.AnnDesignerType.run:
                        newCursor = this.managerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.run];
                        break;

                    default:
                        newCursor = this.managerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.selectObject];
                        break;
                }

                if (imageViewer.foreCanvas.style.cursor != newCursor)
                    imageViewer.foreCanvas.style.cursor = newCursor;

            }

            private automation_RestoreCursor(sender: any, e: lt.LeadEventArgs): void {
                var imageViewer = this.imageViewer;
                var cursor = "default";
                var interactiveModeCursor = null;

                // See if we have an interactive mode, use its cursor

                // Is any working?
                if (imageViewer.workingInteractiveMode != null) {
                    interactiveModeCursor = imageViewer.workingInteractiveMode.workingCursor;
                }
                // is any hit-testing?
                else if (imageViewer.hitTestStateInteractiveMode != null) {
                    interactiveModeCursor = imageViewer.hitTestStateInteractiveMode.hitTestStateCursor;
                }
                // is any idle?
                else if (imageViewer.idleInteractiveMode != null) {
                    interactiveModeCursor = imageViewer.idleInteractiveMode.idleCursor;
                }

                if (interactiveModeCursor != null)
                    cursor = interactiveModeCursor;

                if (imageViewer != null && imageViewer.foreCanvas.style.cursor != cursor) {
                    imageViewer.foreCanvas.style.cursor = cursor;
                }
            }

            private automation_SelectedObjectsChanged(sender, e) {

                this.isAnyChangeInAnnotation = true;
                this.updateUIState();
                if (this.activeAutomation.currentEditObject != null) {
                    var index = this.activeAutomation.activeContainer.get_children().indexOf(this.activeAutomation.currentEditObject);
                    $('#txtName' + index.toString()).blur();
                    $('a[data-toggle="collapse"]').addClass('collapsed');
                    $('.in').removeClass('in');
                    $('#collapse' + index.toString()).collapse('show');
                    $('#heading' + index.toString()).children().children().removeClass("collapsed");
                }
            }

            // <!-- Initialize Viewer Interactive Modes -->
            private initInteractiveModes(): void {
                this.automationInteractiveMode = new lt.Annotations.JavaScript.AutomationInteractiveMode();
                this.automationInteractiveMode.automationControl = this.automationControl;

                this.rightClickInteractiveMode = new lt.Annotations.JavaScript.RightClickInteractiveMode();
                this.rightClickInteractiveMode.onRightClick = (x: number, y: number) => this.rightClick_ContextMenu(x, y);
                this.rightClickInteractiveMode.mouseButtons = lt.Controls.MouseButtons.right;

                this.panZoomInteractiveMode = new lt.Controls.ImageViewerPanZoomInteractiveMode()

                var modes: lt.Controls.ImageViewerInteractiveMode[] =
                    [
                        this.automationInteractiveMode,
                        this.panZoomInteractiveMode,
                        this.rightClickInteractiveMode
                    ];

                this.imageViewer.interactiveModes.beginUpdate();

                for (var i = 0; i < modes.length; i++) {
                    var mode = modes[i];

                    mode.isEnabled = false;

                    this.imageViewer.interactiveModes.add(mode);
                }

                this.automationInteractiveMode.isEnabled = true;
                this.rightClickInteractiveMode.isEnabled = true;
                this.imageViewer.interactiveModes.endUpdate();
            }

            private rightClick_ContextMenu(x: number, y: number): void {
                // get the automation object and select the object under the current pointer position
                var automation = this.activeAutomation;
                var automationControl = automation.automationControl;

                var container = automation.container;
                var point = lt.LeadPointD.create(x, y);
                point = container.mapper.pointToContainerCoordinates(point);
                var objects = container.hitTestPoint(point); // perform the hit test
                if (objects != null && objects.length > 0) { // if we hit an object, select it and then show the properties
                    if (automation.currentEditObject == null) {
                        var targetObject = objects[objects.length - 1];
                        automation.selectObject(targetObject);
                    }
                    automationControl.automationInvalidate(lt.LeadRectD.empty);

                    if (automation.canShowProperties)
                        automation.showObjectProperties();
                }
            }

            public beginOperation(processText: string): void {
                this.loadingDlg.show(processText);
            }

            public endOperation(imageChanged: boolean): void {
                this.loadingDlg.hide();

                if (imageChanged) {
                    var fileSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("fileSelect");
                    this.activeAutomation = this.automationManager.automations.item(fileSelect.selectedIndex);
                    this.activeAutomation.active = true;

                    //Set rightclick inertactive mode automation 
                    this.rightClickInteractiveMode.automation = this.activeAutomation;

                    this.currentImageUrl = this.tempUrl;
                    this.imageViewer.beginUpdate();

                    //Set viewer image resolution to be talken on consideration when setting container size
                    var resolution: lt.LeadSizeD = lt.LeadSizeD.create(this.imageDPI == 0 ? 96 : this.imageDPI, this.imageDPI == 0 ? 96 : this.imageDPI);
                    this.imageViewer.imageResolution = resolution;

                    // Update the container size
                    var container = this.activeAutomation.activeContainer;

                    //before we set the container size , we should have Identity transform for the container mapper
                    container.mapper.updateTransform(lt.LeadMatrix.identity);

                    container.size = container.mapper.sizeToContainerCoordinates(lt.LeadSizeD.create(this.imageViewer.activeItem.imageSize.width, this.imageViewer.activeItem.imageSize.height));

                    //Set viewer image resolution to the loaded image resolution
                    this.imageViewer.imageResolution = resolution;
                    this.imageViewer.useDpi = (this.imageDPI != 0);

                    if (lt.LTHelper.device == lt.LTDevice.mobile || lt.LTHelper.device == lt.LTDevice.tablet) {
                        // Default on tablet and mobile is to fit width
                        this.imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, this.imageViewer.defaultZoomOrigin);
                    }

                    this.imageViewer.endUpdate();
                }

                this.tempUrl = "";
            }

            // <!-- UI Event Handlers -->
            private openBtn_Click(e: JQueryEventObject): void {
                this.openFileDlg.show();
            }

            private saveImageBtn_Click(e: JQueryEventObject): void {
                var backCanvas: HTMLCanvasElement = this.imageViewer.canvas;
                // Check if the viewer has a back canvas
                if (backCanvas == null) {
                    // if no , create one and draw the image on it
                    var imageWidth: number = this.imageViewer.imageSize.width;
                    var imageHeight: number = this.imageViewer.imageSize.height;

                    backCanvas = document.createElement("canvas");
                    backCanvas.width = imageWidth;
                    backCanvas.height = imageHeight;

                    var context: CanvasRenderingContext2D = backCanvas.getContext("2d");
                    context.drawImage(this.imageViewer.image, 0, 0, imageWidth, imageHeight);
                    context = null;
                }

                var dataUrl: string = backCanvas.toDataURL("image/png");
                var saveWindow: Window = window.open("");
                // is the save window opened
                if (saveWindow) {
                    saveWindow.document.write("<img src='" + dataUrl + "' alt='Viewer Does Not Contain Image'/>");
                }
                else {
                    window.alert("Your Popup Blocker has blocked saving the image. Disable the Popup Blocker for this web site and try again.");
                }

                if (this.imageViewer.canvas != null)
                    backCanvas = null;
            }

            private loadAnnotationsBtn_Click(e: JQueryEventObject): void {
                this.loadSaveHelper.automation = this.activeAutomation;
                this.loadSaveHelper.imageViewer = this.imageViewer
                this.loadSaveHelper.loadAnnotations(this._currentPageNumber);
            }


            private saveAnnotationsBtn_Click(e: JQueryEventObject): void {
                this.loadingDlg.show("Saving Annotation");
                this.loadSaveHelper.automation = this.activeAutomation;
                this.loadSaveHelper.imageViewer = this.imageViewer
                this.loadSaveHelper.saveAnnotations(this._currentPageNumber);
                this.isAnyChangeInAnnotation = false;
                this.loadingDlg.hide();
            }

            private deletePageBtn_Click(e: JQueryEventObject): void {
                if (this._currentPageNumber != 0) {
                    var c = confirm("Are you sure you want to delete page?");
                    if (c == false) {
                        return;
                    }
                    this.beginOperation("Deleting page...");
                    this.loadSaveHelper.automation = this.activeAutomation;
                    //this.loadSaveHelper.imageViewer = this.imageViewer
                    this.loadSaveHelper.DeletePage(this._currentPageNumber, document.getElementById('hdnKey').attributes["value"].value);
                }
                else {
                    alert("Please add pages to master form set first.")
                }
            }
            private loadBatesStampBtn_Click(e: JQueryEventObject): void {
                this.loadSaveHelper.automation = this.activeAutomation;
                this.loadSaveHelper.imageViewer = this.imageViewer
                this.loadSaveHelper.loadBatesStampAnnotations();
            }

            private undoBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation != null && this.activeAutomation.canUndo && this.activeAutomation.manager.userMode === lt.Annotations.Core.AnnUserMode.design) {
                    this.activeAutomation.undo();
                    this.updateUIState();
                }
            }

            private redoBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation != null && this.activeAutomation.canRedo && this.activeAutomation.manager.userMode === lt.Annotations.Core.AnnUserMode.design) {
                    this.activeAutomation.redo();
                    this.updateUIState();
                }
            }

            private deleteAnnotationBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canDeleteObjects) {
                    this.activeAutomation.deleteSelectedObjects();
                    this.removeAutomationTextArea(false);
                    this.isAnyChangeInAnnotation = true;
                    this.onFieldMappingliClick();
                }
            }


            private duplicateBtn_Click(e: JQueryEventObject): void {
                var newObjects = new lt.Annotations.Core.AnnObjectCollection();

                if (this.activeAutomation.currentEditObject instanceof lt.Annotations.Core.AnnSelectionObject) {
                    var selectionObject = <lt.Annotations.Core.AnnSelectionObject>this.activeAutomation.currentEditObject;

                    // clone the objects into a new list
                    for (var i = 0; i < selectionObject.selectedObjects.count; i++) {

                        var x = selectionObject.selectedObjects.item(i);
                        newObjects.add(selectionObject.selectedObjects.item(i).clone());
                    }
                }
                else {
                    newObjects.add(this.activeAutomation.currentEditObject.clone());
                }

                // if needed, one undo operation for this
                this.activeAutomation.beginUndo();

                // Add them to the container through automation
                for (var i = 0; i < newObjects.count; i++) {
                    this.activeAutomation.activeContainer.children.add(newObjects.item(i));
                }

                this.activeAutomation.endUndo();

                // and you can unselect the old objects
                this.activeAutomation.selectObjects(null);

                // and select the new ones
                this.activeAutomation.selectObjects(newObjects);
            }

            private lockObjectBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canLock) {
                    this.passwordDialog.show(true);
                    this.passwordDialog.OkClick = () => {
                        this.activeAutomation.currentEditObject.lock(this.passwordDialog.password);
                        this.activeAutomation.invalidate(lt.LeadRectD.empty);
                        this.updateUIState();
                    };
                }
            }

            private unlockObjectBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canUnlock) {
                    this.passwordDialog.show(false);
                    this.passwordDialog.OkClick = () => {
                        this.activeAutomation.currentEditObject.unlock(this.passwordDialog.password);
                        if (this.activeAutomation.currentEditObject.isLocked)
                            window.alert("Invalid password");
                        this.activeAutomation.invalidate(lt.LeadRectD.empty);
                        this.updateUIState();
                    };
                }
            }

            private annotationsPropertiesBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canShowProperties)
                    this.activeAutomation.showObjectProperties();
                else {
                    this.snapToGridPropertiesDialog.automation = this.activeAutomation;
                    this.snapToGridPropertiesDialog.show();
                }
            }

            private objectsAlignmentOptionsBtn_Click(e: JQueryEventObject): void {
                this.objectsAlignmentDialog.automation = this.activeAutomation;
                this.objectsAlignmentDialog.show();
            }

            private applyEncryptorBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canApplyEncryptor) {
                    this.activeAutomation.applyEncryptor();
                    this.activeAutomation.invalidateObject(this.activeAutomation.currentEditObject);
                }
                this.updateUIState();
            }

            private applyDecryptorBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canApplyDecryptor) {
                    this.activeAutomation.applyDecryptor();
                    this.activeAutomation.invalidateObject(this.activeAutomation.currentEditObject);
                }
                this.updateUIState();
            }

            private realizeRedactBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canRealizeRedaction) {
                    this.activeAutomation.realizeRedaction();
                }
                this.updateUIState();
            }

            private restoreRedactBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation.canRestoreRedaction) {
                    this.activeAutomation.restoreRedaction();
                }
                this.updateUIState();
            }

            private burnAnnotationsBtn_Click(e: JQueryEventObject): void {
                var imageCanvas: HTMLCanvasElement = this.imageViewer.activeItem.canvas;
                var context = imageCanvas.getContext('2d');

                var renderingEngine: lt.Annotations.Rendering.AnnHtml5RenderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                renderingEngine.resources = this.automationManager.resources;
                renderingEngine.renderers = this.renderingEngine.renderers;
                renderingEngine.attach(this.activeAutomation.container, context);

                if (renderingEngine != null) {
                    var imageRes = this.imageViewer.imageResolution;
                    renderingEngine.burnToRectWithDpi(lt.LeadRectD.empty, imageRes.width, imageRes.height, imageRes.width, imageRes.height);
                }
                this.automationControl.automationInvalidate(lt.LeadRectD.empty);
            }

            private runUserModeBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation) {
                    this.activeAutomation.manager.userMode = lt.Annotations.Core.AnnUserMode.run;
                }
                this.updateUIState();
            }

            private designUserModeBtn_Click(e: JQueryEventObject): void {
                if (this.activeAutomation) {
                    this.activeAutomation.manager.userMode = lt.Annotations.Core.AnnUserMode.design;
                }
                this.updateUIState();
            }

            private aboutBtn_Click(e: JQueryEventObject): void {
                this.aboutDlg.show();
            }

            private documentAnnotationsBtn_BtnClicked(e: JQueryEventObject): void {
                this.documentPackDialog.show();
            }

            private documentPackDialog_Hide(objectID: number): void {
                this.setCurrentObjectId(objectID);
            }

            private medicalAnnotationsBtn_BtnClicked(e: JQueryEventObject): void {
                this.medicalPackDialog.show();
            }

            private zoomIn_BtnClicked(e: JQueryEventObject) {
                var scaleFactorPer = this.imageViewer.scaleFactor * 100;
                if (scaleFactorPer < 1000) {
                    this.imageViewer.zoom(lt.Controls.ControlSizeMode.none, (this.imageViewer.scaleFactor + 0.1), this.imageViewer.defaultZoomOrigin);
                }
            }

            private zoomOut_BtnClicked(e: JQueryEventObject) {
                var scaleFactorPer = this.imageViewer.scaleFactor * 100;
                if (scaleFactorPer > 11) {
                    this.imageViewer.zoom(lt.Controls.ControlSizeMode.none, (this.imageViewer.scaleFactor - 0.1), this.imageViewer.defaultZoomOrigin);
                }
            }

            private fit_BtnClicked(e: JQueryEventObject) {
                this.imageViewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1.0, this.imageViewer.defaultZoomOrigin);
            }

            private fitWidth_BtnClicked(e: JQueryEventObject) {
                this.imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1.0, this.imageViewer.defaultZoomOrigin);
            }

            private actualSize_BtnClicked(e: JQueryEventObject) {
                this.imageViewer.zoom(lt.Controls.ControlSizeMode.actualSize, 1.0, this.imageViewer.defaultZoomOrigin);
            }

            private onFileClick(e: JQueryEventObject) {
                var flag = false;
                if (this.isAnyChangeInAnnotation == true) {
                    flag = confirm("Your data might be lost, do you want to continue?")
                    if (flag == false) {
                        e.preventDefault();
                    }
                }
            }
            private medicalPackDialog_Hide(objectID: number): void {
                this.setCurrentObjectId(objectID);
            }

            private snapToGridPropertiesDialog_Hide(): void {
                this.automationControl.automationInvalidate(lt.LeadRectD.empty);
            }

            private objectsAlignmentDialog_Hide(actionId: number): void {
                switch (actionId) {
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.ToLeftActionId:
                        this.activeAutomation.alignLefts();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.ToCenterActionId:
                        this.activeAutomation.alignCenters();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.ToRightActionId:
                        this.activeAutomation.alignRights();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.ToTopActionId:
                        this.activeAutomation.alignTops();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.ToMiddleActionId:
                        this.activeAutomation.alignMiddles();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.ToBottomActionId:
                        this.activeAutomation.alignBottoms();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.SameWidthtActionId:
                        this.activeAutomation.makeSameWidth();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.SameHeightActionId:
                        this.activeAutomation.makeSameHeight();
                        break;
                    case lt.Annotations.JavaScript.ObjectsAlignmentDialog.SameSizeActionId:
                        this.activeAutomation.makeSameSize();
                        break;
                }

                this.automationControl.automationInvalidate(lt.LeadRectD.empty);
            }

            private updateUIState(): void {
                if (this.activeAutomation == null)
                    return;

                var userMode = this.activeAutomation.manager.userMode;
                if (userMode == lt.Annotations.Core.AnnUserMode.run) {
                    $("#openFile").prop("disabled", true);
                    $("#saveImage").prop("disabled", true);
                    $("#loadAnnotations").prop("disabled", true);
                    $("#saveAnnotations").prop("disabled", true);
                    $("#loadBatesStamp").prop("disabled", true);
                    $("#undo").prop("disabled", true);
                    $("#redo").prop("disabled", true);
                    $("#deleteAnnotation").prop("disabled", true);
                    $("#lockObject").prop("disabled", true);
                    $("#unlockObject").prop("disabled", true);
                    $("#applyEncryptor").prop("disabled", true);
                    $("#applyDecryptor").prop("disabled", true);
                    $("#realizeRedact").prop("disabled", true);
                    $("#restoreRedact").prop("disabled", true);
                    $("#annotationsProperties").prop("disabled", true);
                    $("#burnAnnotations").prop("disabled", true);
                    $("#runUserMode").prop("disabled", true);
                    $("#designUserMode").prop("disabled", false);

                    $('.annotationObjectBtn').prop("disabled", true);
                    $('.interactiveModesBtns').prop("disabled", true);
                    $('#documentAnnotations').prop("disabled", true);
                    $('#medicalAnnotations').prop("disabled", true);
                }
                if (userMode == lt.Annotations.Core.AnnUserMode.design) {
                    //Set Open Save and load Buttons State
                    $("#openFile").prop("disabled", false);
                    $("#saveImage").prop("disabled", false);
                    $("#loadAnnotations").prop("disabled", false);
                    $("#saveAnnotations").prop("disabled", false);
                    $("#loadBatesStamp").prop("disabled", false);
                    //Set Uedo Button State
                    if (this.activeAutomation.canUndo)
                        $("#undo").prop("disabled", false);
                    else
                        $("#undo").prop("disabled", true);
                    //Set Redo Button State
                    if (this.activeAutomation.canRedo)
                        $("#redo").prop("disabled", false);
                    else
                        $("#redo").prop("disabled", true);
                    //Set Delete Button State
                    if (this.activeAutomation.canDeleteObjects)
                        $("#deleteAnnotation").prop("disabled", false);
                    else
                        $("#deleteAnnotation").prop("disabled", true);
                    //Set lock Button State
                    if (this.activeAutomation.canLock)
                        $("#lockObject").prop("disabled", false);
                    else
                        $("#lockObject").prop("disabled", true);
                    //Set Unlock Button State
                    if (this.activeAutomation.canUnlock)
                        $("#unlockObject").prop("disabled", false);
                    else
                        $("#unlockObject").prop("disabled", true);
                    //Set Apply Encryptor Button State
                    if (this.activeAutomation.canApplyEncryptor)
                        $("#applyEncryptor").prop("disabled", false);
                    else
                        $("#applyEncryptor").prop("disabled", true);
                    //Set Apply Decryptor Button State
                    if (this.activeAutomation.canApplyDecryptor)
                        $("#applyDecryptor").prop("disabled", false);
                    else
                        $("#applyDecryptor").prop("disabled", true);
                    //Set Apply Realize Redact Button State
                    if (this.activeAutomation.canRealizeRedaction)
                        $("#realizeRedact").prop("disabled", false);
                    else
                        $("#realizeRedact").prop("disabled", true);
                    //Set Apply Restore Redact Button State
                    if (this.activeAutomation.canRestoreRedaction)
                        $("#restoreRedact").prop("disabled", false);
                    else
                        $("#restoreRedact").prop("disabled", true);
                    //Set Annotations Properties and duplicate Button State
                    $("#annotationsProperties").prop("disabled", false);
                    $("#duplicate").prop("disabled", true);
                    var editObject = this.activeAutomation.currentEditObject;
                    if (editObject != null) {
                        $("#duplicate").prop("disabled", false);
                    }
                    //Set Burn Button State
                    if (this.activeAutomation.activeContainer.children.count != 0)
                        $("#burnAnnotations").prop("disabled", false);
                    else
                        $("#burnAnnotations").prop("disabled", true);
                    //Set Run User Mode Button State
                    $("#runUserMode").prop("disabled", false);
                    //Set Design User Mode Button State
                    $("#designUserMode").prop("disabled", true);

                    $('.annotationObjectBtn').prop("disabled", false);
                    $('.interactiveModesBtns').prop("disabled", false);
                    $('#documentAnnotations').prop("disabled", false);
                    $('#medicalAnnotations').prop("disabled", false);
                }
            }

            private annotationsObjectsBtns_BtnClicked(e: JQueryEventObject): void {
                var objectIndex: number = parseInt($(e.currentTarget).val());

                this.setCurrentObjectId(objectIndex);
            }

            private setCurrentObjectId(id: number): void {
                this.imageViewer.interactiveModes.beginUpdate();
                for (var i = 0; i < this.imageViewer.interactiveModes.count; i++) {
                    this.imageViewer.interactiveModes.item(i).isEnabled = false;
                }

                if (id == 0) {
                    this.panZoomInteractiveMode.isEnabled = true;
                }
                else {
                    this.automationInteractiveMode.isEnabled = true;
                    //vipul
                    this.rightClickInteractiveMode.isEnabled = false;
                    //vipul
                    this.automationManager.currentObjectId = id;
                }
                this.imageViewer.interactiveModes.endUpdate();

                this.updateAnnotationsObjectsBtnsCheckedState();
            }

            private updateAnnotationsObjectsBtnsCheckedState(): void {
                var manager = this.automationManager;
                if (manager == null)
                    return;

                var currentObjectId = manager.currentObjectId;
                var btns = $(".annotationObjectBtn");

                //Check if the pan zoom interactive mode Active
                if (this.panZoomInteractiveMode.isEnabled) {
                    currentObjectId = 1;
                    Utils.DemoHelper.checked($("#panZoom"), true);
                }
                else {
                    Utils.DemoHelper.checked($("#panZoom"), false);
                }

                btns.each(function () {
                    // "this" here is for current JQuery element (i.e current Annotations Object Button)
                    if ($(this).val() != null) {
                        var buttonObjectId = parseInt($(this).val());

                        if (buttonObjectId == lt.Annotations.Core.AnnObject.selectObjectId)
                            Utils.DemoHelper.checked($(this), (buttonObjectId == currentObjectId || currentObjectId == lt.Annotations.Core.AnnObject.none));
                        else
                            Utils.DemoHelper.checked($(this), (buttonObjectId == currentObjectId));
                    }
                });
            }

            private showAutomationUpdateObjectDialog(showProperties: boolean, showReviews: boolean, showContent: boolean, targetObject: lt.Annotations.Core.AnnObject): void {

                var isSelectionObject: boolean = targetObject instanceof lt.Annotations.Core.AnnSelectionObject;

                this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Properties, showProperties);
                this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Content, showContent);
                this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Reviews, showReviews);

                if (!targetObject.supportsContent || isSelectionObject) {
                    this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Content, false);
                    if (isSelectionObject) {
                        this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Reviews, false);
                    }
                }


                this.automationUpdateObjectDialog.automation = this.activeAutomation;
                this.automationUpdateObjectDialog.targetObject = targetObject;

                //this.isDialogOpen = true;
                //this.automationUpdateObjectDialog.show();
            }

            private automationUpdateObjectDialog_Hide() {

                var Iscontinue = true;
                var dataSingleValue = this.activeAutomation.currentEditObject.metadata["Content"];
                //this changes done for crome it is not support some properties
                var currentAnnTextObjectUniqueNumber = this.activeAutomation.activeContainer.get_children().indexOf(this.activeAutomation.currentEditObject);

                if (isNUllOrEmptyString(dataSingleValue.trim())) {
                    $('#span_Annotations').text("Please enter field name");
                    this.ModalValidate();
                    return;
                }
                for (var i = 0; i < this.activeAutomation.activeContainer.children.count; i++) {

                    var Arrayvalue: { [key: string]: string } = this.activeAutomation.container.get_children().toArray()[i].get_metadata();
                    var data = Arrayvalue["Content"].toString();
                    var dataList = this.activeAutomation.container.get_children().toArray()[i].get_metadata()["Content"];
                    if (i == currentAnnTextObjectUniqueNumber) {
                        continue;
                    }
                    if (dataList.toString().trim() == dataSingleValue.toString().trim()) {

                        this.ModalValidate();
                        $('#span_Annotations').text("Field name is already exists! please enter unique field name");
                        Iscontinue = false;
                        break;

                    }
                    $('#span_Annotations').text("");

                }

                if (Iscontinue) {
                    this.isDialogOpen = false;
                    this.updateUIState();
                    this.onFieldMappingliClick();
                }
            }


            private ModalValidate() {
                this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Properties, false);
                this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Content, true);
                this.automationUpdateObjectDialog.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Reviews, false);
                this.automationUpdateObjectDialog.show();
            }
        }
    }
}

//Main Initialize Function
window.onload = () => {
    document.oncontextmenu = function () { return false; }; // disable the default context menu
    HTML5Demos.AnnotationsDemo.AnnotationsDemoApp.prototype.run();
}


function isNullOrEmptyString(str: string): boolean {
    return (str == "" || str == null);
}
function BindFieldInfo(id: string, item: lt.Annotations.Core.AnnObject): string {
    var fieldInfo = <FieldInfo>JSON.parse(item.tag);
    var html = "";
    html += "<div id=\"fieldinfo" + id + "\" class=\"tab-pane fade in active\">";
    //    <div class="form-group row" style="
    //    margin-bottom: 6px;
    //">
    //    <label class="control-label col-sm-3" for="email">Email:</label>
    //    <div class="col-sm-9">
    //      <input type="email" class="form-control input-sm" id="email" placeholder="Enter email">
    //    </div>
    //  </div>
    html += " <form class=\"form-horizontal\">";
    html += "        <div class=\"form-group row\">";
    html += "            <label class=\"control-label col-sm-3\" for=\"Name\">Name:</label>";
    html += "      <div class=\"col-sm-9\">      <input maxlength='100' class='textbox' type='text' id='txtName" + id.toString() + "' name='name' prev='" + fieldInfo.Name + "' value='" + fieldInfo.Name + "' /></div>";
    html += "        </div>";

    html += "       <div class=\"form-group row\">";
    html += "            <label class=\"control-label col-sm-3\" for=\"Type\">Type:</label>";
    html += "             <div class=\"col-sm-9\">     <select class=' dropdownlist' id='sel1' disabled>";
    if (item.id == -50) {
        html += "   <option>Text</option>";
        html += "   <option selected>Omr</option>";
    }
    else {
        html += "   <option selected>Text</option>";
        html += "   <option>Omr</option>";
    }

    html += "   <option>Barcode</option>";
    html += "   <option>Image</option>";
    html += "   <option>Table</option>";
    html += "   <option>UnStructured Text</option>";
    html += " </select>";
    html += "        </div></div>";

    html += "       <div class=\"form-group row\">";
    html += "            <label class=\"control-label col-sm-3\" for=\"Top\">Top:</label>";
    html += "        <div class=\"col-sm-9\">       <input class='textbox' type='text' name='Top' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.x, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled />";
    html += "       </div>  </div>";


    html += "        <div class=\"form-group row\">";
    html += "            <label class=\"control-label col-sm-3\"  for=\"Left\">Left:</label>";
    html += "         <div class=\"col-sm-9\">    <input class='textbox' type='text' name='Left' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.y, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled/>";
    html += "      </div>   </div>";



    html += "         <div class=\"form-group row\">";
    html += "            <label class=\"control-label col-sm-3\"  for=\"Height\">Height:</label>";
    html += "          <div class=\"col-sm-9\">     <input class='textbox' type='text' name='Height' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.height, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled/>";
    html += "        </div> </div>";



    html += "       <div class=\"form-group row\">";
    html += "            <label class=\"control-label col-sm-3\"  for=\"Width\">Width:</label>";
    html += "      <div class=\"col-sm-9\">        <input class='textbox' type='text' name='Width' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.width, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled/>";
    html += "        </div> </div>";


    html += "    </form>";

    //html += "      <tr>";
    //html += "          <td>Name</td>";
    //html += "          <td><input maxlength='100' class='form-control input-sm' type='text' id='txtName" + id.toString() + "' name='name' prev='" + fieldInfo.Name + "' value='" + fieldInfo.Name + "' /></td>";
    //html += "      </tr>";
    //html += "      <tr>";
    //html += "          <td>Type</td>";
    //html += "          <td>";
    //html += "               <select class='form-control' id='sel1' disabled>";
    //if (item.id == -50) {
    //    html += "   <option>Text</option>";
    //    html += "   <option selected>Omr</option>";
    //}
    //else {
    //    html += "   <option selected>Text</option>";
    //    html += "   <option>Omr</option>";
    //}

    //html += "   <option>Barcode</option>";
    //html += "   <option>Image</option>";
    //html += "   <option>Table</option>";
    //html += "   <option>UnStructured Text</option>";
    //html += " </select>";
    //html += "       </td>";
    //html += "      </tr>";
    //html += "      <tr>";
    //html += "          <td>Top</td>";
    //html += "          <td><input class='form-control input-sm' type='text' name='name' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.x, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled /></td>";
    //html += "      </tr>";
    //html += "      <tr>";
    //html += "          <td>left</td>";
    //html += "          <td><input class='form-control input-sm' type='text' name='name' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.y, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled/></td>";
    //html += "      </tr>";
    //html += "      <tr>";
    //html += "          <td>Height</td>";
    //html += "          <td><input class='form-control input-sm' type='text' name='name' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.height, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled/></td>";
    //html += "      </tr>";
    //html += "      <tr>";
    //html += "          <td>Width</td>";
    //html += "          <td><input class='form-control input-sm' type='text' name='name' value='" + parseInt(lt.Annotations.Core.AnnUnitConverter.convertToPixels(item.bounds.width, lt.Annotations.Core.AnnUnit.unit, 96).toString()) + "' disabled/></td>";
    //html += "      </tr>";
    //html += "  </table>";
    html += "</div>";
    return html;
}
function BindOcrInfo(id: string, item: lt.Annotations.Core.AnnObject): string {
    var fieldInfo = <FieldInfo>JSON.parse(item.tag);
    var disabled = "";
    if (fieldInfo.ObjectId == -50) {
        disabled = "disabled"
    }
    var html = "";
    html += "<div id=\"ocr" + id + "\" class=\"tab-pane fade\">";
    html += "           <div class='panel-group'>";
    html += "   <div class='panel panel-default'>";
    html += "     <div class='panel-heading' >Text Type</div>";
    html += "     <div class='panel-body' id='paneltexttype" + id.toString() + "'>";
    html += "                    <div class='radio'>";
    html += "      <label title='Character' " + disabled + "><input type='radio' name='optradiotexttype" + id.toString() + "' value='Character' " + disabled + " " + (fieldInfo.OcrFieldInfo.Character == true ? "checked" : "") + ">Character</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='Numeric' " + disabled + "><input type='radio' name='optradiotexttype" + id.toString() + "' value='Numeric' " + disabled + " " + (fieldInfo.OcrFieldInfo.Numeric == true ? "checked" : "") + ">Numeric</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='Data' " + disabled + "><input type='radio' name='optradiotexttype" + id.toString() + "' value='Data' " + disabled + " " + (fieldInfo.OcrFieldInfo.Data == true ? "checked" : "") + ">Data</label>";
    html += "    </div>";
    html += "    </div>";
    html += "   </div>";
    html += "   <div class='panel panel-default'>";
    html += "     <div class='panel-heading'>Method</div>";
    html += "     <div class='panel-body' id='panelmethod" + id.toString() + "'>";
    html += "                    <div class='checkbox'>";
    html += "      <label title='Enable OCR' " + disabled + "><input type='checkbox' value='EnableOCR' " + disabled + " " + (fieldInfo.OcrFieldInfo.EnableOCR == true ? "checked" : "") + ">Enable OCR</label>";
    html += "    </div>";
    html += "                    <div class='checkbox'>";
    html += "      <label title='Enable ICR' " + disabled + "><input type='checkbox' value='EnableICR' " + disabled + " " + (fieldInfo.OcrFieldInfo.EnableICR == true ? "checked" : "") + ">Enable ICR</label>";
    html += "    </div>";
    html += "     </div>";
    html += "   </div>                                           ";
    html += "   <div class='panel panel-default'>                ";
    html += "     <div class='panel-heading'>Dropout</div>  ";
    html += "     <div class='panel-body' id='panelDropout" + id.toString() + "'>   ";
    html += "                    <div class='checkbox'>";
    html += "      <label title='Words' " + disabled + "><input type='checkbox' value='Words' " + disabled + " " + (fieldInfo.OcrFieldInfo.Words == true ? "checked" : "") + ">Words</label>";
    html += "    </div>";
    html += "                    <div class='checkbox'>";
    html += "      <label title='Cell Boarders' " + disabled + "><input type='checkbox' value='CellBoarders' " + disabled + " " + (fieldInfo.OcrFieldInfo.CellBoarders == true ? "checked" : "") + ">Cell Boarders</label>";
    html += "    </div>";
    html += "     </div>";
    html += "   </div>                                           ";
    html += " </div>                                             ";
    html += "</div>";
    return html;
}
function BindOmrInfo(id: string, item: lt.Annotations.Core.AnnObject): string {
    var fieldInfo = <FieldInfo>JSON.parse(item.tag);
    var html = "";
    var disabled = "";
    if (fieldInfo.ObjectId == -51) {
        disabled = "disabled"
    }

    html += "<div id=\"omr" + id + "\" class=\"tab-pane fade\">";

    html += "      <div class='panel panel-default'>";
    html += "     <div class='panel-heading'>Sensitivity</div>";
    html += "     <div class='panel-body' id='panelsensitivity" + id.toString() + "'>";
    html += "                    <div class='radio'>";
    html += "      <label title='Lowest' " + disabled + "><input type='radio' name='optradiosensitivity" + id.toString() + "' value='Lowest' " + disabled + " " + (fieldInfo.OmrFieldInfo.Lowest == true ? "checked" : "") + ">Lowest</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='Low' " + disabled + "><input type='radio' name='optradiosensitivity" + id.toString() + "' value='Low' " + disabled + " " + (fieldInfo.OmrFieldInfo.Low == true ? "checked" : "") + ">Low</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='High' " + disabled + "><input type='radio' name='optradiosensitivity" + id.toString() + "' value='High' " + disabled + " " + (fieldInfo.OmrFieldInfo.High == true ? "checked" : "") + ">High</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='Highest' " + disabled + "><input type='radio' name='optradiosensitivity" + id.toString() + "' value='Highest' " + disabled + " " + (fieldInfo.OmrFieldInfo.Highest == true ? "checked" : "") + ">Highest</label>";
    html += "    </div>";
    html += "    </div>";
    html += "   </div>";
    html += "   <div class='panel panel-default'>";
    html += "     <div class='panel-heading'>Frame</div>";
    html += "     <div class='panel-body'  id='panelframe" + id.toString() + "'>";
    html += "                    <div class='radio'>";
    html += "      <label title='Auto' " + disabled + "><input type='radio' name='optradioframe" + id.toString() + "' value='Auto' " + disabled + " " + (fieldInfo.OmrFieldInfo.Auto == true ? "checked" : "") + ">Auto</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='With Frame' " + disabled + "><input type='radio' name='optradioframe" + id.toString() + "' value='WithFrame' " + disabled + " " + (fieldInfo.OmrFieldInfo.WithFrame == true ? "checked" : "") + ">With Frame</label>";
    html += "    </div>";
    html += "                    <div class='radio'>";
    html += "      <label title='Without Frame' " + disabled + "><input type='radio' name='optradioframe" + id.toString() + "' value='WithoutFrame' " + disabled + " " + (fieldInfo.OmrFieldInfo.WithoutFrame == true ? "checked" : "") + ">Without Frame</label>";
    html += "    </div>";
    html += "    </div>";
    html += "   </div>";

    html += "</div>";
    return html;
}
function BindTableInfo(id: string, item: lt.Annotations.Core.AnnObject): string {
    var fieldInfo = <FieldInfo>JSON.parse(item.tag);
    var html = "";
    html += " <div  id=\"table" + id + "\" class=\"tab-pane fade panel panel-default\">";
    html += "  <div class=\"panel-body\">Comming Soon...</div>";
    html += "  </div>";
    return html;
}

function ValidateMasterFormName(formName) {
    var fnameRegex = /^(?!^(PRN|AUX|CLOCK\$|NUL|CON|COM\d|LPT\d|\..*)(\..+)?$)[^\x00-\x1f\\?*:\"";|></]+$/;
    var inputData = $.trim(formName.val());
    if (inputData == "") {
        return false;
    } else if (!fnameRegex.test(inputData)) {
        return false;
    } else {
        return true;
    }
}

declare function Notify(text: string, callback: string, close_callback: string, style: string): void;


