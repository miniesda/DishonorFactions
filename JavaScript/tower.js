import { HealthBar } from './healthBar.js';

export class Tower
{
	constructor(initialLife, gameScene, x, y, healthBarDisplacementX, healthBarDisplacementY, textDisplacementX, textDisplacementY)
	{
		this.scene = gameScene;
		this.lifePoints = initialLife;
		this.positionX = x;
		this.positionY = y;
		this.healthBarPositionX = this.positionX - healthBarDisplacementX;
		this.healthBarPositionY = this.positionY - healthBarDisplacementY;
		this.healthBar = new HealthBar(this.scene, this.lifePoints, this.healthBarPositionX, this.healthBarPositionY);
		this.textPositionX = this.positionX - textDisplacementX;
		this.textPositionY = this.positionY - textDisplacementY;
		this.lifeTextGraphics;
		this.towerGraphics;
	}

	getTowerGraphics()
	{
		return this.towerGraphics;
	}

	createAnimations()
	{
		this.scene.anims.create({
            key: 'fullHealthTower',
            frames: [ { key: 'tower', frame: 0 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'upperHealthTower',
            frames: [ { key: 'tower', frame: 1 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'middleHealthTower',
            frames: [ { key: 'tower', frame: 2 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'almostDestroyedHealthTower',
            frames: [ { key: 'tower', frame: 3 } ],
            frameRate: 20
        });
	}

	create()
	{
		this.towerGraphics = this.scene.physics.add.staticGroup();
		this.towerGraphics.create(this.positionX, this.positionY, 'tower');
		this.createAnimations();
		this.handleAnimations();

		this.healthBar.create();
		this.lifeTextGraphics = this.scene.add.text(this.textPositionX, this.textPositionY, this.lifePoints, {fontSize: 25, strokeThickness: 2});
	}

	flipTowerSprite()
	{
		this.healthBar.flipHealthBarSprite();
	}

	getCurrentLife()
	{
		return this.lifePoints;
	}

	handleAnimations()
	{
		if(this.lifePoints > 80)
		{
			this.towerGraphics.playAnimation('fullHealthTower');
		}
		else if(this.lifePoints > 40)
		{
			this.towerGraphics.playAnimation('upperHealthTower');
		}
		else if(this.lifePoints > 20)
		{
			this.towerGraphics.playAnimation('middleHealthTower');
		}
		else
		{
			this.towerGraphics.playAnimation('almostDestroyedHealthTower');
		}
	}

	damageTower(damagePoints)
	{
		this.lifePoints -= damagePoints;

		if(this.lifePoints < 0)
		{
			this.lifePoints = 0;
		}

		this.updateHealthBar(this.lifePoints);
		this.updateLifeText(this.lifePoints);

		this.handleAnimations();
	}

	updateHealthBar(newValue)
	{
		this.healthBar.setValue(newValue);
	}

	updateLifeText(newValue)
	{
		this.lifeTextGraphics.setText(newValue);
	}
}