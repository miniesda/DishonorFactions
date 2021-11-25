import { Tower } from './tower.js';
import { EnemySpawner } from './enemySpawner.js';
import { Player } from './player.js';

export class Game extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game' });
		this.leftTower;
		this.rightTower;
		this.cursors;
		this.enemySpawner;
		this.playerLeft;
		this.playerRight;
	}

	loadResources()
	{
		//this.load.image('tower', './Art/assetsPrueba/torreSinRoca.png');
		this.load.spritesheet('tower', './Art/torreSinRoca.png', { frameWidth: 150, frameHeight: 550 });
		this.load.image('healthBar', './Art/healthBar.png');
		this.load.image('background', './Art/fondo2.png');
		this.load.spritesheet('humanPlayer', './Art/assetsPrueba/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
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

        this.leftPlayer = new Player(this, 'humanPlayer', 300, 450, 100, 100, true);
        this.leftPlayer.create();

        this.rightPlayer = new Player(this, 'humanPlayer', 600, 450, 100, 100, false);
        this.rightPlayer.create();
	}

	handleCollisions()
	{
		//Players vs Towers
		this.physics.add.collider(this.leftPlayer.getPlayerGraphics(), this.leftTower.getTowerGraphics());
		this.physics.add.collider(this.leftPlayer.getPlayerGraphics(), this.rightTower.getTowerGraphics());
		this.physics.add.collider(this.rightPlayer.getPlayerGraphics(), this.leftTower.getTowerGraphics());
		this.physics.add.collider(this.rightPlayer.getPlayerGraphics(), this.rightTower.getTowerGraphics());
	}

	create()
	{
		this.add.image(0, 0, 'background').setOrigin(0, 0);
		this.initializeTowers();
		this.handleCollisions();
	}

	update()
	{
		this.leftPlayer.update();

		this.rightPlayer.update();

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