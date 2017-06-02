export const piccode = {
  name: 'piccode',
  background: 'piccode',
  assets: ['back', 'flintInventory', 'steel'],
  wheels: [0,0,0],
  pics: ['flintInventory', 'steel'],
  render (Konva, game) {
    let back = new Konva.Image({
      x: 368,
      y: 450,
      width: 64,
      height: 64,
      image: this.assets['back']
    });

    back.on('click', () => game.goto('start'))

    return this.renderWheels(game).concat(back)
  },

  renderWheels (game) {
    return [190, 340, 490].map((x, i) => {
      let wheel = new Konva.Group()
      let frame = new Konva.Rect({
        x,
        y: 230,
        width: 140,
        height: 130,
        fill: 'red',
        opacity: 0.1
      })
      wheel.add(frame)

      let test = new Konva.Image({
        x,
        y: 230,
        width: 130,
        height: 130,
        image: this.assets[this.pics[this.wheels[i]]]
      })
      wheel.add(test)

      wheel.on('click', () => {
        this.wheels[i] = (this.wheels[i] + 1) % 2
        game.draw()
      })

      return wheel
    })
  }
}
