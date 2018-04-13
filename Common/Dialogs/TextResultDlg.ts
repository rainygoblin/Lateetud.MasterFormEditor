module HTML5Demos {

   export module Dialogs {

      export class TextResultDlg {
         // Create shortcuts for the dialog UI elements 
         private dialogUI = {
            dialog: "#resultsDialog",
            label: "#dialogLabel",
            resultsTextArea: "#results"
         };

         public show(label: string, text: string): void {
            // New line for IE versions
            if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTDevice.desktop) {
               if (lt.LTHelper.version == 9) {
                  text = text.replace(new RegExp('\r\n|\n', 'g'), '\n\r');
               }
               else if (lt.LTHelper.version > 9) {
                  text = text.replace(new RegExp('\r\n', 'g'), '\n');
               }
            }

            $(this.dialogUI.label).text(label);
            $(this.dialogUI.resultsTextArea).text(text);
            $(this.dialogUI.dialog).modal();
         }
      }
   }
}