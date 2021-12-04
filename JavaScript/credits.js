import { Button } from './button.js';

export class Credits extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'credits' });
		this.goBackButton;
	}

	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{
		this.add.image(0, 0, 'creditsBackground').setOrigin(0, 0);
		this.goBackButton = this.add.image(250,630,'goBackButton');
		this.goBackButton.setInteractive();
		this.goBackButton.on('pointerup', () => this.switchBackToMenuScene(this));
	}

	switchBackToMenuScene(currentScene)
	{
		currentScene.scene.start('menu');
	}
}