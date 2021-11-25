import { NPC } from './nPC.js';

export class EnemySpawner
{
	constructor(rate, x, y, enemyName, gameScene, rowDisp, spawnDir)
	{
		this.scene = gameScene;
		this.spawningRate = rate * 1000;
		this.spawningPositionX = x;
		this.enemySpriteName = enemyName;
		this.timer;
		this.posibleSpawnPositionY = [y - rowDisp, y, y + rowDisp];
		this.spawningDirection = spawnDir;
	}

	create()
	{
		this.startSpawning();
	}

	startSpawning()
	{
		this.timer = this.scene.time.addEvent(
			{
				delay: this.spawningRate,
				callback: this.spawnAnEnemy,
				args: [this.scene, this.enemySpriteName, this.spawningPositionX, this.posibleSpawnPositionY, this.spawningDirection],
				loop: true,
				startAt: 0,
				timeScale: 1
			});
	}

	spawnAnEnemy(gameScene, enemyName, spawnPositionX, spawnPositionY, dir)
	{
		var randomIndex = Phaser.Math.Between(0, 2);

		console.log("Spawn an enemy now!");
		var nPC = new NPC(enemyName, spawnPositionX, spawnPositionY[randomIndex], gameScene, dir);

	}

	stopSpawning()
	{
		this.timer.remove();
	}
}