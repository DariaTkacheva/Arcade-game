const SoucesPreset = {
    textures: {
        animated: {
            enemy: {
                move: {
                    sprite: "images/enemy/enemy-move.svg",
                    count: 12,
                },
                idle: {
                    sprite: "images/enemy/enemy-idle.svg",
                    count: 1,
                },
                attack: {
                    sprite: "images/enemy/enemy-idle.svg",
                    count: 0,
                },
            },
            player: {
                move: {
                    sprite: "images/player/player-move.svg",
                    count: 4,
                },
                idle: {
                    sprite: "images/player/player-idle.svg",
                    count: 4,
                },
                attack: {
                    sprite: "images/player/player-idle.svg",
                    count: 0,
                },
            },

        },
        static: {
            world: "images/world/world.svg",
            wood: "images/fence/fence.svg",
            stone1: "images/fence/stone1.svg",
            stone2: "images/fence/stone2.svg",
            stone3: "images/fence/stone3.svg",
            bullet: "images/bullet/bullet1.svg",
            healthBonus: "images/bonuses/healthBonus.svg",
            menuBackground: "images/menu/background.svg",
            menuButtonPlay: "images/menu/buttons/play.svg",
            menuButtonOptions: "images/menu/buttons/options.svg",
        },
    },
    sounds: {
        bullet: "bullet.mp3",
    },
}
