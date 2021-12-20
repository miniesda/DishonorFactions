export class EndOfTheGameScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'endOfTheGame' });
		this.ranking;
		this.endOfTheGameConfiguration;
		this.backgroundImage;
	}

	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	init(data)
	{
		this.endOfTheGameConfiguration = data;
	}

	create()
	{
		if(this.endOfTheGameConfiguration.winningTeam == "orcChampionData")
		{
			this.backgroundImage = this.add.image(0, 0, 'orcVictoryScreen').setOrigin(0, 0);
		}
		else if(this.endOfTheGameConfiguration.winningTeam == "elfChampionData")
		{
			this.backgroundImage = this.add.image(0, 0, 'elfVictoryScreen').setOrigin(0, 0);
		}
		else if(this.endOfTheGameConfiguration.winningTeam == "humanChampionData")
		{
			this.backgroundImage = this.add.image(0, 0, 'humanVictoryScreen').setOrigin(0, 0);
		}
	}

	showBackToMenuButton()
	{
		this.backToMenuButton = new Button(630, 500, 'Back To Menu', this, this.switchToMenuScene);
	}

	switchToMenuScene(currentScene)
	{
		currentScene.backgroundMusic.stop();
		currentScene.scene.start('menu');
	}
}