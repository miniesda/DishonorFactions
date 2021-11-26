import { NPC } from './nPC.js';

export class EnemySpawner
{
	constructor(rate, x, y, enemyName, gameScene, rowDisp, spawnDir, group)
	{
		this.scene = gameScene;
		this.spawningRate = rate * 1000;
		this.spawningPositionX = x;
		this.enemySpriteName = enemyName;
		this.timer;
		this.posibleSpawnPositionY = [y - rowDisp, y, y + rowDisp];
		this.spawningDirection = spawnDir;
		this.nPCGroup = group;
	}

	create()
	{
		this.startSpawning();
	}

	initializeNPCCollisions()
	{

	}

	startSpawning()
	{
		this.timer = this.scene.time.addEvent(
			{
				delay: this.spawningRate,
				callback: this.spawnAnEnemy,
				args: [this.scene, this.enemySpriteName, this.spawningPositionX, this.posibleSpawnPositionY, this.spawningDirection, this.nPCGroup],
				loop: true,
				startAt: 0,
				timeScale: 1
			});
	}

	spawnAnEnemy(gameScene, enemyName, spawnPositionX, spawnPositionY, dir, group)
	{
		var randomIndex = Phaser.Math.Between(0, 2);

		console.log("Spawn an enemy now!");
		//var nPC = new NPC(enemyName, spawnPositionX, spawnPositionY[randomIndex], gameScene, dir, group);
		var nPC = gameScene.physics.add.sprite(spawnPositionX, spawnPositionY[randomIndex], enemyName);
		group.add(nPC);
		nPC.setVelocityX(dir * 100);
	}

	stopSpawning()
	{
		this.timer.remove();
	}
}