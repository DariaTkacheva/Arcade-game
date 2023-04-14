class RestoreHealthBonus extends InstantBonus
{
    HEALTH = 50;

    constructor(application, options) {
        super(application, options);
    }

    apply(initiator) {
        let restoreHealth = initiator.health + this.HEALTH;
        initiator.health = restoreHealth > initiator.maxHealth ? initiator.maxHealth : restoreHealth;
    }
}