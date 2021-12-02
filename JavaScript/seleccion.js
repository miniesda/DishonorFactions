export class Seleccion extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'seleccion' });
		this.backgroundMusic;
		this.preGameConfiguration;
		this.clicksCounter = 0;
	}

	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{
		this.backgroundMusic = this.sound.add('selectionBackgroundMusic');
		this.backgroundMusic.play();
		this.add.image(0, 0, 'pantalla').setOrigin(0, 0);
		var boton = this.add.image(250,630,'boton');
		var boton2 = this.add.image(650,630,'boton2');
		var boton3 = this.add.image(1050,630,'boton3');

		this.preGameConfiguration = this.cache.json.get('gameConfiguration');

		boton.setInteractive();
		boton.on('pointerup', () => this.clickConfiguration('elfChampionData'));
		boton2.setInteractive();
		boton2.on('pointerup', () => this.clickConfiguration('orcChampionData'));
		boton3.setInteractive();
		boton3.on('pointerup', () => this.clickConfiguration('humanChampionData'));
	}

	clickConfiguration(playerSelection)
	{
		//Incrementar contador
		this.clicksCounter++;

		//Guardar la seleccion en la variable
		if(this.clicksCounter == 1)
		{
			this.preGameConfiguration.leftPlayer = playerSelection;
		}
		else if(this.clicksCounter == 2)
		{
			this.preGameConfiguration.rightPlayer = playerSelection;
		}

		//Comprobar si ya todos los jugadores han elegido counter = 2
		if(this.clicksCounter == 2)
		{
			this.backgroundMusic.stop();
			this.scene.start('game', this.preGameConfiguration);
		}
	}
}