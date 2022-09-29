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
// var swipe = this.rexGestures.add.swipe(config);  

function preloadScene() {
  // load rex-gestures-plugin
  // swipe player
  // this.load.scenePlugin({
  //   key: 'rexgesturesplugin',
  //   url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
  //   sceneKey: 'rexGestures'
  // });

  // drag player
  // let url;
  // url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdragplugin.min.js';
  // this.load.plugin('rexdragplugin', url, true);

  // load background
  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  
  // load player
  this.load.svg('player', 'assets/players/player-fish.svg', { width: 200, height: 200 });
  
  // load rock obstacle 
  this.load.svg('rockObstacle', 'assets/obstacles/rock.svg');
};

function createImg(pointer) {
  var img = this.add.image(pointer.x, pointer.y, 'player');
  img.drag = this.plugins.get('rexdragplugin').add(this.player);
  img.drag.drag();

  img.on('dragend', img.destroy, img);
      
};

function createScene() {
  // swipe player
  // this.print = print = this.add.text(0, 0, '')
  // this.swipeInput = this.rexGestures.add.swipe({ velocityThreshold: 1000 })
  //           .on('swipe', function (swipe) {
  //               print.text += `swipe, v = ${swipe.dragVelocity}\n`;
  //           }, this);

  // drag player
  // this.input.addPointer(3);
  // this.input.on('pointerdown', this.createImg, this);
  // this.add.text(10,10, 'Pointer down: create object and drag it\nPointer up: destroy object', {fontSize: '20px'});
    

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
  
  // if (this.swipeInput.isSwiped) {
  //   this.player.setVelocityY(-5000)
  //   // this.print.text += `update(): swipe ${dumpDirectionStates(this.swipeInput)}\n`;
  //   console.log(dumpDirectionStates(this.swipeInput));

  //   if (dumpDirectionStates(this.swipeInput) === 'up') {
  //     console.log('swiped up!')
  //     this.player.setVelocityY(-velocity)
  //   }
  //   // console.log(this.print.text)


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

let directions = ['left', 'right', 'up', 'down'];
let dumpDirectionStates = function (swipe) {
    let s = '';
    let dir;
    for (let i = 0, cnt = directions.length; i < cnt; i++) {
        dir = directions[i];
        if (swipe[dir]) {
            s += ' ' + dir;
        }
    }
    return s;
}