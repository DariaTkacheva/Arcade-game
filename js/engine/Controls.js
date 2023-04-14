class Controls
{
    keys = {
        up: false,
        down: false,
        left: false,
        right: false,
        enter: false,
        escape: false,
    };

    constructor(config) {
        this.config = config;
        
        window.addEventListener('keydown', (event) => this.keyDown(event.code)); 
        window.addEventListener('keyup', (event) => this.keyUp(event.code));
    }

    keyDown(code) {
        if (this.config.up.includes(code)) {
            this.keys.up = true;
        }
        if (this.config.down.includes(code)) {
            this.keys.down = true;
        }
        if (this.config.left.includes(code)) {
            this.keys.left = true;
        }
        if (this.config.right.includes(code)) {
            this.keys.right = true;
        }
        if (this.config.enter.includes(code)) {
            this.keys.enter = true;
        }
        if (this.config.escape.includes(code)) {
            this.keys.escape = true;
        }
    }

    keyUp(code) {
        if (this.config.up.includes(code)) {
            this.keys.up = false;
        }
        if (this.config.down.includes(code)) {
            this.keys.down = false;
        }
        if (this.config.left.includes(code)) {
            this.keys.left = false;
        }
        if (this.config.right.includes(code)) {
            this.keys.right = false;
        }
        if (this.config.enter.includes(code)) {
            this.keys.enter = false;
        } 
        if (this.config.escape.includes(code)) {
            this.keys.escape = false;
        } 
    }
}