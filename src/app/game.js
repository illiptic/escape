import {playSound} from './sound.js'
import ui from './ui.js'

let game = {
  location: 'start',
  locations: {},
  inventory: [],
  state: {},

  selectItem (index) {
    this.inventory.forEach((item, i) => {
      item.selected = (index === i);
    });
    this.draw();
  },

  addItem (item) {
    this.inventory.push(item)
    this.draw();
  },

  selectedItem () {
    return _.find(this.inventory, 'selected')
  },

  inventoryContains (id) {
    return _.some(this.inventory, {id})
  },

  goto (location) {
    if (this.location !== location) {
      playSound(0, 0)
      this.location = location
      this.draw();
    }
  },

  setState (state) {
    Object.assign(this.state, state)
    this.draw();
  },

  draw () {
    ui.render(this);
  }
};

export default game;
