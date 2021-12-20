export class UsernameScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'username' });
		this.usernameValue;
		this.passwordValue;
		this.infoText;
		this.errorText;
		this.changeEnterModeButton;
		this.enterMode;
	}

	//////////////////////////////////////////////////////////////////
	//AQUÍ NO HACER PRELOAD, HACERLO EN EL ARCHIVO PRELOADSCENE.JS!!!!
	//////////////////////////////////////////////////////////////////

	create()
	{
		this.nameInput = this.add.dom(640, 360).createFromCache('usernameInputField');
		this.usernameValue = this.nameInput.getChildByName("name");
	    this.passwordValue = this.nameInput.getChildByName("password");

	    this.errorText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 250, "", {fontSize: 20, strokeThickness: 1.5}).setOrigin(0.5, 0.5);
		this.hideErrorMessage();

		this.infoText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 200, "", {fontSize: 100, strokeThickness: 1.5}).setOrigin(0.5, 0.5);

		this.changeEnterModeButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 150, "", {fontSize: 40, strokeThickness: 1.5}).setOrigin(0.5, 0.5);
		this.changeToLogin();

		this.changeEnterModeButton.setInteractive();
		this.changeEnterModeButton.on('pointerup', () => 
			{
				if(this.changeEnterModeButton.text == 'Log in here')
				{
					this.changeToLogin();
				}
				else if(this.changeEnterModeButton.text == 'Register here')
				{
					this.changeToRegister();
				}
			});

		this.changeEnterModeButton.on('pointerover', () => this.changeEnterModeButton.setColor("#FC814A"));
        this.changeEnterModeButton.on('pointerout', () => this.changeEnterModeButton.setColor("#BFBFBF"));

		this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		this.returnKey.on("down", event =>
		{
	        if(this.usernameValue.value != "" && this.passwordValue.value != "")
	        {
	        	var username = 
	        	{
	        		"username": this.usernameValue.value,
	        		"password": this.passwordValue.value
	        	}
	        	if(this.enterMode == 'Register')
	        	{
	            	this.sendRegisterPetition(username);
	        	}
	        	else if(this.enterMode == 'Login')
	        	{
	        		this.sendLoginPetition(username);
	        	}
	        }
	    });
	}

	changeToMenu()
	{
		this.scene.start('menu');
	}

	showErrorMessage(error, errorBody)
	{
		this.errorText.setText("Error: " + error + ". " + errorBody);
		this.errorText.setVisible(true);
	}

	hideErrorMessage()
	{
		this.errorText.setVisible(false);
	}

	changeToLogin()
	{
		this.enterMode = "Login";		
		this.infoText.setText("LOG IN");
		this.changeEnterModeButton.setText("Register here");
		this.usernameValue.value = "";
		this.passwordValue.value = "";
		this.hideErrorMessage();
	}

	changeToRegister()
	{
		this.enterMode = "Register";
		this.infoText.setText("REGISTER");
		this.changeEnterModeButton.setText("Log in here");
		this.usernameValue.value = "";
		this.passwordValue.value = "";
		this.hideErrorMessage();
	}

	sendRegisterPetition(username)
	{
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
        }).done((data)=>
        {
        	this.usernameValue = "";
			this.passwordValue.value = "";
            this.changeToMenu();
        }).fail((data) =>
        {
        	var errorBody = "";
        	if(JSON.stringify(data.status) == 409)
        	{
        		errorBody = "The username already exists. Try to login or choose a valid username.";
        	}
        	this.showErrorMessage(JSON.stringify(data.status), errorBody);
        });
	}

	sendLoginPetition(username)
	{
		$.ajax(
        {
            type: "PUT",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url: "http://localhost:8080/username/login",
            data: JSON.stringify(username),
            dataType: "json"
        }).done((data)=>
        {
        	this.usernameValue = "";
			this.passwordValue.value = "";
            this.changeToMenu();
        }).fail((data) =>
        {
        	var errorBody = "";
        	if(JSON.stringify(data.status) == 404)
        	{
        		errorBody = "The username and/or password are incorrect.";
        	}
        	this.showErrorMessage(JSON.stringify(data.status), errorBody);
        });
	}
}