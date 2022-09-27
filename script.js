window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 720;

	class InputHandler {
		constructor() {
			//applies event listeners, keeps track of keys pressed
			this.keys = [];
			window.addEventListener('keydown', function (e) {
				console.log(e);
			});
		}
	}

	class Player {}

	class Background {}

	class Enemy {}

	const handleEnemies = () => {};

	const diplayStatusText = () => {};
	const animate = () => {};
});

const InputHandler = new InputHandler();
