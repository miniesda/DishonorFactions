import { Tower } from './tower.js';
import { HealthBar } from './healthBar.js';

export class Game extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game' });
		this.leftTower;
		this.rightTower;
		this.leftHealthBar;
		this.rightHealthBar;
	}

	loadResources()
	{
		//this.load.image('c++', './Images/c++.png')
	}

	preload()
	{
		//this.loadResources();
		this.leftHealthBar = new HealthBar(this);
		this.leftHealthBar.preload();
	}

	initializeTowers()
	{
		this.leftTower = new Tower(100);
		this.rightTower = new Tower(100);
		this.leftTower.damageTower(55);
		console.log(this.leftTower.getCurrentLife());
	}

	create()
	{
		//this.add.image(400, 400, 'c++');
		this.initializeTowers();
		this.leftHealthBar.create();
	}

	update()
	{

	}
}