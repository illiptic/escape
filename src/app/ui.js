import _ from 'lodash';
import Dashboard from './dashboard.js';

let ui = {
  stage: null,
  hud: null,
  scene: null,

  init () {
    this.stage = new Konva.Stage({
        container: 'container',
        width: 800,
        height: 600
    });

    // add canvas element
    this.hud = new Konva.Layer({
    });
    this.stage.add(this.hud);
    this.hud.add(Dashboard.init({x: 0, y: 540}));

    this.test = new Konva.Text({
      x: this.stage.getWidth() / 2,
      y: 40,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green'
    });
    this.test2 = new Konva.Text({
      x: this.stage.getWidth() / 2,
      y: 140,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'blue'
    });

    this.hud.add(this.test);
    this.hud.add(this.test2);
  },

  render (game) {
    Dashboard.render(game);

    this.test.text('Item ' + (_.findIndex(game.inventory, 'selected') + 1),);
    this.test2.text(game.locations[game.location].name);

    this.hud.draw();
  }
};

export default ui;
