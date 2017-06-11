import _ from 'lodash';
import Konva from 'konva';

import game from './game.js';

export class Textbox {
  init (options) {
    this.options = options
    this.wrapper = new Konva.Group();
    return this.wrapper
  }

  render (game) {
    this.container && this.container.destroy()

    if (game.message) {
      this.container = new Konva.Group();

      let clickcatch = new Konva.Rect({
        x: 0,
        y: 0,
        width: 800,
        height: 600
      })

      clickcatch.on('click', () => {
        if (game.message) {
          game.print(false)
        }
      })

      this.container.add(clickcatch)

      let textbox = new Konva.Group(this.options)

      let frame = new Konva.Rect({
        x: 0,
        y: 0,
        width: 700,
        height: 60,
        fill: 'rgba(0,0,0,0.5)',
        stroke: 'black',
        strokeWidth: 2,
        cornerRadius: 10
      });

      let text = new Konva.Text({
        x: 10,
        y: 10,
        stroke: 'white',
        strokeWidth: 1,
        fontSize: 14,
        fontFamily: 'Calibri',
        text: game.message
      })

      textbox.add(frame)
      textbox.add(text)
      this.container.add(textbox)

      this.wrapper.add(this.container);
    }
  }

}

export default new Textbox();
