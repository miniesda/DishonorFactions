export class NPC
{
	constructor(name, x, y, gameScene, dir)
	{
		this.scene = gameScene;
		this.spriteName = name;
		this.spawningPositionX = x;
		this.spawningPositionY = y;
		this.nPCGraphics;
		this.movementDirection = dir;

		this.createSprite();
		this.applyMovement();
	}

	createSprite()
	{
		this.nPCGraphics = this.scene.physics.add.sprite(this.spawningPositionX, this.spawningPositionY, this.spriteName);
	}

	applyMovement()
	{
		this.nPCGraphics.setVelocityX(this.movementDirection * 100);
	}

	killNPC()
	{

	}
}