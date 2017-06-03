import _ from 'lodash'

const glyphList = _.range(10).map((i) => 'glyphs/glyph'+i)

export const piccode = {
  name: 'piccode',
  background: 'piccode',
  assets: ['back'].concat(glyphList),
  wheels: [0,0,0],
  glyphChecker: _.debounce(
    function (game) {
      if (_.isEqual([3,8,5], this.wheels)) {
        game.state.glyphDoorOpen = true
        game.goto('start')
      }
    }, 500
  ),
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
    return [170, 340, 504].map((x, i) => {
      let wheel = new Konva.Group()
      let frame = new Konva.Rect({
        x,
        y: 220,
        width: 150,
        height: 150,
        opacity: 0
      })
      wheel.add(frame)

      let test = new Konva.Image({
        x,
        y: 230,
        width: 150,
        height: 150,
        image: this.assets['glyphs/glyph' + this.wheels[i]]
      })
      wheel.add(test)

      wheel.on('click', () => {
        this.wheels[i] = (this.wheels[i] + 1) % 10
        game.draw()
        this.glyphChecker.call(this, game)
      })

      return wheel
    })
  }
}
