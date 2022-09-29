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
  //load in physics file 
  this.load.json('physics', 'assets/physics.json')

  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  this.load.image('player', 'assets/players/player-fish.png');
 
  // load obstacles 
  this.load.svg('rockObstacle', 'assets/obstacles/obstacle-rock.svg');
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
  physics = this.cache.json.get("physics");

  // create player sprite
  player = this.matter.add.sprite(150, screenCenterY, "player", null, { shape: physics.fish });
  player.setScale(0.7).setScrollFactor(0);

  // obstacles = this.matter.add.sprite(600, 700, 'rockObstacle', null, {shape: physics.rock});
  // obstacles.setVelocityX(-15);
  
  
  // generate obstacles
  for(const obstacle of obstacleArray){
    setTimeout(()=>{
                    const obstacles = this.matter.add.sprite(obstacle.x, obstacle.y, obstacle.name, null,{ shape: physics[`${obstacle.outline}`] });
                    obstacles.setVelocityX(-10);
                    obstacles.setMass(200); }, obstacle.time)
  }
  
// animation code example code here if https://www.thepolyglotdeveloper.com/2020/08/use-matterjs-physics-sprite-collisions-phaser-game/
// this.matter.world.on('collisionactive', listener).event.pairs

// check out collisionFilter.group to be able to control colliding classes

// this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
//   console.log("listening to event");
//   console.log({a: bodyA, b: bodyB})
//   if(bodyA.parent.label == "player-fish"){
//     console.log("1");
//     if(bodyA.bounds.max.x < 119){
//       console.log(bodyA); 
//       this.matter.pause();
//     }
//     }else if(bodyB.parent.label == "player-fish"){
//       console.log("2");
//         console.log(bodyB); 
//         this.matter.pause();
//       }
      
//     });



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