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
  // swipe player


  // load background
  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  
  // load player
  this.load.svg('player', 'assets/players/player-fish.svg', { width: 200, height: 200 });
  
  // load rock obstacle 
  this.load.svg('rockObstacle', 'assets/obstacles/rock.svg');
};

function createScene() {
  // swipe player


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
  this.player.setScale(0.7).setScrollFactor(0);

  // obstacle
  for(const obstacle of obstacleArray){
    setTimeout(()=>{const rock = this.physics.add.image(obstacle.x, obstacle.y, obstacle.name)
                    rock.setVelocityX(-300); }, obstacle.time)
  }
};

function updateScene(){
  // player moves up or down
  cursors = this.input.keyboard.createCursorKeys()
  let velocity = 250
  if (cursors.down.isDown) {
    this.player.setVelocityY(velocity)
  } else if (cursors.up.isDown) {
    this.player.setVelocityY(-velocity)
  } else if (cursors.down.issUp) {
    this.player.setVelocityY(0)
  } else if (cursors.up.isUp) {
    this.player.setVelocityY(0)
  }
  
  };


// Additional code

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