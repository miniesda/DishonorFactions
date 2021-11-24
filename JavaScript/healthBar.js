export class HealthBar
{
	constructor(gameScene, initialValue, x, y)
	{
		this.scene = gameScene;
		this.healthBarGraphics;
		this.currentValue = initialValue;
		this.positionX = x;
		this.positionY = y;
		this.maxWidth = 200;
		this.maxHeight = 20;
		this.isFlipped = false;
	}

	create()
	{
		this.healthBarGraphics = this.scene.add.image(this.positionX, this.positionY, 'healthBar').setOrigin(0, 0);
		//this.healthBarGraphics = this.drawBar(0x2ecc71);
		this.setValue(this.currentValue);
	}

	drawBar(color)
	{
		var bar = this.scene.add.graphics();
		bar.fillStyle(color, 1);
		bar.fillRect(0, 0, this.maxWidth, this.maxHeight);
		bar.x = this.positionX;
		bar.y = this.positionY;
		return bar;
	}

	flipHealthBarSprite()
	{
		this.isFlipped = true;
		this.setValue(this.currentValue);
	}

	setValue(newValue)
	{
		if(this.isFlipped)
		{
			newValue *= -1;
		}
		this.healthBarGraphics.scaleX = newValue / 100;
	}
}