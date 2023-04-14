class BonusesEngine extends Engine
{
    constructor(application) {
        super(application);

        this.bonuses = [];

        this.sprite = application.sources.textures.static.healthBonus;
    }

    updateObjects() {
        //
    }

    drawObjects() {
        for (const bonus of this.bonuses) {
            bonus.draw();
        }
    }

    createRandomBonus() {
        // const bonus = new RestoreHealthBonus(this.application, {
        //     x: 800,
        //     y: 800,
        //     width: 45,
        //     height: 45,
        //     isInnerCollision: false,
        // });
        // bonus.setSprite(this.sprite);
        // this.bonuses.push(bonus);
        // this.personsEngine.updateCollisionObjects();
    }

    removeBonus(bonus) {
        this.bonuses = this.bonuses.filter(object => object != bonus);
        this.personsEngine.updateCollisionObjects();
    }

    setPersonsEngine(personsEngine) {
        this.personsEngine = personsEngine;
    }

    applyBonus(bonus, initiator) {
        bonus.apply(initiator);
        this.removeBonus(bonus);
    }
}