class GameMenu
{
    constructor(application) {
        this.application = application;

        this.menu = new Menu(application, MenuPreset.background);
    }

    init() {
        this.menu.draw();

        this.menu.update();
        requestAnimationFrame(this.application.animation.bind(this.application));
    }
}