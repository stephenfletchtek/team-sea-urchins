 const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1920,
  height: 1080,
  physics: {
      default: "matter",
      matter: {
          debug: true
      }
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

function preloadScene(){
  this.load.json('physics', 'assets/physics.json')

  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  this.load.image('player', 'assets/players/player-fish.png');
 
  // load obstacles 
  this.load.svg('rockObstacle', 'assets/obstacles/rock.svg');
 
  this.load.image('obstacle-ship', 'assets/obstacles/obstacle-ship-wreck.png');
};

let obstacleArray = [
{x: 2200,y: 700, name: 'rockObstacle', outline: "rock", time: 1000}, 
{x: 2200,y: 900, name: 'rockObstacle',outline: "rock", time: 4000}, 
// {x: 2200,y: 900, name: 'rockObstacle', time: 7000}
{x: 2200,y: 1000, name: 'obstacle-ship',outline: "ship", time: 7000}
];


function createScene(){
  // turn gravity off 
  this.matter.world.disableGravity();
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
  
  //load in json physics file
  spritePhysics = this.cache.json.get("physics");

  player = this.matter.add.sprite(150, screenCenterY, "player", null, { shape: spritePhysics.fish });
  player.setScale(0.7).setScrollFactor(0);

  
  // obstacle
  for(const obstacle of obstacleArray){
    setTimeout(()=>{
                    const obstacles = this.matter.add.sprite(obstacle.x, obstacle.y, obstacle.name, null,{ shape: spritePhysics[`${obstacle.outline}`] });
                    obstacles.setFriction(0);
                    obstacles.setVelocityX(-15);
                    obstacles.setMass(200); }, obstacle.time)
  }

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