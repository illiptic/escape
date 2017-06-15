// import {playSound} from './sound.js'
import ui from './ui.js'

let game = {
  location: 'start',
  locations: {},
  inventory: [],
  state: {},

  selectItem (index) {
    this.inventory.forEach((item, i) => {
      item.selected = (index === i) || (item.id === index);
    });
    this.draw();
  },

  addItem (item) {
    this.inventory.push(item)
    this.draw();
  },

  removeItem (id) {
    _.remove(this.inventory, {id})
    this.draw();
  },

  selectedItem () {
    return _.find(this.inventory, 'selected')
  },

  inventoryContains (id) {
    return _.some(this.inventory, {id})
  },

  goto (location) {
    if (!this.locations[location]) {
      throw Error('Location '+ location +' undefined.')
    }
    if (this.location !== location) {
      this.location = location
      this.triggerOnArrival();
      this.draw();
    }
  },

  triggerOnArrival () {
    let currentLocation = this.locations[this.location]
    currentLocation.onArrival && currentLocation.onArrival(this)
  },

  print (message) {
    this.message = message;
    this.draw();
  },

  setState (state) {
    Object.assign(this.state, state);
    this.draw();
  },

  draw () {
    ui.render(this);
  }
};

export default game;
