 const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1920,
  height: 1080,
  physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},

  scene: {
    init: initScene,
    preload: preloadScene,
    create: createScene,
    update: updateScene
  }
};

const game = new Phaser.Game(config);

function initScene(){}; 

function preloadScene() {
  // load background
  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  
  // load player
  this.load.svg('player', 'assets/players/player-fish.svg', { width: 200, height: 200 });
  
  // load rock obstacle 
  this.load.svg('rockObstacle', 'assets/obstacles/rock.svg');
};

function createScene() {
  // background
  window.addEventListener('resize', resize);
  resize();
  const background = this.add.image(0,0, 'background').setOrigin(0, 0);
  // let scaleX = this.cameras.main.width / background.width;
  // let scaleY = this.cameras.main.height / background.height;
  // let scale = Math.min(scaleX, scaleY);
  // background.setScale(scale).setScrollFactor(0);

  // player
  const screenCenterY = this.cameras.main.height / 2;
  this.player = this.physics.add.sprite(300, screenCenterY, 'player');

  // obstacle
  for(const obstacle of obstacleArray){
    setTimeout(()=>{const rock = this.physics.add.image(obstacle.x, obstacle.y, obstacle.name)
                    rock.setVelocityX(-300); }, obstacle.time)
  }
};

function updateScene(){
  // player moves up or down
  cursors = this.input.keyboard.createCursorKeys();
  // setting the speed that the player moves
  let velocity = 300;

  // limit of where the player can go
  let upperLim = this.player.height / 2;
  let lowerLim = game.canvas.height - upperLim;

  // player responds to the up and down keys being clicked, which can intercept a swipe
  if (cursors.down.isDown) {
    swipeDirection = ""
    if (this.player.y < lowerLim) {
      this.player.setVelocityY(velocity)
    } else {
      this.player.setVelocity(0)
    }
  } else if (cursors.up.isDown) {
    swipeDirection = ""
    if (this.player.y > upperLim){
      this.player.setVelocityY(-velocity)
    } else {
      this.player.setVelocity(0)
    }
  } else if (cursors.down.isUp) {
    this.player.setVelocityY(0)
  } else if (cursors.up.isUp) {
    this.player.setVelocityY(0)
  }
  
  // mimick swiping
  // if not 'down' and clicking is true
  if(!this.input.activePointer.isDown && isClicking == true) {

    // if the movement is more than 50
    if(Math.abs(this.input.activePointer.upY - this.input.activePointer.downY) >= 50) {
        // up swipe
        if(this.input.activePointer.upY < this.input.activePointer.downY) {
            swipeDirection = "up";
        // down swipe
        } else if(this.input.activePointer.upY > this.input.activePointer.downY) {
            swipeDirection = "down";
        }
    }
    isClicking = false;
  } else if(this.input.activePointer.isDown && isClicking == false) {
      isClicking = true;
  }

  // player swipes down
  if(swipeDirection == "down") {
    if (this.player.y < lowerLim) {
      this.player.setVelocityY(velocity)
    } else {
      this.player.setVelocity(0)
      swipeDirection = ""
    }
  }

  // player swipes up
  if(swipeDirection == "up") {
    if (this.player.y > upperLim){
      this.player.setVelocityY(-velocity)
    } else {
      this.player.setVelocity(0)
      swipeDirection = ""
    }
  }
};


// Additional code
let isClicking = false;
let swipeDirection;

function resize() {
  let canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
  let wratio = width / height, ratio = canvas.width / canvas.height;

  if (wratio < ratio) {
      canvas.style.width = width + "px";
      canvas.style.height = (width / ratio) + "px";
  } else {
      canvas.style.width = (height * ratio) + "px";
      canvas.style.height = height + "px";
  }
}

let obstacleArray = [
  {x: 2200,y: 900, name: 'rockObstacle', time: 1000}, 
  {x: 2200,y: 900, name: 'rockObstacle', time: 4000}, 
  {x: 2200,y: 900, name: 'rockObstacle', time: 7000}
  ];