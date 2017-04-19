import _ from 'lodash'
import Loader from './loader.js'

import Konva from 'konva'

export default {
  init () {
    this._preloadAssets()
      .then((result) => {
        this.assets = result
      })
      .then(() => {
        this._draw()
      })
  },

  _preloadAssets () {
    let loader = new Loader(this._onLoad);

    return Promise.all(['marked_stone'].map((name) => {
      return loader.loadImage('/assets/' + name + '.jpg')
        .then(img => {
          return {
            name,
            img
          }
        })
    }))
    .then((promises) => {
      return promises.reduce((acc, promise) => {
        acc[promise.name] = promise.img;
        return acc;
      }, {})
    })
  },

  _onLoad () {
    console.log('loaded');
    var progressBar = document.getElementById('progressBar');
    progressBar.setAttribute('style', 'display: none;');

    var startScreen = document.getElementById('startScreen');
    startScreen.setAttribute('style', 'display: none;');

    var container = document.getElementById('container');
    container.setAttribute('style', 'display: block;');
  },

  _draw () {
    var stage = new Konva.Stage({
        container: 'container',
        width: 800,
        height: 600
    });

    // add canvas element
    var layer = new Konva.Layer();
    stage.add(layer);

    // create shape
    var background = new Konva.Image({
      x: 0,
      y: 0,
      image: this.assets['marked_stone'],
      width: 800,
      height: 600
    });
    layer.add(background);

    layer.draw();
  }
}
