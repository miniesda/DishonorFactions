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
		this.leftNPCGroup;
		this.rightNPCGroup;
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
		this.leftNPCGroup = this.physics.add.group();
		this.leftEnemySpawner = new EnemySpawner(1, 180, 400, 'orcNPC', this, 125, 1, this.leftNPCGroup, 100);
		this.leftEnemySpawner.create();

		this.rightNPCGroup = this.physics.add.group();
		this.rightEnemySpawner = new EnemySpawner(1, 1080, 400, 'orcNPC', this, 125, -1, this.rightNPCGroup, 100);
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

		//NPC vs NPC
		this.physics.add.overlap(this.leftNPCGroup, this.rightNPCGroup, this.onNPCsCollision, null, this);

		//Left tower vs right NPC
		this.physics.add.overlap(this.rightNPCGroup, this.leftTower.getTowerGraphics(), this.onCollisionWithLeftTower, null, this);

		//Right tower vs left NPC
		this.physics.add.overlap(this.leftNPCGroup, this.rightTower.getTowerGraphics(), this.onCollisionWithRightTower, null, this);
	}

	onNPCsCollision(leftNPC, rightNPC)
	{
		this.leftNPCGroup.remove(leftNPC, true, true);
		leftNPC.destroy();
		this.rightNPCGroup.remove(rightNPC, true, true);
		rightNPC.destroy();
		console.log('BOOM');
	}

	onCollisionWithLeftTower(rightNPC, towerSprite)
	{
		this.rightNPCGroup.remove(rightNPC, true, true);
		rightNPC.destroy();

		this.leftTower.damageTower(10);
	}

	onCollisionWithRightTower(leftNPC, towerSprite)
	{
		this.leftNPCGroup.remove(leftNPC, true, true);
		leftNPC.destroy();

		this.rightTower.damageTower(10);
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
	}
}