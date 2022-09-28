function initScene(){};

function preloadScene(){
  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  this.load.svg('player', 'assets/players/player-fish.svg', { width: 150, height: 150 });
};

function createScene(){
  // background
  window.addEventListener('resize', resize);
  resize();
  const background = this.add.image(0,0, 'background').setOrigin(0, 0);

  let scaleX = this.cameras.main.width / background.width;
  let scaleY = this.cameras.main.height / background.height;
  let scale = Math.min(scaleX, scaleY);
  background.setScale(scale).setScrollFactor(0);

  // player
  const screenCenterY = this.cameras.main.height / 2;
  const player = this.add.image(150, screenCenterY, 'player').setOrigin(0, 0.5);
  console.log(game.canvas.image)
};

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

function updateScene(){
  // player moves up or down

};

 
 const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  scene: {
    init: initScene,
    preload: preloadScene,
    create: createScene,
    update: updateScene
  },
};

const game = new Phaser.Game(config);