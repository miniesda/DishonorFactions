import { HealthBar } from './healthBar.js';

export class Tower
{
	constructor(initialLife, gameScene, x, y, healthBarDisplacementX, healthBarDisplacementY)
	{
		this.scene = gameScene;
		this.lifePoints = initialLife;
		this.positionX = x;
		this.positionY = y;
		this.healthBar = new HealthBar(this.scene, this.lifePoints, this.positionX - healthBarDisplacementX, this.positionY - healthBarDisplacementY);
		this.towerGraphics;
	}

	create()
	{
		this.towerGraphics = this.scene.add.image(this.positionX, this.positionY, 'tower');
		//this.towerGraphics = this.scene.add.graphics();
		//this.towerGraphics.fillStyle(0x2ecc71, 1);
		//this.towerGraphics.fillRect(0, 0, 150, 550);
		//this.towerGraphics.x = this.positionX;
		//this.towerGraphics.y = this.positionY;

		this.healthBar.create();
	}

	flipTowerSprite()
	{
		this.towerGraphics.flipX = true;
		this.healthBar.flipHealthBarSprite();
	}

	getCurrentLife()
	{
		return this.lifePoints;
	}

	damageTower(damagePoints)
	{
		this.lifePoints -= damagePoints;

		if(this.lifePoints < 0)
		{
			this.lifePoints = 0;
		}

		this.healthBar.setValue(this.lifePoints);
	}
}