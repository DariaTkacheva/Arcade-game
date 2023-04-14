class InterfaceEngine extends Engine
{
    constructor(application) {
        super(application);  

        this.personsEngine = application.personsEngine;
    }

    updateObjects() {
        
    }

    drawObjects() {
        this.drawHealthEnemies();
        this.drawHealthPlayer();
    }

    drawHealthEnemies() {
        for (const enemy of this.personsEngine.enemies) {
            this.application.ctx.fillStyle = '#8C0D0D';
            this.application.ctx.fillRect(enemy.position.x, enemy.position.y + enemy.size.height + 5, enemy.size.width, 8);
            this.application.ctx.fillStyle = '#F70F0F';
            this.application.ctx.fillRect(enemy.position.x, enemy.position.y + enemy.size.height + 5, this.healthPercent(enemy), 8);
        }
    }

    healthPercent(enemy) {
        let percent = enemy.health * 100 / enemy.maxHealth;
        return percent * enemy.size.width / 100;
    }

    drawHealthPlayer() {
        // this.application.ctx.fillStyle = '#8C0D0D';
        // this.application.ctx.fillRect(player.position.x, player.position.y + player.size.height + 5, player.size.width, 8);
        // this.application.ctx.fillStyle = '#F70F0F';
        // this.application.ctx.fillRect(player.position.x, player.position.y + player.size.height + 5, this.healthPercent(player), 8);
    }
}