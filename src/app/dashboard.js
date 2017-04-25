import _ from 'lodash';
import Konva from 'konva';

import game from './game.js';

export class Dashboard {
  init (options) {
    this.dash = new Konva.Group(options);

    this.frame = new Konva.Rect({
      x: 0,
      y: 0,
      width: 800,
      height: 60,
      fill: 'rgba(0,0,0,0.5)',
      stroke: 'black',
      strokeWidth: 2
    });

    this.dash.add(this.frame);

    this.dash.add(this._initInventory());

    return this.dash;
  }

  render (game) {
    let inventory = game ? game.inventory || [] : [];

    for (let i = 0; i < 6; i++) {
      if (inventory[i]) {
        this.items[i].image(inventory[i].icon);
        this.items[i].show();

        if(inventory[i].selected) {
          this.slots[i].fill('rgba(0,0,0,0.1)');
          this.slots[i].stroke('#a97702');
        } else {
          this.slots[i].fill('rgba(0,0,0,0.5)');
          this.slots[i].stroke('black');
        }
      } else {
        this.items[i].hide();
        this.slots[i].fill('rgba(0,0,0,0.5)');
        this.slots[i].stroke('black');
      }
    }

  }

  _initInventory () {
    let group = new Konva.Group();

    this.items = [];
    this.slots = [];

    for (let i = 0; i < 6; i++) {

      let item = new Konva.Image({
        x: 11 + i * 50,
        y: 11,
        width: 38,
        height: 38,
        hide: true
      });
      this.items.push(item);
      group.add(item);

      let slot = new Konva.Rect({
        x: 10 + i * 50,
        y: 10,
        width: 40,
        height: 40,
        fill: 'rgba(0,0,0,0.5)',
        stroke: 'black',
        strokeWidth: 2,
        cornerRadius: 5
      });
      this.slots.push(slot);
      group.add(slot);

      slot.on('click', () => {
        game.selectItem(i);
      });

      group.add(new Konva.Text({
        x: 12 + i * 50,
        y: 12,
        text: i+1,
        fontSize: 12,
        fontFamily: 'Calibri'
      }));
    }

    return group;
  }

}

export default new Dashboard();
