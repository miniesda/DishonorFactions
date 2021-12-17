export class Controls extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'controls' });
		this.goBackButton;
	}

	create()
	{
        console.log('hola');
		this.add.image(0, 0, 'controlsBackground').setOrigin(0, 0);
		this.goBackButton = this.add.image(200,650,'goBackButton');
		this.goBackButton.setInteractive();
		this.goBackButton.on('pointerup', () => this.switchBackToMenuScene(this));
	}

	switchBackToMenuScene(currentScene)
	{
		currentScene.scene.start('menu');
	}
}