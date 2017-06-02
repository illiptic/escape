import _ from 'lodash';
import Dashboard from './dashboard.js';
import Textbox from './textbox.js';
import Scene from './scene.js';

let ui = {
  stage: null,
  hud: null,
  scene: null,

  init (game) {
    this.stage = new Konva.Stage({
        container: 'container',
        width: 800,
        height: 600
    });

    this.stage.on('click', () => {
      if (game.message) {
        game.print(false)
      }    
    })

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
    this.hud.add(Textbox.init({x: 50, y: 50}));
  },

  render (game) {
    Dashboard.render(game);
    Textbox.render(game.message)
    Scene.render(game);

    this.scene.draw();
    this.hud.draw();
  }
};

export default ui;
