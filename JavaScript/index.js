import { Game } from './game.js'

const config = 
{
	type: Phaser.AUTO,
	scale:
	{
		parent: 'game',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		min:
		{
			width: 850,
			height: 480
		},
		max:
		{
			width: 1270,
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