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

function initScene() { };

function preloadScene() {
  //load in physics file 
  this.load.json('physics', 'assets/physics.json')
  this.load.json('fish', 'assets/fish.json')

  this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
  // load player
  // this.load.image('player', assets/background/whole-background.svg;

  // let play1 = this.load.atlas('player', 'assets/players/player-fish-sprite.png', 'assets/players/player-fish.json');
  // console.log(play1);

  // this.load.image('player', 'assets/players/player-fish-spritesheet.png', 'assets/players/player-fish.json');    
  this.load.atlas('player', 'assets/players/player-fish-spritesheet.png', 'assets/players/player-fish.json');
  
  // this.load.image('player', 'assets/players/player-fish.png');

  // load obstacles 
  this.load.svg('rockObstacle', 'assets/obstacles/obstacle-rock.svg');
  this.load.image('obstacle-ship', 'assets/obstacles/obstacle-ship-wreck.png');
};

function createScene() {
  // turn gravity off 
  this.matter.world.disableGravity();
  // background
  window.addEventListener('resize', resize);
  resize();
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

  let scaleX = this.cameras.main.width / background.width;
  let scaleY = this.cameras.main.height / background.height;
  let scale = Math.min(scaleX, scaleY);
  background.setScale(scale).setScrollFactor(0);

  // player
  const screenCenterY = this.cameras.main.height / 2;

  //load in json physics file
  physics = this.cache.json.get("physics");
  fish = this.cache.json.get("fish");
 
  let fishSwim = {
    key: 'fish-swim',    
    frames: [
        {key: "player", frame: "fish1.png"},
        {key: "player", frame: "fish2.png"}
        // {key: "sheet", frame: "human3.png"},
        // {key: "sheet", frame: "human4.png"},
    ],
    frameRate: 3,
    repeat: -1
  }

  this.anims.create(fishSwim);
  this.scale = 0.5
  this.player = this.matter.add.sprite(300, screenCenterY, 'player', null, { shape: fish.fish1 });
  this.player.setScale(this.scale).setScrollFactor(0);
  this.player.anims.load('fish-swim');
  this.player.anims.play('fish-swim');
  console.log("1");
  console.log(this.player.anims.play('fish-swim'));
  console.log("2");



 


  // create player sprite
  // this.player = this.matter.add.sprite(150, screenCenterY, "player", null, { shape: physics.fish });

  // var atlasTexture = this.textures.get('player');
  // var frames = atlasTexture.getFrameNames();

  // for (var i = 0; i < frames.length; i++)
  // {
  //     var x = Phaser.Math.Between(0, 500);
  //     var y = Phaser.Math.Between(0, 500);

  //     this.player = this.matter.add.image(x, y, 'player', frames[i]);
  // }

  

  // obstacles = this.matter.add.sprite(600, 700, 'rockObstacle', null, {shape: physics.rock});
  // obstacles.setVelocityX(-15);


  // generate obstacles
  for (const obstacle of obstacleArray) {
    setTimeout(() => {
      const obstacles = this.matter.add.sprite(obstacle.x, obstacle.y, obstacle.name, null, { shape: physics[`${obstacle.outline}`] });
      obstacles.setVelocityX(-10);
      obstacles.setMass(200);
    }, obstacle.time)
  }
};

function updateScene() {
  // setting the speed that the player moves
  const velocity = 25;

  // swipe 'dead band' ie a small movement is not a swipe
  const deadBand = 10

  // limits to stop player going off screen
  const upperLim = this.player.height * this.scale / 2;
  const lowerLim = game.canvas.height - upperLim;
  console.log(upperLim);

  // player direction responds to up and down swipe
  const pointer = this.input.activePointer
  if (pointer.isDown) {
    wasClicked = true
    if ((pointer.downY - pointer.y) > deadBand) {
      movePlayer = "up"
    } else if ((pointer.y - pointer.downY) > deadBand) {
      movePlayer = "down"
    } else {
      movePlayer = null
    }
  } else if (wasClicked == true) {
    wasClicked = false
    movePlayer = null
  }

  // player direction responds to the up and down keys
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.down.isDown) {
    wasPushed = true
    movePlayer = "down"
  } else if (cursors.up.isDown) {
    wasPushed = true
    movePlayer = "up"
  } else if (wasPushed == true) {
    wasPushed = false
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
}

// Additional code
let wasClicked = false;
let wasPushed = false;
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

}

// **************

// function preload ()
// {
//     this.load.image('human', 'assets/sprites/x2kship.png');    
//     this.load.atlas('sheet', 'data/atlas.png', 'data/atlas.json');
// }

// function create ()
// {
    // var humanWalk = {
    //     key: 'human-walk',    
    //     frames: [
    //         {key: "sheet", frame: "human1.png"},
    //         {key: "sheet", frame: "human2.png"},
    //         {key: "sheet", frame: "human3.png"},
    //         {key: "sheet", frame: "human4.png"},
    //     ],
    //     frameRate: 6,

    //     repeat: -1
//     };

    // this.anims.create(humanWalk);

    // human = this.matter.add.sprite(100, 100, 'human');
    // human.anims.load('human-walk');
    // human.anims.play('human-walk');
// }

// "human1.png": {
//   "frame": { "x": 1137,"y": 1030, "w": 182, "h": 195 },
//   "rotated": false,
//   "trimmed": false,
//   "spriteSourceSize": { "x": 0,"y": 0, "w": 182, "h": 195 },
//   "sourceSize": { "w": 182, "h": 195 },
//   "pivot": { "x": 0.5, "y": 0.5 }
// },


// ***************

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


