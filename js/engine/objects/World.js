class World extends CollisionObject
{
    constructor(application, config) {
        super(application, config);

        this.sprites = application.sources.textures;

        this.setSprite(this.sprites.static.world);

        this.cell = {
            width: this.size.width / application.currentLevel[0].length,
            height: this.size.height / application.currentLevel.length,
        };

        this.walls = this.buildWalls(application, application.currentLevel);
    }

    draw() {
        super.draw();
        this.drawWalls();
    }

    drawWalls() {
        for (const wall of this.walls) {
            wall.draw();   
        } 
    }

    buildWalls(application, map) {
        let walls = [];

        for (let row = 0; row < map.length; row++) {
            for (let column = 0; column < map[row].length; column++) {
                if (map[row][column] === 1 || map[row][column] === 2 || map[row][column] === 3) {
                    const wallType = this.getWallType(map[row][column]);
                    const wall = new Wall(application, {
                        x: column * this.cell.width,
                        y: row * this.cell.height,
                        width: this.cell.width,
                        height: this.cell.height,
                        type: wallType,
                        isInnerCollision: false
                    });
                    wall.setSprite(this.sprites.static[wallType]);
                    walls.push(wall); 
                }
            }
        }

        return walls;
    }

    getWallType(i) {
        const walls = {
            1: "stone1",
            2: "stone2",
            3: "stone3",
        };

        return walls[i];
    }
}
