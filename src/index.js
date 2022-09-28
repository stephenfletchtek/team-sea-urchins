function initScene(){};

function preloadScene(){};

function createScene(){};

function updateScene(){};

 
 const PhaserConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  backgroundColor: "#5DACD8",
  scene: {
    init: initScene,
    preload: preloadScene,
    create: createScene,
    update: updateScene,
  },
};

const game = new Phaser.Game(PhaserConfig);
