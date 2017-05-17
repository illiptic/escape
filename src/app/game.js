import ui from './ui.js'
import * as locations from './locations'

let game = {
  location: 'start',
  locations,
  inventory: [],

  selectItem (index) {
    this.inventory.forEach((item, i) => {
      item.selected = (index === i);
    });
    this.draw();
  },

  goto (location) {
    this.location = location
    this.draw();
  },

  draw () {
    ui.render(this);
  }
};

export default game;
