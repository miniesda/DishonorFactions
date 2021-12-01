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
		this.leftPlayer = new Player(this, 300, 450, true, 40, 70, 'elfChampionData');
        this.leftPlayer.create();

        this.rightPlayer = new Player(this, 970, 450, false, 40, 70, 'humanChampionData');
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

		//Projectiles vs Towers
		this.physics.add.overlap(this.rightPlayer.getPlayerProjectileGroup(), this.leftTower.getTowerGraphics(), this.onProjectileCollisionWithLeftTower, null, this);
		this.physics.add.overlap(this.leftPlayer.getPlayerProjectileGroup(), this.rightTower.getTowerGraphics(), this.onProjectileCollisionWithRightTower, null, this);
		this.physics.add.overlap(this.rightPlayer.getPlayerProjectileGroup(), this.rightTower.getTowerGraphics(), this.onRightProjectileCollisionWithSameTower, null, this);
		this.physics.add.overlap(this.leftPlayer.getPlayerProjectileGroup(), this.leftTower.getTowerGraphics(), this.onLeftProjectileCollisionWithSameTower, null, this);

		//Projectiles vs NPC
		this.physics.add.overlap(this.leftNPCGroup, this.rightPlayer.getPlayerProjectileGroup(), this.onRightProjectileWithLeftNPCsCollision, null, this);
		this.physics.add.overlap(this.rightNPCGroup, this.leftPlayer.getPlayerProjectileGroup(), this.onLeftProjectileWithRightNPCsCollision, null, this);

		//Projectile vs Player
		this.physics.add.overlap(this.leftPlayer.getPlayerGraphics(), this.rightPlayer.getPlayerProjectileGroup(), this.onProjectileWithLeftPlayerCollision, null, this);
		this.physics.add.overlap(this.rightPlayer.getPlayerGraphics(), this.leftPlayer.getPlayerProjectileGroup(), this.onProjectileWithRightPlayerCollision, null, this);

		//NPC vs NPC
		this.physics.add.overlap(this.leftNPCGroup, this.rightNPCGroup, this.onNPCsCollision, null, this);

		//Left tower vs right NPC
		this.physics.add.overlap(this.rightNPCGroup, this.leftTower.getTowerGraphics(), this.onCollisionWithLeftTower, null, this);

		//Right tower vs left NPC
		this.physics.add.overlap(this.leftNPCGroup, this.rightTower.getTowerGraphics(), this.onCollisionWithRightTower, null, this);
	}

	onProjectileWithRightPlayerCollision(player, projectile)
	{
		this.rightPlayer.damagePlayer(10);
		this.leftPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
	}

	onProjectileWithLeftPlayerCollision(player, projectile)
	{
		this.leftPlayer.damagePlayer(10);
		this.rightPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
	}

	onRightProjectileWithLeftNPCsCollision(leftNPC, projectile)
	{
		this.rightPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
		this.leftNPCGroup.remove(leftNPC, true, true);
	}

	onLeftProjectileWithRightNPCsCollision(rightNPC, projectile)
	{
		this.leftPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
		this.rightNPCGroup.remove(rightNPC, true, true);
	}

	onRightProjectileCollisionWithSameTower(projectile, tower)
	{
		this.rightPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
	}

	onLeftProjectileCollisionWithSameTower(projectile, tower)
	{
		this.leftPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
	}

	onProjectileCollisionWithLeftTower(projectile, leftTower)
	{
		this.leftTower.damageTower(1);
		this.rightPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
	}

	onProjectileCollisionWithRightTower(projectile, leftTower)
	{
		this.rightTower.damageTower(1);
		this.leftPlayer.getPlayerProjectileGroup().remove(projectile, true, true);
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
		this.backgroundMusic = this.sound.add('gameBackgroundMusic');
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