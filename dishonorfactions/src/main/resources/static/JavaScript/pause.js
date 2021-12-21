export class Pause extends Phaser.Scene{
    constructor()
	{
		super({ key: 'pause' });
		this.goBackButton;
	}
    create(){
        this.add.image(0, 0, 'pauseBackground').setOrigin(0, 0);
		this.goBackButton = this.add.image(640,600,'goBackButton');
		this.goBackButton.setInteractive();
		this.goBackButton.on('pointerup', () => this.switchBackToMenuScene(this));
    }
    switchBackToMenuScene(currentScene)
	{
		currentScene.scene.wake('game');
	}
}