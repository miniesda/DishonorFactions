export class EnemySpawner
{
	constructor(rate, x, y, enemyName, gameScene)
	{
		this.scene = gameScene;
		this.spawningRate = rate * 1000;
		this.spawningPositionX = x;
		this.spawningPositionY = y;
		this.enemySpriteName = enemyName;
		this.timer;
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
				loop: true,
				startAt: 0,
				timeScale: 1
			});
	}

	spawnAnEnemy()
	{
		console.log("Spawn an enemy now!");
	}

	stopSpawning()
	{
		this.timer.remove();
	}
}