export class UsernameScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'username' });
	}

	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{
		var text = this.make.text({
		    x: this.cameras.main.width / 2,
		    y: this.cameras.main.height / 2 - 100,
		    text: 'TYPE YOUR USERNAME',
		    style: {
		        font: '60px monospace',
		        fill: '#ffffff'
		    }
		});
		text.setOrigin(0.5, 0.5);

		this.nameInput = this.add.dom(640, 360).createFromCache('usernameInputField');

		this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		this.returnKey.on("down", event =>
		{
	        let name = this.nameInput.getChildByName("name");
	        let password = this.nameInput.getChildByName("password");
	        if(name.value != "" && password.value != "")
	        {
	        	var username = 
	        	{
	        		"username": name.value,
	        		"password": password.value
	        	}

	            $.ajax(
		        {
		            type: "POST",
		            headers: { 
		                'Accept': 'application/json',
		                'Content-Type': 'application/json' 
		            },
		            url: "http://localhost:8080/username/register",
		            data: JSON.stringify(username),
		            dataType: "json"
		        }).done(function(data)
		        {
		            console.log("Hello, " + name.value);
		        });

		        name.value = "";
		        password.value = "";
	            this.scene.start('menu');
	        }
	    });
	}
}