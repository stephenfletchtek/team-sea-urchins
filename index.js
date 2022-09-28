function sceneInit(){};

function scenePreload(){

};

function sceneCreate(){
};

function sceneUpdate(){
};

 
 const PhaserConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  backgroundColor: "#5DACD8",
  scene: {
    init: sceneInit,
    preload: scenePreload,
    create: sceneCreate,
    update: sceneUpdate,
  },
};

const game = new Phaser.Game(PhaserConfig);
