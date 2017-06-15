import _ from 'lodash'

const digitList = _.range(6).map((i) => 'digits/digit'+i)

export const sdn = {
  name: 'sdn',
  background: 'sdn',
  assets: ['back', 'dialhand'].concat(digitList),
  code: [1,0,2,2,0],
  codeChecker: _.debounce(
    function (game) {
      if (_.isEqual(this.code, this.sdn(this.code))) {
        game.state.sdnOpen = true
        game.goto('g')
      }
    }, 500
  ),
  sdn (numberArray) {
    return numberArray.reduce((acc, num) => {
      acc[num] += 1
      return acc
    }, [0,0,0,0,0])
  },
  render (Konva, game) {
    let back = new Konva.Image({
      x: 368,
      y: 450,
      width: 64,
      height: 64,
      image: this.assets['back']
    });

    back.on('click', () => game.goto('g'))

    return [back].concat(this.renderHands(Konva, game), this.renderDigits(Konva, game))
  },
  renderDigits (Konva, game) {
    return this.sdn(this.code).map((d, i) => {
      let digit = new Konva.Image({
        x: 292 + 68 * i,
        y: 224,
        offsetX: 21,
        width: 42,
        height: 58,
        image: this.assets['digits/digit' + d]
      })

      return digit
    })
  },
  renderHands (Konva, game) {
    return [292, 358, 426, 491, 561].map((x, i) => {
      let hand = new Konva.Image({
        x,
        y: 363,
        width: 60,
        height: 60,
        offsetX: 30,
        offsetY: 30,
        rotation: this.code[i] * 72,
        image: this.assets.dialhand
      })

      if (!game.state.sdnOpen) {
        hand.on('click', () => {
          this.code[i] = (this.code[i] + 1) % 5
          game.draw()
          this.codeChecker.call(this, game)
        })
      }

      return hand
    })
  }
}
