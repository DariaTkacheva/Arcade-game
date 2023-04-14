class PlayGame 
{
    constructor(controls) {
        this.controls = controls;
    }

    init(application, time) {
        if (this.controls.keys.escape) {
            application.game.stat = GAME_STATS.MENU;
        }

        application.world.draw();
        application.personsEngine.drawObjects();
        application.bulletsEngine.drawObjects();
        application.interfaceEngine.drawObjects();
        application.bonusesEngine.drawObjects();
        
        requestAnimationFrame(application.animation.bind(application));

        application.fpsControl.now = time;
        application.fpsControl.passed = application.fpsControl.now - application.fpsControl.then;

        if (application.fpsControl.passed > application.fpsControl.fpsInterval) {
            application.fpsControl.then = application.fpsControl.now - (application.fpsControl.passed % application.fpsControl.fpsInterval);

            application.personsEngine.updateObjects();
            application.bulletsEngine.updateObjects();
            application.camera.update();
        }
    }
}