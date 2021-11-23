export class HealthBar
{
	constructor(gameScene)
	{
		this.scene = gameScene;
	}

	preload()
	{
		this.scene.load.image('left-cap', './Art/healthBar/barHorizontal_green_left.png');
		this.scene.load.image('middle', './Art/healthBar/barHorizontal_green_mid.png');
		this.scene.load.image('right-cap', './Art/healthBar/barHorizontal_green_right.png');

		this.scene.load.image('left-cap-shadow', './Art/healthBar/barHorizontal_shadow_left.png');
		this.scene.load.image('middle-shadow', './Art/healthBar/barHorizontal_shadow_mid.png');
		this.scene.load.image('right-cap-shadow', './Art/healthBar/barHorizontal_shadow_right.png');
	}

	create()
	{
		this.scene.add.image(24, 10, 'left-cap').setOrigin(0, 0);
		this.scene.add.image(24, 10, 'middle').setOrigin(0, 0);
	}
}