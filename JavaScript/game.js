import { Tower } from './tower.js';
import { EnemySpawner } from './enemySpawner.js';

export class Game extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game' });
		this.leftTower;
		this.rightTower;
		this.cursors;
		this.enemySpawner;
	}

	loadResources()
	{
		this.load.image('tower', './Art/tower.png');
		this.load.image('healthBar', './Art/healthBar.png');
		this.load.image('background', './Art/fondo2.png');
	}

	preload()
	{
		this.loadResources();
	}

	initializeTowers()
	{
		this.enemySpawner = new EnemySpawner(1, 300, 300, 'jj', this);
		this.enemySpawner.create();
		
		this.leftTower = new Tower(100, this, 75, 350, 10, 320, 70, 320);
		this.leftTower.create();

		this.rightTower = new Tower(100, this, 1205, 350, 10, 320, 0, 320);
		this.rightTower.create();
		this.rightTower.flipTowerSprite();

        this.cursors = this.input.keyboard.createCursorKeys();
	}

	create()
	{
		this.add.image(0, 0, 'background').setOrigin(0, 0);
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