import _ from 'lodash';
import Konva from 'konva';

import game from './game.js'

export class Dashboard {
  render (game, options) {
    let dash = new Konva.Group(options);

    let frame = new Konva.Rect({
      x: 0,
      y: 0,
      width: 800,
      height: 60,
      fill: 'rgba(0,0,0,0.5)',
      stroke: 'black',
      strokeWidth: 2
    });
    dash.add(frame);

    dash.add(this._renderInventory(game));
    return dash;
  }

  _renderInventory (game) {
    let group = new Konva.Group()

    let inventory = game ? game.inventory || [] : [];

    for (let i = 0; i < 6; i++) {
      let fill = 'rgba(0,0,0,0.5)'
      let stroke = 'black';
      if (inventory[i]) {
        group.add(new Konva.Image({
          x: 11 + i * 50,
          y: 11,
          width: 38,
          height: 38,
          image: inventory[i].icon
        }))

        if(inventory[i].selected) {
          fill = 'rgba(0,0,0,0.1)';
          stroke = '#a97702';
        }
      }

      let item = new Konva.Rect({
        x: 10 + i * 50,
        y: 10,
        width: 40,
        height: 40,
        fill,
        stroke,
        strokeWidth: 2,
        cornerRadius: 5
      });
      group.add(item);

      if (inventory[i]) {
        item.on('click', () => {
          game.selectItem(i);
        })
      }

      group.add(new Konva.Text({
        x: 12 + i * 50,
        y: 12,
        text: i+1,
        fontSize: 12,
        fontFamily: 'Calibri'
      }))
    }

    return group;
  }

}

export default new Dashboard();
