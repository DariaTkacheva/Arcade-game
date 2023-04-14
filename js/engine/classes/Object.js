class GameObject 
{
    constructor(options) {
        this.position = {
            x: options.x,
            y: options.y,
        }

        this.size = {
            width: options.width,
            height: options.height,
        }
    }

    update() {
        // Обновление
    }

    scaleSize(scale) {
        this.size = {
            width: this.size.width * scale,
            height: this.size.height * scale,
        }
    }
}
