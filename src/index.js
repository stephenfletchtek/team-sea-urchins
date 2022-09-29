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

function initScene() { };

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
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
  // let scaleX = this.cameras.main.width / background.width;
  // let scaleY = this.cameras.main.height / background.height;
  // let scale = Math.min(scaleX, scaleY);
  // background.setScale(scale).setScrollFactor(0);

  // player
  const screenCenterY = this.cameras.main.height / 2;
  this.player = this.physics.add.sprite(300, screenCenterY, 'player');

  // obstacle
  for (const obstacle of obstacleArray) {
    setTimeout(() => {
      const rock = this.physics.add.image(obstacle.x, obstacle.y, obstacle.name)
      rock.setVelocityX(-300);
    }, obstacle.time)
  }
};

function updateScene() {
  // setting the speed that the player moves
  const velocity = 300;

  // swipe 'dead band' ie a small movement is not a swipe
  const deadBand = 10

  // limits to stop player going off screen
  const upperLim = this.player.height / 2;
  const lowerLim = game.canvas.height - upperLim;

  // player direction responds to the up and down keys
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.down.isDown) {
    movePlayer = "down"
  } else if (cursors.up.isDown) {
    movePlayer = "up"
  } else if (cursors.down.isUp) {
    movePlayer = null
  } else if (cursors.up.isUp) {
    movePlayer = null
  }

  // player direction responds to up and down swipe
  const pointer = this.input.activePointer
  if (pointer.isDown) {
    isClicking = true
    if ((pointer.downY - pointer.y) > deadBand) {
      movePlayer = "up"
    } else if ((pointer.y - pointer.downY) > deadBand) {
      movePlayer = "down"
    } else {
      movePlayer = null
    }
  } else if (!pointer.isDown && isClicking == true) {
    isClicking = false
    movePlayer = null
  }

  // movement for up, down and stop
  if (movePlayer == "down" && this.player.y < lowerLim) {
    this.player.setVelocityY(velocity)
  } else if (movePlayer == "up" && this.player.y > upperLim) {
    this.player.setVelocityY(-velocity)
  } else {
    this.player.setVelocity(0)
    movePlayer = null
  }
};

// Additional code
let isClicking = false;
let movePlayer;

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
};

let obstacleArray = [
  { x: 2200, y: 900, name: 'rockObstacle', time: 1000 },
  { x: 2200, y: 900, name: 'rockObstacle', time: 4000 },
  { x: 2200, y: 900, name: 'rockObstacle', time: 7000 }
];
