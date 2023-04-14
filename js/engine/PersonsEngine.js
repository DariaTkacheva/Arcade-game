class PersonsEngine extends Engine
{
    constructor(application) {
        super(application);

        this.textures = application.sources.textures.animated;

        this.player = new Player(application, {engine: this}, this.textures.player);
        this.enemies = this.buildEnemies(application, EnemyPreset);
    
        this.bonusesEngine = application.bonusesEngine;

        this.updateCollisionObjects();
    }

    updateObjects() {
        this.player.update();
        this.updateEnemies();
    }

    drawObjects() {
        this.player.draw();
        this.drawEnemies();
    }

    drawEnemies() {
        for(const enemy of this.enemies) {
            enemy.draw();   
        }   
    }

    buildEnemies(application, configs) {
        let enemies = [];

        for (const config of configs) {
            enemies.push(new Enemy(application, config, {engine: this}, this.textures.enemy, this.player));
        }

        return enemies;
    }

    updateEnemies() {
        for (const enemy of this.enemies) {
            enemy.update();
        } 
    }

    setBulletsEngine(bulletsEngine) {
        this.bulletsEngine = bulletsEngine;
        this.player.setBulletsEngine(bulletsEngine);
        for (const enemy of this.enemies) {
            enemy.setBulletsEngine(bulletsEngine);
        } 
    }

    killPerson(person) {
        if (person instanceof Player) {
            this.player = null;
        } else {
            this.enemies = this.enemies.filter(object => object != person);
        }
        this.bulletsEngine.updateCollisionObjects();
    }

    updateCollisionObjects() {
        this.collisionObjects = this.application.world.walls.concat(this.application.world, this.enemies, this.player, this.bonusesEngine.bonuses);
    }

    damagePerson(person, damage) {
        person.dealDamage(damage);
        if (person.health < 0) {
            this.killPerson(person);
        }
    }
}