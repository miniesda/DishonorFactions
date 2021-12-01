import { Projectile } from './projectile.js';

export class ProjectileGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene)
	{
		super(scene.physics.world, scene);

		this.createMultiple(
			{
				classType: Projectile,
				frameQuantity: 30,
				active: false,
				visible: false,
				key: 'projectile'
			});
	}

	fireProjectile(x, y, velocity)
	{
		var projectile = this.getFirstDead(false);

		if(projectile)
		{
			projectile.fire(x, y, velocity);
		}
	}
}