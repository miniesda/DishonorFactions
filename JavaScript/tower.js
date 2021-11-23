export class Tower
{
	constructor(initialLife)
	{
		this.lifePoints = initialLife;
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
	}
}