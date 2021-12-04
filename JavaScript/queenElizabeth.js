export class QueenElizabeth
{
	constructor(gameScene, x, y, petDispX, petDispY)
	{
		this.scene = gameScene;
		this.positionX = x;
		this.positionY = y;
		this.petDisplacementX = petDispX;
		this.petDisplacementY = petDispY;
		this.queenElizabethGraphics;
		this.queensPetGraphics;

		this.initialize();
	}

	initialize()
	{
		this.queenElizabethGraphics = this.scene.add.sprite(this.positionX, this.positionY, 'queen');
		this.queensPetGraphics = this.scene.add.sprite(this.positionX + this.petDisplacementX, this.positionY + this.petDisplacementY, 'queensPet');
		this.initializeAnimations();
		this.playAnimations();
	}

	initializeAnimations()
	{
		this.scene.anims.create(
			{
				key: 'queenDancing',
				frames: this.scene.anims.generateFrameNumbers('queen', { start: 0, end: 3 }),
				frameRate: 8,
				repeat: -1
			});

		this.scene.anims.create(
			{
				key: 'queensPetDancing',
				frames: this.scene.anims.generateFrameNumbers('queensPet', { start: 0, end: 1 }),
				frameRate: 5,
				repeat: -1
			});
	}

	playAnimations()
	{
		this.queenElizabethGraphics.anims.play('queenDancing');
		this.queensPetGraphics.anims.play('queensPetDancing');
	}

	setVisibility(newVisibility)
	{
		this.queenElizabethGraphics.visible = newVisibility;
		this.queensPetGraphics.visible = newVisibility;
	}
}