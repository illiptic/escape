import _ from 'lodash';
import Konva from 'konva';

import Loader from './loader.js';
// import Sound from './sound.js';
import ui from './ui.js';
import game from './game.js';
import * as locations from './locations'

export default {
  init () {
    // Sound.init();
    this._preloadAssets(_.flatMap(locations, (loc) => (loc.assets || []).concat(loc.background || [])))
      .then((result) => {
        this.assets = result;
      })
      .then(() => {
        game.locations = _.mapValues(locations, (loc) => {
          loc.background = this.assets[loc.background]
          loc.assets = loc.assets.reduce((acc, asset) => {
            acc[asset] = this.assets[asset];
            return acc;
          }, {})
          return loc
        })
        ui.init(game);
        // trigger the on arrival event for the starting location
        game.triggerOnArrival();
        game.draw();

        document.addEventListener('keydown', (e) => {
          let value = parseInt(e.key, 10);
          if (typeof value === 'number' && !isNaN(value)) {
            game.selectItem(value - 1);
          } else if (e.key === 'ArrowLeft') {
            game.goto('start')
          } else if (e.key === 'ArrowRight') {
            game.goto('end')
          } else if (e.key === 'ArrowUp') {
            game.setState({puzzleKeyOpen: true})
          } else if (e.key === 'ArrowDown') {
            game.setState({puzzleKeyOpen: false})
          }
        });
      });
  },

  _preloadAssets (locationAssets) {
    let loader = new Loader(this._onLoad);

    return Promise.all(locationAssets.map((name) => {
      return loader.loadImage('assets/' + name + '.png')
        .then((img) => {
          return {
            name,
            img
          };
        })
        .catch(() => {
          console.error('could not load asset "', name, '"')
          throw Error('preloading error')
        });
    }))
    .then((promises) => {
      return promises
        .reduce((acc, promise) => {
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
