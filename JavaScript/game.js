import { Tower } from './tower.js';

export class Game extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game' });
		this.leftTower;
		this.rightTower;
		this.cursors;
	}

	loadResources()
	{
		this.load.image('tower', './Art/tower.png');
		this.load.image('healthBar', './Art/healthBar.png');
	}

	preload()
	{
		this.loadResources();
	}

	initializeTowers()
	{
		this.leftTower = new Tower(100, this, 75, 350, 50, 320);
		this.leftTower.create();

		this.rightTower = new Tower(100, this, 1205, 350, -35, 320);
		this.rightTower.create();
		this.rightTower.flipTowerSprite();

        this.cursors = this.input.keyboard.createCursorKeys();
	}

	create()
	{
		//this.add.image(400, 400, 'c++');
		this.initializeTowers();
	}

	update()
	{
		if(this.cursors.left.isDown)
		{			
			this.leftTower.damageTower(2);
		}
		else if(this.cursors.right.isDown)
		{
			this.rightTower.damageTower(2);
		}
	}
}