class Person extends MovementObject
{
    constructor(application, options, engine, textures) {
        super(application, {...options, ...engine});
        
        this.angle = options.angle;

        this.isAttack = false;

        this.maxHealth = 100;
        this.health = 40/*this.maxHealth*/;
        this.damage = 5;

        this.fire = {
            rate: 5,
            current: 5,
            perTick: 60 / application.fps * 0.1,
        }
        
        this.buffs = [];

        this.state = {
            idle: true,
            move: false,
            attack: false,
        }
        
        this.addAnimation("move", textures.move.sprite, textures.move.count);
        this.addAnimation("idle", textures.idle.sprite, textures.idle.count);        
    };

    attack() {
        if (this.isAttack && this.fire.current >= this.fire.rate) {
            this.fire.current = 0;
            this.bulletsEngine.createBullet({
                x: this.position.x + this.size.width / 2,
                y: this.position.y + this.size.height / 2,
                width: 100,
                height: 100,
                speed: 10,
                cos: Math.cos(this.angle - Math.PI / 2),
                sin: Math.sin(this.angle - Math.PI / 2),
                initiator: this,
            });
        }
    }

    bulletRecovery() {
        this.fire.current += this.fire.perTick;
    }
    
    draw() {
        
        if (this.state.idle) {
            this.drawAnimation("idle", this.angle);
        } else {
            this.drawAnimation("move", this.angle);
        }
    }

    update() {
        super.update();
        this.bulletRecovery();
    }

    setBulletsEngine(bulletsEngine) {
        this.bulletsEngine = bulletsEngine;
    }

    dealDamage(damage) {
        this.health -= damage;
    }

   

    addBuff(options) {
        this.buffs.push();
    }
}
