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
		//añadir imagenes a la escena
		this.add.image(0, 0, 'menu').setOrigin(0, 0);		
		var botonJugar = this.add.image(640, 243, 'botonJugar');
		var botonPersonajes = this.add.image(640, 348, 'botonPersonajes');
		var botonCreditos = this.add.image(640, 453, 'botonCreditos');
		var botonSalir = this.add.image(640, 560, 'botonSalir');

		//hacer las imagenes de los botones interactivas
		botonJugar.setInteractive();
		botonPersonajes.setInteractive();
		botonCreditos.setInteractive();
		botonSalir.setInteractive();

		//funciones de cada botón
		botonJugar.on('pointerup', () => this.switchToGameScene('game'));
		botonPersonajes.on('pointerup', () => this.switchToSelectionScene('game'));
		botonCreditos.on('pointerup', () => this.switchToCreditScene('game'));
		//botonSalir.on('pointerup',/*no se que poner aqui jaja)*/);

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

	switchToSelectionScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('seleccion');
	}
}