
export class Seleccion extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'seleccion' });
		
	}
	
	loadResources()
	{
		this.load.image('pantalla', './Art/pantallaPersonajes.png');
        this.load.image('boton', './Art/botonSeleccionarPersonaje.png');
		this.load.image('boton2', './Art/botonSeleccionarPersonaje.png');
		this.load.image('boton3', './Art/botonSeleccionarPersonaje.png');
	}

	preload()
	{
		this.loadResources();
	}

	create()
	{
		
		this.add.image(0, 0, 'pantalla').setOrigin(0, 0);
		var boton = this.add.image(250,630,'boton');
		var boton2 =this.add.image(650,630,'boton2');
		var boton3 =this.add.image(1050,630,'boton3');

		boton.setInteractive();
		boton.on('pointerup', function(pointer, localX, localY, event){
		console.log('hola');//cargar el personaje y cambiar escena
		});
		boton2.setInteractive();
		boton2.on('pointerup', function(pointer, localX, localY, event){
			//cargar el personaje y cambiar escena
		});
		boton3.setInteractive();
		boton3.on('pointerup', function(pointer, localX, localY, event){
				//cargar el personaje y cambiar escena
		});
	}

	
	
	update()
	{

	}
    
}