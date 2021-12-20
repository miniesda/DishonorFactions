import { NPC } from './nPC.js';

export class EnemySpawner
{
	constructor(rate, x, y, enemyName, gameScene, rowDisp, spawnDir, group, speed)
	{
		this.scene = gameScene;
		this.nPCSpeed = speed;
		this.spawningRate = rate * 2000;
		this.spawningPositionX = x;
		this.enemySpriteName = enemyName;
		this.timer;
		this.posibleSpawnPositionY = [y - rowDisp, y, y + rowDisp];
		this.spawningDirection = spawnDir;
		this.nPCGroup = group;
		this.movementAnimationKey;
	}

	createAnimations()
	{
		var start;
		var end;
		if(this.spawningDirection > 0)
		{
			this.movementAnimationKey = 'leftMovement';
			start = 0;
			end = 5;
		}
		else if(this.spawningDirection < 0)
		{
			this.movementAnimationKey = 'rightMovement';
			start = 10;
			end = 13;
		}

		this.scene.anims.create(
			{
				key: this.movementAnimationKey,
				frames: this.scene.anims.generateFrameNumbers(this.enemySpriteName, { start, end }),
				frameRate: 10,
				repeat: -1
			});
	}

	create()
	{
		this.createAnimations();
	}

	startSpawning()
	{
		this.timer = this.scene.time.addEvent(
			{
				delay: this.spawningRate,
				callback: this.spawnAnEnemy,
				args: [this.scene, this.enemySpriteName, this.spawningPositionX, this.posibleSpawnPositionY, this.spawningDirection, this.nPCGroup, this.nPCSpeed, this.movementAnimationKey],
				loop: true,
				startAt: 0,
				timeScale: 1
			});
	}

	spawnAnEnemy(gameScene, enemyName, spawnPositionX, spawnPositionY, dir, group, speed, movementAnimationName)
	{
		var randomIndex = Phaser.Math.Between(0, 2);

		var nPC = gameScene.physics.add.sprite(spawnPositionX, spawnPositionY[randomIndex], enemyName);

		nPC.anims.play(movementAnimationName, true);
		group.add(nPC);
		nPC.setVelocityX(dir * speed);
	}

	stopSpawning()
	{
		this.timer.remove();
	}
}