import { HealthBar } from './HealthBar.js';

export class Player
{
	constructor(gameScene, name, x, y, velocityX, velocityY, usingKeys, healthBarHorizontalDisp, healthBarVerticalDisp)
	{
		this.scene = gameScene;
		this.spriteName = name;
		this.initialPositionX = x;
		this.initialPositionY = y;
		this.playerGraphics;
		
		this.horizontalVelocity = velocityX;
		this.verticalVelocity = velocityY;

		this.isUsingKeys = usingKeys;
		this.cursors;
		this.keyLeft;
		this.keyRight;
		this.keyUp;
		this.keyDown;

		this.healthBarHorizontalDisplacement = healthBarHorizontalDisp;
		this.healthBarVerticalDisplacement = healthBarVerticalDisp;
		this.healthBarPositionX = this.initialPositionX - this.healthBarHorizontalDisplacement;
		this.healthBarPositionY = this.initialPositionY - this.healthBarVerticalDisplacement;
		this.healthBar;

		this.isMoving = false;
	}

	getPlayerGraphics()
	{
		return this.playerGraphics;
	}

	create()
	{
		this.healthBar = new HealthBar(this.scene, 100, this.healthBarPositionX, this.healthBarPositionY);
		this.healthBar.create();
		this.healthBar.scaleBar(0.4, 0.7);

		this.playerGraphics = this.scene.physics.add.sprite(this.initialPositionX, this.initialPositionY, this.spriteName);
		//this.createAnimations();
		this.createInputs();
		this.playerGraphics.setCollideWorldBounds(true);
	}

	createInputs()
	{
		if(this.isUsingKeys)
		{
			this.keyLeft = this.scene.input.keyboard.addKeys("A");
        	this.keyRight = this.scene.input.keyboard.addKeys("D");
        	this.keyDown = this.scene.input.keyboard.addKeys("S");
        	this.keyUp = this.scene.input.keyboard.addKeys("W");
    	}
    	else
    	{
    		this.cursors = this.scene.input.keyboard.createCursorKeys();
    	}
	}

	createAnimations()
	{
		this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: this.spriteName, frame: 4 } ],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.spriteName, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
	}

	update()
	{
		this.isMoving = false;
		if(this.isUsingKeys)
		{
			if (this.keyLeft.A.isDown)
	        {
	            this.playerGraphics.setVelocityX(-this.horizontalVelocity);

	            //this.playerGraphics.anims.play('left', true);
	            this.isMoving = true;
	        }

	        else if (this.keyRight.D.isDown)
	        {
	            this.playerGraphics.setVelocityX(this.horizontalVelocity);

	            //this.playerGraphics.anims.play('right', true);
	            this.isMoving = true;
	        }
	        else
	        {	        	
	            this.playerGraphics.setVelocityX(0);
	        }

	        if (this.keyUp.W.isDown)
	        {
	            this.playerGraphics.setVelocityY(-this.verticalVelocity);

	            //this.playerGraphics.anims.play('right', true); //hay que cambiar el right ese por el sprite que sea
	            this.isMoving = true;
	        }

	        else if (this.keyDown.S.isDown)
	        {
	            this.playerGraphics.setVelocityY(this.verticalVelocity);

	            //this.playerGraphics.anims.play('right', true); //hay que cambiar el right ese por el sprite que sea
	            this.isMoving = true;
	        }
	        else
	        {
	        	this.playerGraphics.setVelocityY(0);
	        }

	        if(!this.isMoving)
	        {
	            //this.playerGraphics.anims.play('turn');
	            this.isMoving = false;
	        }
	    }
	    else
	    {
	    	if (this.cursors.left.isDown)
	        {
	            this.playerGraphics.setVelocityX(-this.horizontalVelocity);

	            //this.playerGraphics.anims.play('left', true);
	            this.isMoving = true;
	        }

	        else if (this.cursors.right.isDown)
	        {
	            this.playerGraphics.setVelocityX(this.horizontalVelocity);

	            //this.playerGraphics.anims.play('right', true);
	            this.isMoving = true;
	        }
	        else
	        {	        	
	            this.playerGraphics.setVelocityX(0);
	        }

	        if (this.cursors.up.isDown)
	        {
	            this.playerGraphics.setVelocityY(-this.verticalVelocity);

	            //this.playerGraphics.anims.play('right', true); //hay que cambiar el right ese por el sprite que sea
	            this.isMoving = true;
	        }

	        else if (this.cursors.down.isDown)
	        {
	            this.playerGraphics.setVelocityY(this.verticalVelocity);

	            //this.playerGraphics.anims.play('right', true); //hay que cambiar el right ese por el sprite que sea
	            this.isMoving = true;
	        }
	        else
	        {
	            this.playerGraphics.setVelocityY(0);
	        }

	        if(!this.isMoving)
	        {
	            //this.playerGraphics.anims.play('turn');
	        }
	    }

	    this.updateHealthBarPosition();
	}

	updateHealthBarPosition()
	{
		this.calculateHealthBarPosition();
	    this.healthBar.setPosition(this.healthBarPositionX, this.healthBarPositionY);
	}

	calculateHealthBarPosition()
	{
		this.healthBarPositionX = this.playerGraphics.x - this.healthBarHorizontalDisplacement;
		this.healthBarPositionY = this.playerGraphics.y - this.healthBarVerticalDisplacement;
	}

	stopPlayerMovement()
	{
		this.playerGraphics.setVelocityX(0);
		this.playerGraphics.setVelocityY(0);
		//this.playerGraphics.anims.play('turn');
	}
}