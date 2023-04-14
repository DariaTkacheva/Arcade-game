class Bullet extends MovementObject
{
    constructor(application, config) {
        super(application, config);

        this.cos = config.cos;
        this.sin = config.sin;

        this.initiator = config.initiator;
        this.damage = config.damage;
    }

    draw() {
        this.ctx.drawImage(
            this.sprite,
            this.position.x - this.size.width / 2,
            this.position.y - this.size.height / 2,
            this.size.width,
            this.size.height,
        );  
    }  

    update() {
        this.position.x += this.moveX;
        this.position.y += this.moveY;
    }

    isHit() {
        return this.getObjectCollisions(this.moveX, this.moveY);
    }

    get moveX() {
        return this.cos * this.speed;
    }

    get moveY() {
        return this.sin * this.speed;
    }
}
