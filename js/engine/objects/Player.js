class Player extends Person
{
    keys = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    velocity = {
        x: 0,
        y: 0,
    };

    constructor(application, engine, textures) {
        super(application, PlayerPreset, engine, textures);

        this.scaleSize(0.35);

        this.setAnimationSpeed("move", 0.05);
        this.setAnimationSpeed("idle", 0.05);
       
        window.addEventListener('keydown', (event) => this.keyDown(event.key));
        window.addEventListener('keyup', (event) => this.keyUp(event.key));
        window.addEventListener("mousemove", (event) => this.mouseMove(event.x, event.y));
        window.addEventListener("mousedown", (event) => this.mouseDown(event));
        window.addEventListener("mouseup", (event) => this.mouseUp(event));
    }

    keyDown(key) {
        if (key == 'w') {
            this.keys.up = -1;
        }
        if (key == 's') {
            this.keys.down = 1;
        }
        if (key == 'a') {
            this.keys.left = -1;
        }
        if (key == 'd') {
            this.keys.right = 1;
        }
    }

    keyUp(key) {
        if (key == 'w') {
            this.keys.up = 0;
        }
        if (key == 's') {
            this.keys.down = 0;
        }
        if (key == 'a') {
            this.keys.left = 0;
        }
        if (key == 'd') {
            this.keys.right = 0;
        }
    }

    mouseDown(event) {
        this.isAttack = true;
    }

    mouseUp(event) {
        this.isAttack = false;
    }

    mouseMove(x, y) {
        let leg = y - (this.position.y + this.size.height / 2);
        let leg2 = x - (this.position.x + this.size.width / 2);
        this.angle = Math.atan2(leg, leg2) + Math.PI / 2;
    }

    update() {
        super.update();
        this.velocity = {
            x: this.keys.left * this.speed + this.keys.right * this.speed,
            y: this.keys.up * this.speed + this.keys.down * this.speed,
        };

        if (this.velocity.y != 0 || this.velocity.x != 0) {
            const collisionObject = this.getObjectCollisions(this.velocity.x, this.velocity.y);

            if (collisionObject.x instanceof Bonus) {
                this.engine.bonusesEngine.applyBonus(collisionObject.x, this);
            } else {
                this.position.x += collisionObject.x ? (this.velocity.x > 0 ? ((collisionObject.x.isInnerCollision ? collisionObject.x.size.width : collisionObject.x.position.x) - (this.position.x + this.size.width)) : ((collisionObject.x.isInnerCollision ? collisionObject.x.position.x : collisionObject.x.position.x + collisionObject.x.size.width) - this.position.x)) : this.velocity.x;
            }

            if (collisionObject.y instanceof Bonus) {
                this.engine.bonusesEngine.applyBonus(collisionObject.y, this);
            } else {
                this.position.y += collisionObject.y ? (this.velocity.y > 0 ? ((collisionObject.y.isInnerCollision ? collisionObject.y.size.height : collisionObject.y.position.y) - (this.position.y + this.size.height)) : ((collisionObject.y.isInnerCollision ? collisionObject.y.position.y : collisionObject.y.position.y + collisionObject.y.size.height) - this.position.y)) : this.velocity.y;
            }
        }

        this.attack();
    }
}
