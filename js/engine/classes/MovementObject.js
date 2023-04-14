class MovementObject extends CollisionObject 
{
    constructor(application, options) {
        super(application, options);

        this.speed = 60 / application.fps * options.speed;

        this.engine = options.engine;
    }

    // Получить объекты с которыми соприкасается объект
    getObjectCollisions(moveX, moveY) { 
        let collisionObject = {
            x: null,
            y: null,
        };

        for (const object of this.engine.collisionObjects) {
            if (object === this) {
                continue;
            }

            const collision = this.isCollision(moveX, moveY, object);
            collisionObject = {
                x: collision.x ? object : collisionObject.x,
                y: collision.y ? object : collisionObject.y,
            };
        }

        return collisionObject;
    }

    isCollision(moveX, moveY, object) {
        return object.isInnerCollision ? this.#isInnerCollision(moveX, moveY, object) : this.#isOuterCollision(moveX, moveY, object);
    }

    #isInnerCollision(moveX, moveY, object) {
        return {
            x: (this.position.x + this.size.width + moveX > object.size.width && this.position.x + moveX > object.position.x) || 
                (this.position.x + this.size.width + moveX < object.size.width && this.position.x + moveX < object.position.x),

            y: (this.position.y + this.size.height + moveY > object.size.height && this.position.y + moveY > object.position.y) || 
                (this.position.y + this.size.height + moveY < object.size.height && this.position.y + moveY < object.position.y),
        }
    }

    #isOuterCollision(moveX, moveY, object) {
        return {
            y: this.position.y + this.size.height + (moveY > 0 ? moveY : 0) > object.position.y &&              //Проверка стены снизу
                this.position.y + (moveY < 0 ? moveY : 0) < object.position.y + object.size.height &&           //Проверка стены сверху
                this.position.x + this.size.width > object.position.x &&              
                this.position.x < object.position.x + object.size.width,

            x: this.position.x + this.size.width + (moveX > 0 ? moveX : 0) > object.position.x &&               //Проверка стены справа
                this.position.x + (moveX < 0 ? moveX : 0) < object.position.x + object.size.width &&            //Проверка стены слева
                this.position.y + this.size.height > object.position.y &&              
                this.position.y < object.position.y + object.size.height,
        }
    }
}