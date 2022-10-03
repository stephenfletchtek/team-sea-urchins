export default class GameOver extends Phaser.Scene {
	constructor() {
		super('game-over');
	}

	init() {};

	preload() {
		// load background
		this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });

		// load start button
		this.load.image("start-game-button", "assets/startup/start-game-button.png")
	}

	create(data) {
		this.score = data.score
		// turn gravity off and set bounds of screen
		this.matter.world.disableGravity();
		this.matter.world.setBounds(0, 0, 1920, 1080, 1, false, false, false, true);

		// load in physics files for player
		let fishPhysics = this.cache.json.get("fish-physics");

		// background
		const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
		let scaleX = this.cameras.main.width / background.width;
		let scaleY = this.cameras.main.height / background.height;
		let scale = Math.min(scaleX, scaleY);
		background.setScale(scale).setScrollFactor(0);

		// game over text
		let width = this.game.renderer.width / 2;
		let height = this.game.renderer.height / 2;
		this.add.text(width, height, `GAME OVER\n Your score: ${this.score}`, {
			font: "bold 60px Arial",
			fill: "#fff",
		}).setOrigin(0.5).setDepth(1);

		// start game test
		let startAgain = this.add.text(width, height + 100, `Start again`, {
			font: "bold 30px Arial",
			fill: "#fff",
		}).setOrigin(0.5).setDepth(1);
		startAgain.setInteractive();
		startAgain.on("pointerup", () => {
			console.log("lets play again!")
			this.scene.start("game")
		})
	}
}
