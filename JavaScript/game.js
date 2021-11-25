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
		//Background		
		this.load.image('background', './Art/fondo2.png');

		//Towers
		this.load.spritesheet('leftTower', './Art/leftTower.png', { frameWidth: 150, frameHeight: 550 });
		this.load.spritesheet('rightTower', './Art/rightTower.png', { frameWidth: 150, frameHeight: 550 });
		this.load.image('healthBar', './Art/healthBar.png');

		//Players
		this.load.spritesheet('humanPlayer', './Art/assetsPrueba/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

		//NPC
		//this.load.spritesheet('orcNPC', './Art/minion orco andando.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('orcNPC', './Art/minion.png');
	}

	preload()
	{
		this.loadResources();
	}

	initializeEnemySpawner()
	{		
		this.leftEnemySpawner = new EnemySpawner(1, 180, 400, 'orcNPC', this, 125, 1);
		this.leftEnemySpawner.create();

		this.rightEnemySpawner = new EnemySpawner(1, 1080, 400, 'orcNPC', this, 125, -1);
		this.rightEnemySpawner.create();
	}

	initializeTowers()
	{		
		this.leftTower = new Tower(100, this, 65, 350, 0, 320, 60, 320, 'leftTower');
		this.leftTower.create();

		this.rightTower = new Tower(100, this, 1205, 350, 10, 320, 0, 320, 'rightTower');
		this.rightTower.create();
		this.rightTower.flipTowerSprite();
	}

	initializePlayers()
	{
		this.leftPlayer = new Player(this, 'humanPlayer', 300, 450, 100, 100, true);
        this.leftPlayer.create();

        this.rightPlayer = new Player(this, 'humanPlayer', 600, 450, 100, 100, false);
        this.rightPlayer.create();

        this.cursors = this.input.keyboard.createCursorKeys();
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
		this.initializeEnemySpawner();
		this.initializeTowers();
		this.initializePlayers();
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