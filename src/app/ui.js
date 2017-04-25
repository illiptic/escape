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
    this.hud = new Konva.Layer();
    this.stage.add(this.hud);

    // create shape
    // var background = new Konva.Image({
    //   x: 0,
    //   y: 0,
    //   image: this.assets['marked_stone'],
    //   width: 800,
    //   height: 600
    // });
    // ui.add(background);
  },

  render (game) {
    this.hud.add(Dashboard.render(game, {x: 0, y: 540}));

    this.hud.draw();
  }
}

export default ui;
