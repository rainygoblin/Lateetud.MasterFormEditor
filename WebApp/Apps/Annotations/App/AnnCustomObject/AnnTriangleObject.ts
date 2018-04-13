module CustomAnnotations {
    // AnnTriangleObject
    export class AnnTriangleObject extends lt.Annotations.Core.AnnPolylineObject {

        constructor() {
            super();
            this.set_isClosed(true);// triangle is a closed figure
            this.setId(-99);// set the object id
            this.set_tag(null);
        }

        create(): AnnTriangleObject {
            return new AnnTriangleObject();
        }
    }
}