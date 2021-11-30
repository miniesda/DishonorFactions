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
		

		const button = new Button(640, 245, 'JUGAR', this, () => console.log('game is started'));
		const button2 = new Button(640, 352, 'PERSONAJES', this, () => console.log('Entrando a personajes'));
		const button3 = new Button(640, 455, 'AJUSTES', this, () => console.log('settings'));
		const button4 = new Button(640, 565, 'SALIR', this, () => console.log('esc'));
	}

	update()
	{

	}
	prueba()
	{

	}
    
}