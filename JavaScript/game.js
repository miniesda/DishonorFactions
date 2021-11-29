import { Tower } from './tower.js';
import { EnemySpawner } from './enemySpawner.js';
import { Player } from './player.js';
import { Button } from './button.js';

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
		this.leftPlayerVictoryOrDefeatText;
		this.rightPlayerVictoryOrDefeatText;
		this.gameHasAlreadyFinished = false;
		this.backToMenuButton;

		this.backgroundMusic;
	}

	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	initializeEnemySpawner()
	{
		this.leftNPCGroup = this.physics.add.group();
		this.leftEnemySpawner = new EnemySpawner(1, 180, 400, 'orcNPC', this, 125, 1, this.leftNPCGroup, 200);
		this.leftEnemySpawner.create();

		this.rightNPCGroup = this.physics.add.group();
		this.rightEnemySpawner = new EnemySpawner(1, 1080, 400, 'elfoNPC', this, 125, -1, this.rightNPCGroup, 200);
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
		this.leftPlayer = new Player(this, 'humanPlayer', 300, 450, 100, 100, true, 40, 70);
        this.leftPlayer.create();

        this.rightPlayer = new Player(this, 'humanPlayer', 600, 450, 100, 100, false, 40, 70);
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
	}

	onCollisionWithLeftTower(rightNPC, towerSprite)
	{
		this.rightNPCGroup.remove(rightNPC, true, true);

		this.leftTower.damageTower(30);
	}

	onCollisionWithRightTower(leftNPC, towerSprite)
	{
		this.leftNPCGroup.remove(leftNPC, true, true);

		this.rightTower.damageTower(30);
	}

	create()
	{
		this.gameHasAlreadyFinished = false;

		this.add.image(0, 0, 'background').setOrigin(0, 0);
		this.initializePlayers();
		this.initializeEnemySpawner();
		this.initializeTowers();
		this.handleCollisions();
		
		//Creamos variable audio para poder usar el play, stop, etc.
		this.backgroundMusic = this.sound.add('music1');
		this.backgroundMusic.play();
	}

	update()
	{
		if(this.gameHasAlreadyFinished) return;

		this.leftPlayer.update();

		this.rightPlayer.update();

		if(this.checkIfGameHasFinished())
		{
			this.finishGame();
		}
	}

	checkIfGameHasFinished()
	{
		if(this.leftTower.getHealth() == 0 || this.rightTower.getHealth() == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	finishGame()
	{
		this.gameHasAlreadyFinished = true;
		console.log('El juego ha terminado');

		//Stop spawning enemies and clear existing ones
		this.leftEnemySpawner.stopSpawning();
		this.leftNPCGroup.clear(true, true);
		this.rightEnemySpawner.stopSpawning();
		this.rightNPCGroup.clear(true, true);

		//Stop players movement
		this.leftPlayer.stopPlayerMovement();
		this.rightPlayer.stopPlayerMovement();

		//Print victory and defeat texts
		this.showVictoryAndDefeatTexts();
		
		this.showBackToMenuButton();
	}

	showVictoryAndDefeatTexts()
	{
		if(this.leftTower.getHealth() == 0)
		{
			this.leftPlayerVictoryOrDefeatText = this.add.text(250, 300, 'Defeat', { fontSize: 80 });
			this.rightPlayerVictoryOrDefeatText = this.add.text(750, 300, 'Victory', { fontSize: 80 });
		}
		else if(this.rightTower.getHealth() == 0)
		{
			this.leftPlayerVictoryOrDefeatText = this.add.text(250, 300, 'Victory', { fontSize: 80 });
			this.rightPlayerVictoryOrDefeatText = this.add.text(750, 300, 'Defeat', { fontSize: 80 });
		}
	}

	showBackToMenuButton()
	{
		this.backToMenuButton = new Button(630, 500, 'Back To Menu', this, this.switchToMenuScene);
	}

	switchToMenuScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('menu');
	}
}