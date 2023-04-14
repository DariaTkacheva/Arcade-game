class CollisionObject extends DrawedObject 
{
    constructor(application, options) {
        super(application, options);
        
        this.isInnerCollision = options.isInnerCollision;
    }
}