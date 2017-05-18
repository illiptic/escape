import _ from 'lodash';
import Dashboard from './dashboard.js';
import Scene from './scene.js';

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

    // Scene
    this.scene = new Konva.Layer({
    });
    this.stage.add(this.scene);
    this.scene.add(Scene.init())

    // HUD
    this.hud = new Konva.Layer({
    });
    this.stage.add(this.hud);
    this.hud.add(Dashboard.init({x: 0, y: 540}));
  },

  render (game) {
    Dashboard.render(game);
    Scene.render(game);

    this.scene.draw();
    this.hud.draw();
  }
};

export default ui;
