class Menu extends DrawedObject
{
    constructor(application, config) {
        super(application, config);

        this.application = application;

        this.controls = application.controls;

        this.sprites = application.sources.textures;
        this.setSprite(this.sprites.static.menuBackground);

        this.buttons = [
            new MenuButton(application, MenuPreset.playButton, this.sprites.static.menuButtonPlay),
            new MenuButton(application, MenuPreset.optionsButton, this.sprites.static.menuButtonOptions),
        ];

        this.buttons[0].setActive();
    }

    draw() {
        super.draw();
        this.drawButtons();
    }
    
    drawButtons() {
        for (const button in this.buttons) {
            this.buttons[button].draw();
        }
    }
 
    update() {
        if (this.controls.keys.down) {
            let activeButton = null;
            
            for (let button = 0; button <= this.buttons.length - 1; button++) {
                if (activeButton != null) {
                    this.buttons[button].setActive();
                    break;
                }
                if (this.buttons[button].isActive && button != this.buttons.length - 1) {
                    activeButton = button;
                    this.buttons[button].setPassive();
                }
            }
            
        }

        if (this.controls.keys.up) {
            let activeButton = null;

            for (let button = this.buttons.length - 1; button >= 0; button--) {
                if (activeButton != null) {
                    this.buttons[button].setActive();
                    break;
                }
                if (this.buttons[button].isActive && button != 0) {
                    activeButton = button;
                    this.buttons[button].setPassive();
                }
            }
        }

        if (this.controls.keys.enter) {
            for (let button = 0; button <= this.buttons.length - 1; button++) {
                switch (button) {
                    case 0: {
                        this.application.game.stat = GAME_STATS.PLAY;
                        break;
                    }
                    case 1: {
                        break;
                    }
                }
            }
        }
    }
}