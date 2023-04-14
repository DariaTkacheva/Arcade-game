class DrawedObject extends GameObject 
{
    constructor (application, options) {
        super(options);

        this.ctx = application.ctx;

        this.camera = application.camera;
        
        this.animations = {};
    }
    
    draw() {
        this.ctx.drawImage (
            this.sprite,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height,
        )
    }

    addAnimation(animationName, sprite, countFrame) {
        this.animations[animationName] = new Animation(this.ctx, sprite, countFrame, this);
    }

    setAnimationSpeed(animationName, speed) {
        this.animations[animationName].setAnimationSpeed(speed);
    }

    drawAnimation(animationName, rad) {
        this.animations[animationName].draw(this.position.x, this.position.y, rad);
    }

    setSprite(sprite) {
        this.sprite = sprite;
    }
}