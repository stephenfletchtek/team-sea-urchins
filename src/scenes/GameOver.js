import BaseGame from './BaseGame.js';

export default class GameOver extends BaseGame {
	constructor() {
		super('game-over');
	}

	create(data) {
		this.score = data.score
		// background
		this.setStaticBackground()

		// game over text
		let width = this.cameras.main.width / 2;
		let height = this.cameras.main.height / 2;
		
		const end_game_image = this.add.image(
			this.game.renderer.width / 2,
			this.game.renderer.height / 2 - 100,
			'end-game-button'
		).setDepth(1);
	
		this.add.text(
			width,
			height + 25,
			`${this.score}`,
			{
				font: 'bold 80px Arial',
				fill: '#000000'
			}
		).setOrigin(0.5).setDepth(1);

		// start game text
		let startAgainButton = this.add.image(
			this.game.renderer.width / 2,
			this.game.renderer.height / 2 + 150,
			'start-again-button'
		).setDepth(1);

	startAgainButton.setInteractive();
	startAgainButton.on(
		'pointerup', () => {
			console.log('lets play again!');
			// this.music.stop();
			this.scene.start('game-play');
		}
		);
	}
}
