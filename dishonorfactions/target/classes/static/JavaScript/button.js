export class Button {
    constructor(x, y, label, textSize, paddingSize, scene, callback) {
        this.button = scene.add.text(x, y, label, {})
            .setOrigin(0.5)
            .setPadding(paddingSize) 
            .setStyle({ backgroundColor: '#9BC1BC', fill: '#100007', fontSize: textSize })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.button.setStyle({ backgroundColor: '#808F87', fill: '#100007' }))
            .on('pointerout', () => this.button.setStyle({ backgroundColor: '#9BC1BC', fill: '#100007' }));
    }

    setText(newText)
    {
        this.button.setText(newText);
    }
}

// Then later in one of your scenes, create a new button:
//const button = new Button(0, 0, 'Start Game', this, () => console.log('game is started'));