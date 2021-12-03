export class Preload extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'preload' });
	}

	loadResources()
	{
		//Background		
		this.load.image('background', './Art/fondo3.png');
		this.load.image('menu', './Art/menu.png');

		//Particle effects
		this.load.atlas('explosion', './Art/Particles/explosion.png', './Art/Particles/explosion.json');

		//Towers
		this.load.spritesheet('leftTower', './Art/leftTower.png', { frameWidth: 150, frameHeight: 550 });
		this.load.spritesheet('rightTower', './Art/rightTower.png', { frameWidth: 150, frameHeight: 550 });
		this.load.image('healthBar', './Art/healthBar.png');

		//Players
		this.load.spritesheet('humanChampion', './Art/Champions/humanChampion.png', { frameWidth: 70, frameHeight: 100 });
		this.load.spritesheet('orcChampion', './Art/Champions/orcChampion.png', { frameWidth: 70, frameHeight: 100 });
		this.load.spritesheet('elfChampion', './Art/Champions/elfChampion.png', { frameWidth: 70, frameHeight: 100 });
		this.load.json('humanChampionData', './JavaScript/JSON/humanChampionData.json');
		this.load.json('orcChampionData', './JavaScript/JSON/orcChampionData.json');
		this.load.json('elfChampionData', './JavaScript/JSON/elfChampionData.json');
		this.load.json('gameConfiguration', './JavaScript/JSON/gameConfiguration.json');

		//NPC
		this.load.spritesheet('orcNPC', './Art/Minions/minionOrco.png', { frameWidth: 60, frameHeight: 80 });
		this.load.spritesheet('elfoNPC', './Art/Minions/minionElfo.png', { frameWidth: 60, frameHeight: 80 });
		
		//Projectile
		this.load.image('orcProjectile', './Art/orcProjectile.png');
		this.load.image('elfProjectile', './Art/elfProjectile.png');
		this.load.image('humanProjectile', './Art/humanProjectile.png');

		this.load.image('pantalla', './Art/pantallaPersonajes.png');
        this.load.image('boton', './Art/botonSeleccionarPersonaje.png');
		this.load.image('boton2', './Art/botonSeleccionarPersonaje.png');
		this.load.image('boton3', './Art/botonSeleccionarPersonaje.png');
	}

	loadAudios()
	{
		//Music in game
		this.load.audio('gameBackgroundMusic', './Sounds/play.mp3');
		this.load.audio('menuBackgroundMusic', './Sounds/MainMenu.wav');
		this.load.audio('towerDamageMusic', './Sounds/actions/destroy.mp3');
		this.load.audio('selectionBackgroundMusic', './Sounds/characterSelection.wav');
	}

	preload()
	{
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;

		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(400, 320, 470, 50);
		this.load.on('progress', function (value) {
		    progressBar.clear();
		    progressBar.fillStyle(0xffffff, 1);
		    progressBar.fillRect(410, 330, 450 * value, 30);
		});
        
        var loadingText = this.make.text({
		    x: width / 2,
		    y: height / 2 - 100,
		    text: 'LOADING...',
		    style: {
		        font: '60px monospace',
		        fill: '#ffffff'
		    }
		});
		loadingText.setOrigin(0.5, 0.5);

		var complete = function()
		{
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();

			this.scene.start('menu');
		}

		this.load.on('complete', complete, {scene: this.scene});

		this.loadResources();
		this.loadAudios();
	}
}