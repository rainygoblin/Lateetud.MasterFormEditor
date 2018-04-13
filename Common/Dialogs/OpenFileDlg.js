var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var OpenFileDlg = (function () {
            function OpenFileDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#openFileDialog",
                    goBtn: "#goBtn", fileSelectElement: "#fileSelect",
                    urlDiv: "#urlDiv", fileUrlInput: "#fileUrl",
                    imageUrlHelpLabel: "#imageUrlHelpLabel"
                };
                this.Init();
            }
            OpenFileDlg.prototype.Init = function () {
                $(this.dialogUI.fileSelectElement).prop("selectedIndex", 0);
                $(this.dialogUI.goBtn).bind("click", $.proxy(this.goBtn_Click, this));
                $(this.dialogUI.fileSelectElement).bind("change", $.proxy(this.fileSelectElement_SelectedIndexChanged, this));
            };
            OpenFileDlg.prototype.showUrlDiv = function (show) {
                show ? $(this.dialogUI.urlDiv).show(0) : $(this.dialogUI.urlDiv).hide();
            };
            OpenFileDlg.prototype.show = function () {
                //if (this._useRasterService) {
                //   if (!this._rasterServiceFound)
                //      $(this.dialogUI.imageUrlHelpLabel).text("LEADTOOLS REST Raster Service was not found. Only file formats supported by the browser will be loaded");
                //}
                $(this.dialogUI.dialog).modal();
            };
            Object.defineProperty(OpenFileDlg.prototype, "goClick", {
                // Events mutators
                set: function (value) {
                    this._goClick = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OpenFileDlg.prototype, "fileSelect", {
                set: function (value) {
                    this._fileSelect = value;
                },
                enumerable: true,
                configurable: true
            });
            OpenFileDlg.prototype.goBtn_Click = function (e) {
                if (this._goClick != null)
                    // fire the goClick event , and pass the url
                    this._goClick($(this.dialogUI.fileUrlInput).val());
            };
            OpenFileDlg.prototype.fileSelectElement_SelectedIndexChanged = function (e) {
                var fileSelect = document.getElementById("fileSelect");
                if (fileSelect.value == "Enter URL") {
                    this.showUrlDiv(true);
                }
                else {
                    this.showUrlDiv(false);
                    if (this._fileSelect != null)
                        // fire file select event , and pass the selected index
                        this._fileSelect(fileSelect.selectedIndex);
                    $(this.dialogUI.dialog).modal("hide");
                }
            };
            return OpenFileDlg;
        }());
        Dialogs.OpenFileDlg = OpenFileDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
//# sourceMappingURL=OpenFileDlg.js.map