class Camera extends Object 
{
    constructor(config) {
        super(config);
    }

    setFollowObject(object) {
        this.followedObject = object;
    }

    update() {
        this.position = this.followedObject.position;
    }
}