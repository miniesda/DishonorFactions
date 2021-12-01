import { Projectile } from './projectile.js';

export class ProjectileGroup extends Phaser.Physics.Arcade.Group
{
	constructor(gameScene)
	{
		super(gameScene.physics.world, gameScene);
		this.scene = gameScene;
	}

	fireProjectile(x, y, velocity)
	{
		var projectile = new Projectile(this.scene, x, y);

		if(projectile)
		{
			this.add(projectile);
			projectile.fire(x, y, velocity);
		}
	}
}