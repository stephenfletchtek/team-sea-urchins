export default class Highscore extends Phaser.Plugins.BasePlugin {
  constructor (pluginManager)
  {
      super(pluginManager);

      this.highscores = [];
      this.name = '';
  }

  getHighscore() {
    return this.highscores;
  }

  addHighscore(score) {
    return this.highscores.push(score);
  }
}