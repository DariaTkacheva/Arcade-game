class Animation 
{
    constructor(ctx, sprite, countFrame, object) {
        this.ctx = ctx;
        this.sprite = sprite;

        this.object = object;
        this.frameSize = {
            width: this.sprite.width / countFrame, //длина одного кадра
            height: sprite.height,
        };

        this.frame = {
            current: 0,
            count: countFrame - 1,
            speed: 1,
        };
    }

    draw(x, y, rad) {
        this.drawRotateImage(this.sprite, x, y, this.frameSize, this.object.size, rad - Math.PI);
        this.frame.current = this.frame.current >= this.frame.count ? 0 : this.frame.current + this.frame.speed;
    }

    get currentFramePosition() {
        return this.frameSize.width * Math.floor(this.frame.current);
    }

    drawRotateImage(sprite, x, y, frameSize, objectSize, rad) {
        this.ctx.translate(x + objectSize.width/2, y + objectSize.height/2);
        this.ctx.rotate(rad);
        
        this.ctx.drawImage(sprite, this.currentFramePosition, 0, frameSize.width, frameSize.height,
        -objectSize.width/2, -objectSize.height/2, objectSize.width, objectSize.height);

        this.ctx.rotate(-rad);
        this.ctx.translate(-x - objectSize.width/2, -y - objectSize.height/2);
    }

    setAnimationSpeed(speed) {
        this.frame.speed = speed;
    }
}
