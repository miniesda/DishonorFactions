import { Tower } from './tower.js';
import { EnemySpawner } from './enemySpawner.js';
import { Player } from './player.js';
import { Button } from './button.js';
import { QueenElizabeth } from './queenElizabeth.js';

export class Game extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game' });
		this.leftTower;
		this.rightTower;
		this.queenElizabeth;
		this.cursors;
		this.enemySpawner;
		this.playerLeft;
		this.playerRight;
		this.leftNPCGroup;
		this.rightNPCGroup;
		this.leftPlayerVictoryOrDefeatText;
		this.rightPlayerVictoryOrDefeatText;
		this.gameHasAlreadyFinished = false;
		this.gameHasStarted = false;
		this.backToMenuButton;
		this.gameConfigurationData;
		this.initialTimer;
		this.initialCountdownText;
		this.initialCountdownSecondsLeft = 5;
		this.queenElizabethGraphics;
		this.queensPetGraphics;
		this.tictacSound;

		this.backgroundMusic;
	}

	init(data)
	{
		this.gameConfigurationData = data;
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
		this.leftPlayer = new Player(this, 300, 450, true, 40, 70, this.gameConfigurationData.leftPlayer);
        this.leftPlayer.create();

        this.rightPlayer = new Player(this, 970, 450, false, 40, 70, this.gameConfigurationData.rightPlayer);
        this.rightPlayer.create();

        this.cursors = this.input.keyboard.createCursorKeys();
	}

	initializeInitialCountdown()
	{
		this.initialCountdownText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 
			this.initialCountdownSecondsLeft, {fontSize: 100, strokeThickness: 2}).setOrigin(0.5, 0.5);

		this.queenElizabeth = new QueenElizabeth(this, this.cameras.main.width / 2, (this.cameras.main.height / 2) - 180,
		 90, 50);

		this.tictacSound.play();
		
		this.initialTimer = this.time.addEvent(
			{
				delay: 1000,
				callback: ()=>
				{
					this.initialCountdownSecondsLeft -= 1;

					if(this.initialCountdownSecondsLeft == 0)
					{
						this.initialCountdownText.setText('¡LUCHA!');
					}
					else if(this.initialCountdownSecondsLeft < 0)
					{
						this.gameHasStarted = true;
						this.initialCountdownText.visible = false;
						this.queenElizabeth.setVisibility(false);

						this.leftEnemySpawner.startSpawning();
						this.rightEnemySpawner.startSpawning();

						this.tictacSound.stop();
					}
					else
					{
						console.log(this.initialCountdownSecondsLeft);
						this.initialCountdownText.setText(this.initialCountdownSecondsLeft);
					}
				},
				repeat: 5
			});
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
		this.leftPlayer.damagePlayer(40);
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
		this.tictacSound = this.sound.add('tictacMusic');
		this.initializeInitialCountdown();
	}

	update()
	{
		if(!this.gameHasStarted) return;
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
			this.leftPlayerVictoryOrDefeatText = this.add.image(350, 300, 'defeatText');
			this.rightPlayerVictoryOrDefeatText = this.add.image(850, 300, 'victoryText');
		}
		else if(this.rightTower.getHealth() == 0)
		{
			this.leftPlayerVictoryOrDefeatText = this.add.image(350, 300, 'victoryText');
			this.rightPlayerVictoryOrDefeatText = this.add.image(850, 300, 'defeatText');
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