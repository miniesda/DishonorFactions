export class Game extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game' });
	}

	loadResources()
	{
		this.load.image('c++', './Images/c++.png')
	}

	preload()
	{
		this.loadResources();
	}

	create()
	{
		this.add.image(400, 400, 'c++');
	}

	update()
	{

	}
}