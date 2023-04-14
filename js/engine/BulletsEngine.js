class BulletsEngine extends Engine
{
    constructor(application) {
        super(application);

        this.bullets = [];

        this.personsEngine = application.personsEngine;

        this.bulletSound = application.sources.sounds.bullet;
        this.bulletSprite = application.sources.textures.static.bullet;

        this.updateCollisionObjects();
    }

    updateObjects() {
        for (let i = 0; i < this.bullets.length; i++) {
            const hitObject = this.bullets[i].isHit();
            this.bullets[i].update();
            const person = this.isHitPerson(hitObject, this.bullets[i]);
            if (person) {
                this.personsEngine.damagePerson(person, this.bullets[i].damage);
                this.bullets.splice(i, 1);
            } else if (this.isHitWorld(hitObject)) {
                this.bullets.splice(i, 1);
            }
        }
    }

    drawObjects() {
        for(const bullet of this.bullets) {
            bullet.draw();
        }    
    }

    createBullet(options) {
        const bullet = new Bullet(this.application, {
            x: options.x,
            y: options.y,
            width: options.width,
            height: options.height,
            speed: options.speed,
            cos: options.cos,
            sin: options.sin,
            isInnerCollision: false,
            initiator: options.initiator,
            engine: this,
            damage: options.initiator.damage,
        });
        bullet.setSprite(this.bulletSprite);
        this.bullets.push(bullet);
        this.bulletSound.play();
    }

    isHitPerson(hitObject, bullet) {
        if (hitObject.x instanceof Person || hitObject.y instanceof Person) {
            const person = hitObject.x instanceof Person ? hitObject.x : hitObject.y;
            if (bullet.initiator != person) {
                return person;
            }
        }
        return false;
    }

    isHitWorld(hitObject) {
        return hitObject.x instanceof World || hitObject.y instanceof World || hitObject.x instanceof Wall || hitObject.y instanceof Wall;
    }

    updateCollisionObjects() {
        this.collisionObjects = this.application.world.walls.concat(this.application.world, this.personsEngine.player, this.personsEngine.enemies);
    }
}