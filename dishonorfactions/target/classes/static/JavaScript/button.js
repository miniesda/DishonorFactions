export class Button {
    constructor(x, y, label, backgroundID, scalingX, scalingY, textSize, paddingSize, scene, callback) {
        this.backgroundShadow = scene.add.image(x + 10, y + 10, backgroundID)
            .setOrigin(0.5)
            .setTint('0x141414')
            .setAlpha(0.5)
            .setScale(scalingX, scalingY)
            .setVisible(false);

        this.backgroundImage = scene.add.image(x, y, backgroundID)
            .setOrigin(0.5)
            .setScale(scalingX, scalingY)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.backgroundShadow.setVisible(true))
            .on('pointerout', () => this.backgroundShadow.setVisible(false));

        this.button = scene.add.text(x, y, label, {})
            .setOrigin(0.5)
            .setPadding(paddingSize)
            .setStyle({ fontSize: textSize});
            //.setStyle({ backgroundColor: '#9BC1BC', fill: '#100007', fontSize: textSize })
            //.setInteractive({ useHandCursor: true })
            //.on('pointerdown', () => callback())
            //.on('pointerover', () => this.button.setStyle({ fill: '#100007' }))
            //.on('pointerout', () => this.button.setStyle({ fill: '#100007' }));
    }

    setText(newText)
    {
        this.button.setText(newText);
    }
}

// Then later in one of your scenes, create a new button:
//const button = new Button(0, 0, 'Start Game', this, () => console.log('game is started'));