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
		this.controlsButton;
	}
	
	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{		
		//añadir imagenes a la escena
		this.add.image(0, 0, 'menu').setOrigin(0, 0);
		this.playButtonShadow = this.add.image(650, 310, 'botonJugar');
		this.playButtonShadow.tint = 0x000000;
		this.playButtonShadow.alpha = 0.5;
		this.playButtonShadow.visible = false;

		this.creditsButtonShadow = this.add.image(650, 410, 'botonCreditos');
		this.creditsButtonShadow.tint = 0x000000;
		this.creditsButtonShadow.alpha = 0.5;
		this.creditsButtonShadow.visible = false;

		this.controlsButtonShadow = this.add.image(650, 510, 'botonControles');
		this.controlsButtonShadow.tint = 0x000000;
		this.controlsButtonShadow.alpha = 0.5;
		this.controlsButtonShadow.visible = false;


		this.playButton = this.add.image(640, 300, 'botonJugar');
		this.creditsButton = this.add.image(640, 400, 'botonCreditos');
		this.controlsButton = this.add.image(640, 500, 'botonControles');

		//hacer las imagenes de los botones interactivas
		this.playButton.setInteractive();
		this.creditsButton.setInteractive();
		this.controlsButton.setInteractive();

		//funciones de cada botón
		this.playButton.on('pointerup', () => this.switchToSelectionScene(this));
		this.playButton.on('pointerover', () => this.enableButtonShadow(this.playButtonShadow));
        this.playButton.on('pointerout', () => this.disableButtonShadow(this.playButtonShadow));

		this.creditsButton.on('pointerup', () => this.switchToCreditsScene(this));
		this.creditsButton.on('pointerover', () => this.enableButtonShadow(this.creditsButtonShadow));
        this.creditsButton.on('pointerout', () => this.disableButtonShadow(this.creditsButtonShadow));

		this.controlsButton.on('pointerup', () => this.switchToControlsScene(this));
		this.controlsButton.on('pointerover', () => this.enableButtonShadow(this.controlsButtonShadow));
        this.controlsButton.on('pointerout', () => this.disableButtonShadow(this.controlsButtonShadow));


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

	switchToControlsScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('controls');
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