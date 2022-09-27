window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1080;
	canvas.height = 720;

	class InputHandler {
		constructor() {
			//applies event listeners, keeps track of keys pressed
			this.keys = [];
			window.addEventListener('keydown', (e) => {
				console.log(e.key);
				if (
					(e.key === 'ArrowDown' ||
						e.key === 'ArrowUp' ||
						e.key === 'ArrowLeft' ||
						e.key === 'ArrowRight') &&
					this.keys.indexOf(e.key) === -1
				) {
					this.keys.push(e.key);
				}
			});
			window.addEventListener('keyup', (e) => {
				if (
					e.key === 'ArrowDown' ||
					e.key === 'ArrowUp' ||
					e.key === 'ArrowLeft' ||
					e.key === 'ArrowRight'
				) {
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
			});
		}
	}

	class Player {
		constructor(gameWidth, gameHeight) {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.width = 500;
			this.height = 320;
			this.x = 0;
			this.y = this.gameHeight - this.height; //(this.gameHeight - this.height)/2 for sub;
			this.image = document.getElementById('playerImage');
			this.frameX = 0; //these move along the spritesheet to grab whichever animation frame  
			this.frameY = 0;
			this.speed = 0;
			this.vy = 0; // y-velocity (remember negative sign means go up)
			this.weight = 1;

		}

		draw(context) {
			context.fillStyle = 'white';
			context.fillRect(this.x, this.y, this.width, this.height);
			context.drawImage(
				this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height
			); //s_ = coords in spritesheet
		}

		update(input) {
			if (input.keys.indexOf('ArrowRight') > -1) {
				this.speed = 5;
			} else if (input.keys.indexOf('ArrowLeft') > -1) {
				this.speed = -5; //should this be -3 to make the left/right movement the same 
			} else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
				this.vy -= 25
			} else {
				this.speed = 0;
			}

			// set limits so you can't go off screen
			// horizontal movement
			this.x += this.speed;
			if (this.x < 0) this.x = 0;
			else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

			// vertical movemet
			this.y += this.vy
			if (!this.onGround()) {
				this.vy += this.weight; // acceleration due to gravity
				// animate the jump (pick a different sprite image)
				this.frameY = 1;
			} else {
				this.vy = 0;
				this.frameY = 0;
			}

			// stops it partly dropping off bottom
			if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
		}

		onGround() {
			return this.y >= this.gameHeight - this.height;
		}
	}

	class Background {
		constructor() {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.image = document.getElementById()
		}
	}

	class Enemy { }

	const handleEnemies = () => { };

	const diplayStatusText = () => { };

	const input = new InputHandler();
	const player = new Player(canvas.width, canvas.height);
	player.draw(ctx);
	player.update(input);

	const animate = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		player.draw(ctx);
		player.update(input);
		this.requestAnimationFrame(animate);
	};
	animate();
});
