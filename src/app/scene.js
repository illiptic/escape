import _ from 'lodash';
import Konva from 'konva';

import game from './game.js';

export class Scene {
  init (options) {
    this.scene = new Konva.Group();

    this.background = new Konva.Image({
      x: 0,
      y: 0,
      width: 800,
      height: 600
    });

    this.scene.add(this.background);

    return this.scene;
  }

  render (game) {
    let currentLocation = game.locations[game.location]
    currentLocation.background && this.background.image(currentLocation.background)

    // Create the custom layout
    this.sceneLayout && this.sceneLayout.destroy()
    if (currentLocation.render) {
      this.sceneLayout = new Konva.Group();
      let objects = [].concat(currentLocation.render(Konva, game))
      objects.forEach((object) => {
        object && this.sceneLayout.add(object)
      })
      this.scene.add(this.sceneLayout)
    }
  }

}

export default new Scene();
