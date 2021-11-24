import { Game } from './game.js'

const config = 
{
	type: Phaser.AUTO,
	scale:
	{
		parent: 'gameScreen',
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		min:
		{
			width: 850,
			height: 480
		},
		max:
		{
			width: 1280,
			height: 720
		}
	},
	scene: [Game],
	physics: 
	{
		default: 'arcade',
		arcade:
		{
			gravity:
			{
				y: 0
			},
			debug: false
		}
	}
}

var game = new Phaser.Game(config);