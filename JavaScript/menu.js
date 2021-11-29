import { Button } from './button.js';

export class Menu extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'menu' });
		this.playButton;
	}
	
	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{		
		this.add.image(0, 0, 'menu').setOrigin(0, 0);		

		this.playButton = new Button(640, 245, 'Jugar', this, () => this.scene.start('game'));
	}

	update()
	{

	}    
}