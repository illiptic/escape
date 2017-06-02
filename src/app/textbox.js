import _ from 'lodash';
import Konva from 'konva';

import game from './game.js';

export class Textbox {
  init (options) {
    this.box = new Konva.Group(options);

    this.frame = new Konva.Rect({
      x: 0,
      y: 0,
      width: 700,
      height: 60,
      fill: 'rgba(0,0,0,0.5)',
      stroke: 'black',
      strokeWidth: 2,
      cornerRadius: 10
    });

    this.text = new Konva.Text({
      x: 10,
      y: 10,
      stroke: 'white',
      strokeWidth: 1,
      fontSize: 14,
      fontFamily: 'Calibri'
    })

    this.box.add(this.frame);
    this.box.add(this.text);

    return this.box;
  }

  render (message) {
    this.box.opacity(message ? 1 : 0)
    this.text.text(message)
    this.box.draw()
  }

}

export default new Textbox();
