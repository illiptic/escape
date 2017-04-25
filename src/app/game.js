import ui from './ui.js';

let game = {
  location: '',
  inventory: [],

  selectItem (index) {
    this.inventory.forEach((item, i) => {
      item.selected = (index === i);
    });
    this.draw();
  },

  draw () {
    ui.render(this);
  }
}

export default game;
