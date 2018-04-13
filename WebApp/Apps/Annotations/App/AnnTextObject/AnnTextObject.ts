module CustomAnnotations {
    export class AnnTextObject extends lt.Annotations.Core.AnnRectangleObject {

        constructor() {
            super();
            this.setId(-51);// set the object id
        }
       
        create(): AnnTextObject {
            return new AnnTextObject();
        }
    }
}