import _ from 'lodash';
import Konva from 'konva';

import Loader from './loader.js';
import ui from './ui.js'
import game from './game.js'

export default {
  init () {
    this._preloadAssets()
      .then((result) => {
        this.assets = result;
      })
      .then(() => {
        game.inventory.push({icon: this.assets['flint'], selected: true});
        game.inventory.push({icon: this.assets['steel']});
        game.inventory.push({icon: this.assets['flint_steel']});
        ui.init();
        game.draw();
      });
  },

  _preloadAssets () {
    let loader = new Loader(this._onLoad);

    return Promise.all(['flint', 'steel', 'flint_steel'].map((name) => {
      return loader.loadImage('/assets/' + name + '.png')
        .then((img) => {
          return {
            name,
            img
          };
        });
    }))
    .then((promises) => {
      return promises.reduce((acc, promise) => {
        acc[promise.name] = promise.img;
        return acc;
      }, {});
    });
  },

  _onLoad () {
    console.log('loaded');
    var progressBar = document.getElementById('progressBar');
    progressBar.setAttribute('style', 'display: none;');

    var startScreen = document.getElementById('startScreen');
    startScreen.setAttribute('style', 'display: none;');

    var container = document.getElementById('container');
    container.setAttribute('style', 'display: block;');
  }
};
