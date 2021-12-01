export class Projectile
{
	constructor(gameScene)
	{
		this.scene = gameScene;
		this.projectileGraphics;
	}

	fire(x, y, velocity)
	{
		this.projectileGraphics = this.scene.physics.add.sprite(x, y, 'projectile');
		this.projectileGraphics.setVelocityX(velocity);
	}
}