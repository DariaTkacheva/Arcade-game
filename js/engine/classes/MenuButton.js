class MenuButton extends DrawedObject
{
    constructor(application, config, sprite) {
        super(application, config);

        this.sprite = sprite;
        this.isActive = false;
    }

    draw() {
        this.ctx.drawImage(
            this.sprite,
            this.isActive ? 0 : this.size.width,
            0,
            this.size.width,
            this.size.height,
            this.position.x - this.size.width / 2,
            this.position.y - this.size.height / 2,
            this.size.width,
            this.size.height,
        );
    }

    setActive() {
        this.isActive = true;
    }

    setPassive() {
       this.isActive = false; 
    }
}