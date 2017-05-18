import _ from 'lodash';
import Konva from 'konva';

import Loader from './loader.js';
import ui from './ui.js';
import game from './game.js';
import * as locations from './locations'

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
        game.locations = _.mapValues(locations, (loc) => {
          loc.background = this.assets[loc.name]
          return loc
        })
        ui.init();
        game.draw();

        document.addEventListener('keydown', (e) => {
          let value = parseInt(e.key, 10);
          if (typeof value === 'number' && !isNaN(value)) {
            game.selectItem(value - 1);
          } else if (e.key === 'ArrowLeft') {
            game.goto('start')
          } else if (e.key === 'ArrowRight') {
            game.goto('end')
          }
        });
      });
  },

  _preloadAssets () {
    let loader = new Loader(this._onLoad);

    return Promise.all(['flint', 'steel', 'flint_steel', 'start', 'end'].map((name) => {
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
