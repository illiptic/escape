import _ from 'lodash'

const labels = _.range(5).map((i) => 'cubelabels/h'+(i+1))

export const towers = {
  name: 'towers',
  background: 'towers',
  assets: ['back', 'cube', 'reset'].concat(labels),
  code: _.range(25).map(() => 0),
  codeValid (code) {
    if (_.includes(code, 0)) {
      return false
    }

    // check solution
    return _.isEqual(this.code, [
      2,1,4,5,3,
      3,2,1,4,5,
      1,4,5,3,2,
      4,5,3,2,1,
      5,3,2,1,4
    ])
  },
  codeChecker: _.debounce(
    function (game) {
      if (this.codeValid(this.code)) {
        game.state.towersDone = true
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

    let reset = new Konva.Image({
      x: 650,
      y: 150,
      width: 64,
      height: 64,
      image: this.assets['reset']
    })

    reset.on('click', () => {
      this.code = _.range(25).map(() => 0)
      game.draw()
    })

    return [back, reset].concat(this.renderCubes(Konva, game))
  },
  renderCubes (Konva, game) {
    return this.code.map((value, i) => {
      let x = 264 + (i % 5) * 55;
      let y = 160 + Math.floor(i / 5) * 54

      let zone = new Konva.Group()

      let tile = new Konva.Rect({
        x,
        y,
        width: 55,
        height: 54
      })

      for (var v = 0; v < value; v+=1) {
        let offset = v * 4 + 5
        zone.add(new Konva.Image({
          x,
          y: y - offset,
          width: 55,
          height: 54,
          image: this.assets['cube']
        }))
      }

      if (value) {
        zone.add(new Konva.Image({
          x,
          y: y - (value - 1) * 4,
          width: 50,
          height: 50,
          image: this.assets['cubelabels/h' + value]
        }))
      }

      zone.add(tile)

      tile.on('click', () => {
        this.code[i] = (this.code[i] % 5) + 1
        game.draw()
        this.codeChecker.call(this, game)
      })

      return zone
    })
  }
}
