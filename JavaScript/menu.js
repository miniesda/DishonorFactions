import { Button } from './button.js';

export class Menu extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'menu' });
		this.playButton;
		this.creditsButton;
		this.backgroundMusic;
		this.settingsButton;
	}
	
	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{		
		this.add.image(0, 0, 'menu').setOrigin(0, 0);		

		this.playButton = new Button(640, 245, 'Jugar', this, this.switchToGameScene);
		this.creditsButton = new Button(640, 455, 'CRÉDITOS', this, this.switchToCreditsScene);
		this.settingsButton = new Button(640, 565, 'SALIR', this, () => console.log('esc'));

		this.backgroundMusic = this.sound.add('menuBackgroundMusic');
		this.backgroundMusic.play();
	}

	switchToGameScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('seleccion');
	}

	switchToCreditsScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('credits');
	}
}