class TemporaryBonus extends Bonus 
{
    constructor(application, options) {
        super(application, options);

        this.duration = options.duration;
    }
}