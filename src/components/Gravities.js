export default class Gravities extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.fishGravity = 0;
    this.gravity = 25;
  }
}
