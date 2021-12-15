import { Game } from './game.js';
import { Menu } from './menu.js';
import { Preload } from './preloadScene.js';
import { Seleccion } from './seleccion.js';
import { Credits } from './credits.js';

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
	scene: [Preload, Menu, Credits, Seleccion, Game],
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

$(document).ready(function()
{
	var game = new Phaser.Game(config);
});