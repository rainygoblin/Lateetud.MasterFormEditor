module HTML5Demos {
    export module AnnotationsDemo {
        export class AnnotationLoadSaveHelper {

            private _automation: lt.Annotations.Automation.AnnAutomation = null;
            private _imageViewer: lt.Controls.ImageViewer = null;
            private fileInput: HTMLDivElement;

            public set automation(value: lt.Annotations.Automation.AnnAutomation) {
                this._automation = value;
            }
            public set imageViewer(value: lt.Controls.ImageViewer) {
                this._imageViewer = value;
            }

            constructor() {
                this.fileInput = document.createElement("div");
                $(this.fileInput).append('<input type="file" id="inputFileBrowser" accept="text/xml" value="Load" style="visibility:collapse"/>');
                document.body.appendChild(this.fileInput);
            }

            private onInputFileChange(isBatesStamp: boolean, selectedPage: number): void {
                var fileBrowser: HTMLInputElement = <HTMLInputElement>document.getElementById('inputFileBrowser');

                if (lt.LTHelper.supportsFileReader) {
                    var file = fileBrowser.files[0];
                    if (file != null) {
                        var reader = new FileReader();
                        reader.onload = () => {
                            var content = reader.result;
                            reader.onload = null;
                            this.loadContent(content, selectedPage, isBatesStamp);
                        };
                        reader.readAsText(file, 'UTF-8');
                    }
                }
                else {
                    alert('Your browser does not support HTML 5 FileReader API. Loading annotations is disabled.');
                }
            }

            public loadContent(content: string, pageNumber: number, isBatesStamp: boolean) {
                if (!isBatesStamp) {
                    try {
                        var codecs = new lt.Annotations.Core.AnnCodecs();
                        var container = codecs.load(content, pageNumber);
                        if (container != null) {
                            var srcChildren = container.children;

                            if (srcChildren.count > 0) {
                                var destChildren = this._automation.container.children;
                                destChildren.clear();

                                var selectionObject = this._automation.container.selectionObject;
                                if (selectionObject != null && selectionObject.selectedObjects.count > 0) {
                                    selectionObject.selectedObjects.clear();
                                    selectionObject.isSelected = false;
                                }

                                var scale = this._imageViewer.scaleFactor;
                                var point = lt.LeadPointD.create(0, 0);
                                for (var i = 0; i < srcChildren.count; i++) {
                                    var child = srcChildren.item(i);
                                    // Comment out this code if you need to scale the objects after loading.
                                    destChildren.add(child);
                                }
                            }

                            for (var i = 0; i < container.layers.count; i++) {
                                this._automation.container.layers.add(container.layers.item(i));
                            }
                            this._automation.automationControl.automationInvalidate(lt.LeadRectD.empty);
                        }
                    }
                    catch (exception) {
                        alert('File does not contain valid LEADTOOLS annotation data.');
                    }
                }
                else {
                    try {
                        //Set Composer rendering engine
                        var compserEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                        lt.Annotations.Documents.AnnBatesStampComposer.renderingEngine = compserEngine;

                        //Load composer instance
                        var batesStampComposer = lt.Annotations.Documents.AnnBatesStampComposer.load(content);

                        var automation: lt.Annotations.Automation.AnnAutomation = this._automation;
                        var mainContainer: lt.Annotations.Core.AnnContainer = automation.container;

                        //If there is bates stamp container added then remove it 
                        if (automation.containers.count == 2)
                            automation.containers.removeAt(0);

                        //Create Bates stamp container, set its size and mapper
                        var batesStampContainer: lt.Annotations.Core.AnnContainer = new lt.Annotations.Core.AnnContainer();
                        batesStampContainer.size = mainContainer.size;

                        batesStampContainer.mapper = mainContainer.mapper.clone();

                        //Apply BatesStamp to our container 
                        batesStampComposer.targetContainers.add(batesStampContainer);

                        this._automation.containers.insertItem(0, batesStampContainer);

                        this._automation.invalidate(lt.LeadRectD.empty);
                    }
                    catch (exception) {
                        alert('File does not contain valid LEADTOOLS Bates Stamp data.');
                    }
                }
            }

            public DeletePage(pageNo: number, folderName: string): void {

                var codecs = new lt.Annotations.Core.AnnCodecs();
                var rest: string = [Utils.ServiceHelper.serviceUri, "Data", "LoadXml"].join("/");
                var FolderName: string = document.getElementById('hdnKey').attributes["value"].value;
                var annContainers: Array<lt.Annotations.Core.AnnContainer>;
                $.ajax(rest, {
                    'type': "GET",
                    headers: { "cache-control": "no-cache" },
                    async: false,
                    data: "FolderName=" + FolderName.toString(),
                }).done((xmlcontent: string) => {
                    annContainers = codecs.loadAll(xmlcontent);
                    annContainers = $.grep(annContainers, function (e) {
                        return e.pageNumber != pageNo;
                    });

                    for (var annContainerIndex = 0; annContainerIndex < annContainers.length; annContainerIndex++) {
                        if (annContainers[annContainerIndex].pageNumber > pageNo) {
                            annContainers[annContainerIndex].pageNumber -= 1;
                        }
                    }

                    var xmlString = codecs.saveAll(annContainers, lt.Annotations.Core.AnnFormat.annotations);

                    this.saveXml(xmlString, 'xml');
                }).fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown))

                //-------------------------
                var rest: string = [Utils.ServiceHelper.serviceUri, "GenerateFile", "DeletePage"].join("/");
                $.ajax(rest, {
                    'type': "delete",
                    data: 'FolderName=' + folderName
                    + '&PageNumber=' + (pageNo - 1),
                }).done((fileUrl: string) => {
                    window.location.reload();
                }).fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown));
            }


            private saveXml(xml: string, ext: any): void {
                /// <param name="xml" type="String">
                /// </param>
                var FolderName: string = document.getElementById('hdnKey').attributes["value"].value;
                var FriendlyFolderName: string = document.getElementById('hdnfriendlyName').attributes["value"].value;//Added by Prasanta 
                //var rest: string = [Utils.ServiceHelper.serviceUri, "Data", "SaveXml"].join("/") + "?FolderName=" + FolderName.toString();//Commented By Prasanta
                var rest: string = [Utils.ServiceHelper.serviceUri, "Data", "SaveXml"].join("/") + "?FolderName=" + FolderName.toString() + "[[" + FriendlyFolderName + "]]";//Added by Prasanta 
                $.ajax(rest, {
                    'type': "POST",
                    contentType: "text/xml",
                    async: false,
                    data: xml,
                    //data: { "data": xml.toString(), "FolderName": FolderName.toString()  }
                    //  data: 'xmldata=sdfs&FolderName=' + FolderName.toString(),
                }).done((isSaved: boolean) => {
                    if (!isSaved) {
                        alert('Error in saving annotation');
                    }
                }).fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown))
            }

            public showRequestError(jqueryXHR: JQueryXHR, statusText: string, errorThrown: string): void {
                var body: any = null;
                var detail: string = null;
                try {
                    body = JSON.parse(jqueryXHR.responseText);
                    detail = "(" + body["detail"] + ")";
                    console.error("Error: " + detail);
                }
                catch (e) {
                    console.error("Could not parse JSON from Error")
                    detail = "(Error " + jqueryXHR.status + ": " + jqueryXHR.statusText + ")"
                }

                var message: string = [
                    "An error has occurred in the application.",
                    detail
                ].join("\n");
                window.alert(message);
                jqueryXHR = null;
            }

            private downloadFile(url: string, ext: any): void {
                /// <param name="url" type="String">
                /// </param>
                var rest: string = [Utils.ServiceHelper.serviceUri, "Data", "Download"].join("/");
                var params = {
                    uri: encodeURIComponent(url),
                    name: "Annotations." + ext,
                    mimeType: "text/xml"
                };
                rest = Utils.ServiceHelper.addParamsToUrl(rest, params);

                // HEAD check to ensure we aren't opening a tab for no good reason
                $.ajax(rest, {
                    "type": "GET",
                    headers: { "cache-control": "no-cache" }
                }).done(() => {
                    var oWin = null;
                    if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer) {
                        oWin = window.open("");
                        oWin.navigate(rest);
                    }
                    else {
                        oWin = window.open(rest);
                    }
                    if (oWin == null || typeof (oWin) == 'undefined') {
                        alert('Your Popup Blocker has blocked saving the annotation file to your disk. Disable the Popup Blocker for this web site and try again.');
                    }
                })
                    .fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown))
            }

            public loadAnnotations(selectedPage: number): void {
                if (this._automation == null || this._imageViewer == null) {
                    alert("Need to set some prameters First !!");
                    return;
                }

                $('#inputFileBrowser').remove();
                $(this.fileInput).append('<input type="file" id="inputFileBrowser" accept="text/xml" value="Load" change="onInputFileChange()" style="visibility:collapse"/>');

                $("#inputFileBrowser").bind('change', () => this.onInputFileChange(false, selectedPage));
                if (lt.LTHelper.OS == lt.LTOS.android && lt.LTHelper.browser != lt.LTBrowser.opera) {
                    $("#inputFileBrowser").click();
                }
                else {
                    window.setTimeout(function () {
                        $("#inputFileBrowser").click();
                    }, 200);
                }
            }

            public saveAnnotations(selectedPage: number): void {
                if (this._automation == null || this._imageViewer == null) {
                    alert("Need to set some prameters First !!");
                    return;
                }
                var codecs = new lt.Annotations.Core.AnnCodecs();
                var rest: string = [Utils.ServiceHelper.serviceUri, "Data", "LoadXml"].join("/");
                var FolderName: string = document.getElementById('hdnKey').attributes["value"].value;
                var annContainers: Array<lt.Annotations.Core.AnnContainer>;
                $.ajax(rest, {
                    'type': "GET",
                    headers: { "cache-control": "no-cache" },
                    async: false,
                    data: "FolderName=" + FolderName.toString(),
                }).done((xmlcontent: string) => {
                    annContainers = codecs.loadAll(xmlcontent);
                    var IsSet = false;
                    var a = [];
                    for (var annContainerIndex = 0; annContainerIndex < annContainers.length; annContainerIndex++) {
                        if (annContainers[annContainerIndex].pageNumber == selectedPage) {
                            annContainers[annContainerIndex] = this._automation.container;
                            annContainers[annContainerIndex].pageNumber = selectedPage; //we are not able to get actual pagenumber
                            IsSet = true;
                        }
                    }

                    if (!IsSet) {
                        this._automation.container.set_pageNumber(selectedPage); //we are not able to get actual pagenumber
                        annContainers.push(this._automation.container);
                    }
                    var xmlString = codecs.saveAll(annContainers, lt.Annotations.Core.AnnFormat.annotations);

                    this.saveXml(xmlString, 'xml');
                }).fail((xhr: JQueryXHR, statusText: string, errorThrown: string) => this.showRequestError(xhr, statusText, errorThrown))
            }

            public loadBatesStampAnnotations(): void {
                if (this._automation == null || this._imageViewer == null) {
                    alert("Need to set some prameters First !!");
                    return;
                }

                $('#inputFileBrowser').remove();
                $(this.fileInput).append('<input type="file" id="inputFileBrowser" accept="text/xml" value="Load" style="visibility:collapse"/>');

                $("#inputFileBrowser").bind('change', () => this.onInputFileChange(true, 1));
                if (lt.LTHelper.OS == lt.LTOS.android && lt.LTHelper.browser != lt.LTBrowser.opera) {
                    $("#inputFileBrowser").click();
                }
                else {
                    window.setTimeout(function () {
                        $("#inputFileBrowser").click();
                    }, 200);
                }
            }
        }
    }
} 