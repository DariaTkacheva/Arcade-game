class Application
{
    constructor(elementId) {
        const canvas = document.getElementById(elementId);
        canvas.width = WorldPreset.width;
        canvas.height = WorldPreset.height;
        this.ctx = canvas.getContext("2d"); 

        this.sourcesLoader = new SourcesLoader(SoucesPreset);

        this.sourcesLoader.load().then(() => {
            this.loadGame();
            this.startGame();
        });
    }
    
    animation(time) {
        this.ctx.clearRect(0, 0, this.camera.width, this.camera.heigth);

        switch (this.game.stat) {
            case GAME_STATS.MENU:
                this.game.menu.init();
                break;
            case GAME_STATS.PLAY:
                this.game.play.init(this, time);
                break;
            case GAME_STATS.GAME_OVER:
                break;
        }
    }

    loadGame() {
        this.controls = new Controls(ControlsConfig);
        this.sources = this.sourcesLoader.getSources();

        this.game = {
            stat: GAME_STATS.MENU,
            play: new PlayGame(this.controls),
            menu: new GameMenu(this),
        };

        this.fps = 60;

        this.fpsControl = {
            fpsInterval: 1000 / this.fps,
            then: window.performance.now(),
            now: null,
            passed: null,
        };

        this.camera = new Camera(CameraPreset);

        this.currentLevel = level1;

        this.world = new World(this, WorldPreset);
        this.bonusesEngine = new BonusesEngine(this);
        this.personsEngine = new PersonsEngine(this);
        this.bulletsEngine = new BulletsEngine(this);
        this.interfaceEngine = new InterfaceEngine(this);

        this.personsEngine.setBulletsEngine(this.bulletsEngine);
        this.bonusesEngine.setPersonsEngine(this.personsEngine);

        this.bonusesEngine.createRandomBonus();

        this.camera.setFollowObject(this.personsEngine.player);
    }

    startGame() {
        requestAnimationFrame(this.animation.bind(this));
    }
}
