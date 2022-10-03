import BaseGame from './BaseGame.js';

export default class GameOver extends BaseGame {
	constructor() {
		super('game-over');
	}

	create() {
		// background
		this.setStaticBackground()

		// game over text
		let width = this.cameras.main.width / 2;
		let height = this.cameras.main.height / 2;
		this.add.text(width, height, `GAME OVER`, {
			font: "bold 60px Arial",
			fill: "#fff",
		}).setOrigin(0.5).setDepth(1);

		// start game text
		let startAgain = this.add.text(width, height + 100, `Start again`, {
			font: "bold 30px Arial",
			fill: "#fff",
		}).setOrigin(0.5).setDepth(1);
		startAgain.setInteractive();
		startAgain.on("pointerup", () => {
			console.log("lets play again!")
			this.scene.start("game-play")
		})
	}
}
