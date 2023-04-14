class SourcesLoader 
{
    constructor(config) {
        this.config = config;
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
        });
    } 

    loadSound(src) {
        return new Promise((resolve, reject) => {
            let sound = new Audio();
            sound.src = src;
            sound.oncanplaythrough = () => resolve(sound);
        });
    } 

    async load() {
        for (const [key, el] of Object.entries(this.config.textures)) {
            if (key === "animated") {
                for (const [objectName, object] of Object.entries(el)) {
                    for (const [viewName, view] of Object.entries(object)) {
                        this.config.textures.animated[objectName][viewName].sprite = await this.loadImage(view.sprite);
                    }
                }
            } else {
                for (const [objectName, object] of Object.entries(el)) {
                    this.config.textures.static[objectName] = await this.loadImage(object);
                }
            }
        }
        
        for (const [soundName, sound] of Object.entries(this.config.sounds)) {
            this.config.sounds[soundName] = await this.loadSound(sound);
        }
    }

    getSources() {
        return this.config;
    }
}