let obstacleArray = [
  { x: 2200, y: 700, name: 'rockObstacle', outline: "rock", time: 1000 },
  { x: 2200, y: 900, name: 'rockObstacle', outline: "rock", time: 4000 },
  // {x: 2200,y: 900, name: 'rockObstacle', time: 7000}
  { x: 2200, y: 1000, name: 'obstacle-ship', outline: "ship", time: 7000 }
];

// /******************** */

// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   parent: 'phaser-example',
//   scene: {
//       preload: preload,
//       create: create
//   }
// };

// var game = new Phaser.Game(config);

// function preload ()
// {
//   this.load.atlas('megaset', 'assets/atlas/megaset-3.png', atlasJSON);
// }

// function create ()
// {
//   var atlasTexture = this.textures.get('megaset');
//   var frames = atlasTexture.getFrameNames();

//   for (var i = 0; i < frames.length; i++)
//   {
//       var x = Phaser.Math.Between(0, 800);
//       var y = Phaser.Math.Between(0, 600);

//       this.add.image(x, y, 'megaset', frames[i]);
//   }
// }

// var atlasJSON = {"frames": [
//   {
//       "filename": "128x128",
//       "frame": {"x":893,"y":342,"w":128,"h":128},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":128,"h":128},
//       "sourceSize": {"w":128,"h":128},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "advanced_wars_land",
//       "frame": {"x":132,"y":641,"w":320,"h":48},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":320,"h":48},
//       "sourceSize": {"w":320,"h":48},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "contra2",
//       "frame": {"x":2,"y":316,"w":142,"h":222},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":142,"h":222},
//       "sourceSize": {"w":142,"h":222},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "contra3",
//       "frame": {"x":645,"y":197,"w":246,"h":201},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":246,"h":201},
//       "sourceSize": {"w":246,"h":201},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "diamonds32x5",
//       "frame": {"x":585,"y":596,"w":318,"h":49},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":1,"y":15,"w":318,"h":49},
//       "sourceSize": {"w":320,"h":64},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "exocet_spaceman",
//       "frame": {"x":146,"y":316,"w":153,"h":175},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":153,"h":175},
//       "sourceSize": {"w":153,"h":175},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "explosion",
//       "frame": {"x":2,"y":2,"w":319,"h":312},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":1,"y":6,"w":319,"h":312},
//       "sourceSize": {"w":320,"h":320},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "helix",
//       "frame": {"x":724,"y":472,"w":221,"h":28},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":6,"y":0,"w":221,"h":28},
//       "sourceSize": {"w":233,"h":30},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "knight3",
//       "frame": {"x":323,"y":204,"w":320,"h":131},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":0,"y":0,"w":320,"h":131},
//       "sourceSize": {"w":320,"h":200},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "lance-overdose-loader-eye",
//       "frame": {"x":2,"y":540,"w":128,"h":128},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":128,"h":128},
//       "sourceSize": {"w":128,"h":128},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "mask-test",
//       "frame": {"x":323,"y":2,"w":320,"h":200},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":320,"h":200},
//       "sourceSize": {"w":320,"h":200},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "metalslug_monster39x40",
//       "frame": {"x":436,"y":337,"w":156,"h":160},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":156,"h":160},
//       "sourceSize": {"w":156,"h":160},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "pacman_by_oz_28x28",
//       "frame": {"x":454,"y":647,"w":308,"h":28},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":308,"h":28},
//       "sourceSize": {"w":308,"h":28},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "parsec",
//       "frame": {"x":281,"y":527,"w":302,"h":80},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":302,"h":80},
//       "sourceSize": {"w":302,"h":80},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "profil-sad-plush",
//       "frame": {"x":146,"y":493,"w":133,"h":142},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":133,"h":142},
//       "sourceSize": {"w":133,"h":142},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "saw",
//       "frame": {"x":594,"y":400,"w":128,"h":128},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":128,"h":128},
//       "sourceSize": {"w":128,"h":128},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "shocktroopers-lulu2",
//       "frame": {"x":301,"y":337,"w":133,"h":188},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":133,"h":188},
//       "sourceSize": {"w":133,"h":188},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "snowflakes_large",
//       "frame": {"x":585,"y":530,"w":379,"h":64},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":2,"y":0,"w":379,"h":64},
//       "sourceSize": {"w":384,"h":64},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "spaceman",
//       "frame": {"x":724,"y":502,"w":225,"h":16},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":15,"y":0,"w":225,"h":16},
//       "sourceSize": {"w":240,"h":16},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "steelpp-font",
//       "frame": {"x":645,"y":2,"w":320,"h":193},
//       "rotated": false,
//       "trimmed": true,
//       "spriteSourceSize": {"x":0,"y":0,"w":320,"h":193},
//       "sourceSize": {"w":320,"h":200},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "treasure_trap",
//       "frame": {"x":893,"y":197,"w":127,"h":143},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":127,"h":143},
//       "sourceSize": {"w":127,"h":143},
//       "pivot": {"x":0.5,"y":0.5}
//   },
//   {
//       "filename": "vu",
//       "frame": {"x":281,"y":609,"w":300,"h":30},
//       "rotated": false,
//       "trimmed": false,
//       "spriteSourceSize": {"x":0,"y":0,"w":300,"h":30},
//       "sourceSize": {"w":300,"h":30},
//       "pivot": {"x":0.5,"y":0.5}
//   }],
//   "meta": {
//       "app": "http://www.codeandweb.com/texturepacker",
//       "version": "1.0",
//       "image": "megaset-3.png",
//       "format": "RGBA8888",
//       "size": {"w":1023,"h":691},
//       "scale": "1",
//       "smartupdate": "$TexturePacker:SmartUpdate:5e8f90752cfd57d3adfb39bcd3eef1b6:87d98cec6fa616080f731b87726d6a1e:b55588eba103b49b35a0a59665ed84fd$"
//   }
// };
