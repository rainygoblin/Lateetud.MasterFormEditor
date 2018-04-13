module CustomAnnotations {
    export class AnnOmrObject extends lt.Annotations.Core.AnnRectangleObject {

        constructor() {
            super();
            this.setId(-50);// set the object id
            this.set_tag(null);
        }

        create(): AnnOmrObject {
            return new AnnOmrObject();
        }
    }
}