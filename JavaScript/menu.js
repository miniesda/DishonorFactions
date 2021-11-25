import { Button } from './button.js';

export class Menu extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'menu' });
		
	}
	
	loadResources()
	{
		this.load.image('menu', './Art/menu.png');
	
	}

	preload()
	{
		this.loadResources();
	}

	create()
	{
		
		this.add.image(0, 0, 'menu').setOrigin(0, 0);
		

		const button = new Button(640, 245, 'Jugar', this, () => console.log('game is started'));
	}

	update()
	{

	}
	prueba()
	{

	}
    
}