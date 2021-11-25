export class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label,{fontFamily:"fuenteMenu"})
            .setOrigin(0.5)
            .setPadding(10) 
            .setStyle({ fontSize: 60 })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#000000' }))
            .on('pointerout', () => button.setStyle({ fill: '#000000' }));
    }
}

// Then later in one of your scenes, create a new button:
//const button = new Button(0, 0, 'Start Game', this, () => console.log('game is started'));