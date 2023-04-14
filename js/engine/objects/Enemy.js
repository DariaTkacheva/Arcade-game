class Enemy extends Person
{
    constructor(application, config, engine, textures, player) {
        super(application, config, engine, textures);

        this.state.idle = false;

        this.scaleSize(0.23);

        this.angle = 3;

        this.setAnimationSpeed("move", 0.1);
        this.setAnimationSpeed("idle", 0.1);

        this.aStarAlgorithm = new AStarAlgorithm();
        this.aStarAlgorithm.setMap(application.currentLevel);

        this.application = application;

        this.player = player;

        this.moveIteration = 0;
    }

    update() {
        super.update();   
    
        if (this.moveIteration <= 0) {
            const currentEnemyPosition = [
                Math.floor(this.position.y / this.application.world.cell.height),
                Math.floor(this.position.x / this.application.world.cell.width),
            ];
    
            const currentPlayerPosition = [
                Math.floor(this.player.position.y / this.application.world.cell.height),
                Math.floor(this.player.position.x / this.application.world.cell.width),
            ];
    
            this.aStarAlgorithm.setPoints(currentEnemyPosition, currentPlayerPosition);
    
            const path = this.aStarAlgorithm.run();
    
            const isPathExist = path !== null && path[2] !== undefined;
            const isNeedMove = isPathExist && path.length > 5;

            const nextEnemyPosition = [
                isPathExist ? path[2][0] : isNeedMove ? currentEnemyPosition[0] : currentEnemyPosition[0],
                isPathExist ? path[2][1] : isNeedMove ? currentEnemyPosition[1] : currentEnemyPosition[1],
            ];

            this.calcData(
                nextEnemyPosition[1] * this.application.world.cell.width,
                nextEnemyPosition[0] * this.application.world.cell.height,
                currentEnemyPosition[1] * this.application.world.cell.width,
                currentEnemyPosition[0] * this.application.world.cell.height,
                isNeedMove,
            );

            this.isAttack = isPathExist && !isNeedMove ? true : false;
        }

        this.position.x += this.moveX;
        this.position.y += this.moveY;

        this.moveIteration--;

        this.attack();
        console.log(this.isAttack)
    }

    calcData(x1, y1, x2, y2, isMove) {
        let leg = y1 - y2;
        let leg2 = x1 - x2;

        this.angle = Math.atan2(leg, leg2) + Math.PI / 2;

        const isZeroLeg = (leg === 0 && leg2 === 0) || !isMove;

        this.cos = isZeroLeg ? 0 : Math.cos(this.angle - Math.PI / 2);
        this.sin = isZeroLeg ? 0 : Math.sin(this.angle - Math.PI / 2);

        this.moveIteration = isZeroLeg ? 0 : leg2 / this.cos / this.speed;
    }

    get moveX() {
        return this.cos * this.speed;
    }

    get moveY() {
        return this.sin * this.speed;
    }
}
