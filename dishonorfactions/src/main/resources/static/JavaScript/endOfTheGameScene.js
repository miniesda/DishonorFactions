export class EndOfTheGameScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'endOfTheGame' });
		this.ranking;
		this.endOfTheGameConfiguration;
		this.backgroundImage;
		this.firstRowUsernameText;
		this.firstRowPointsText;
		this.secondRowUsernameText;
		this.secondRowPointsText;
		this.thirdRowUsernameText;
		this.thirdRowPointsText;
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

		this.createRankingTexts();

		this.sendGetRankingRowsPetition();
	}

	createRankingTexts()
	{
		this.firstRowUsernameText = this.add.text(800, 145, "HOLA", {fontSize: 35, strokeThickness: 1.5}).setOrigin(0, 0.5);
		this.firstRowPointsText = this.add.text(1100, 145, "HOLAS", {fontSize: 35, strokeThickness: 1.5}).setOrigin(0, 0.5);
		this.secondRowUsernameText = this.add.text(800, 245, "HOLAA", {fontSize: 35, strokeThickness: 1.5}).setOrigin(0, 0.5);
		this.secondRowPointsText = this.add.text(1100, 245, "HOLS", {fontSize: 35, strokeThickness: 1.5}).setOrigin(0, 0.5);
		this.thirdRowUsernameText = this.add.text(800, 345, "HOLAS", {fontSize: 35, strokeThickness: 1.5}).setOrigin(0, 0.5);
		this.thirdRowPointsText = this.add.text(1100, 345, "HOLA", {fontSize: 35, strokeThickness: 1.5}).setOrigin(0, 0.5);

		this.setRankingVisible(false);
	}

	setRankingVisible(visible)
	{
		this.firstRowUsernameText.setVisible(visible);
		this.firstRowPointsText.setVisible(visible);
		this.secondRowUsernameText.setVisible(visible);
		this.secondRowPointsText.setVisible(visible);
		this.thirdRowUsernameText.setVisible(visible);
		this.thirdRowPointsText.setVisible(visible);
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

	sendGetRankingRowsPetition()
	{
		$.ajax(
			{
				type: "GET",
				url: "/ranking",
				dataType: "json"
			}).done((data)=>
			{
				this.showRanking(data);
				console.log(JSON.stringify(data));
			}).fail(()=>
			{
				console.log("fail");
			});
	}

	showRanking(rankingJSON)
	{
		this.firstRowUsernameText.setText(rankingJSON[0].username);
		this.firstRowPointsText.setText(rankingJSON[0].points);
		this.secondRowUsernameText.setText(rankingJSON[1].username);
		this.secondRowPointsText.setText(rankingJSON[1].points);
		this.thirdRowUsernameText.setText(rankingJSON[2].username);
		this.thirdRowPointsText.setText(rankingJSON[2].points);

		this.setRankingVisible(true);
	}
}