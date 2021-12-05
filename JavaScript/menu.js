import { Button } from './button.js';

export class Menu extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'menu' });
		this.playButton;
		this.playButtonShadow;
		this.creditsButton;
		this.creditsButtonShadow;
		this.backgroundMusic;
		this.settingsButton;
	}
	
	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{		
		//añadir imagenes a la escena
		this.add.image(0, 0, 'menu').setOrigin(0, 0);
		this.playButtonShadow = this.add.image(650, 350, 'botonJugar');
		this.playButtonShadow.tint = 0x000000;
		this.playButtonShadow.alpha = 0.5;
		this.playButtonShadow.visible = false;

		this.creditsButtonShadow = this.add.image(650, 460, 'botonCreditos');
		this.creditsButtonShadow.tint = 0x000000;
		this.creditsButtonShadow.alpha = 0.5;
		this.creditsButtonShadow.visible = false;

		this.playButton = this.add.image(640, 340, 'botonJugar');
		this.creditsButton = this.add.image(640, 450, 'botonCreditos');

		//hacer las imagenes de los botones interactivas
		this.playButton.setInteractive();
		this.creditsButton.setInteractive();

		//funciones de cada botón
		this.playButton.on('pointerup', () => this.switchToSelectionScene(this));
		this.playButton.on('pointerover', () => this.enableButtonShadow(this.playButtonShadow));
        this.playButton.on('pointerout', () => this.disableButtonShadow(this.playButtonShadow));

		this.creditsButton.on('pointerup', () => this.switchToCreditsScene(this));
		this.creditsButton.on('pointerover', () => this.enableButtonShadow(this.creditsButtonShadow));
        this.creditsButton.on('pointerout', () => this.disableButtonShadow(this.creditsButtonShadow));

		this.backgroundMusic = this.sound.add('menuBackgroundMusic');
		this.backgroundMusic.play();
	}

	switchToCreditsScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('credits');
	}

	switchToSelectionScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('seleccion');
	}

	enableButtonShadow(buttonShadow)
	{
		buttonShadow.visible = true;
	}

	disableButtonShadow(buttonShadow)
	{
		buttonShadow.visible = false;
	}
}