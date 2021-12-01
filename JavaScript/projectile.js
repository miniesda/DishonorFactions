export class Projectile extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'projectile');
	}

	fire(x, y, velocity)
	{
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);

		this.setVelocityX(velocity);
	}

	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);

		if(this.x > 1280 || this.x < 0)
		{
			this.setActive(false);
			this.setVisible(false);
		}
	}
}