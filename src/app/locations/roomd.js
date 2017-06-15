import _ from 'lodash'

export const d = {
  name: 'd',
  background: 'roomd',
  assets: [
    'back',
    'mirror/base',
    'mirror/empty',
    'mirror/angle0',
    'mirror/angle1',
    'mirror/angle2'
  ],
  render (Konva, game) {
    let { mirrorAngle, mirrorPlaced } = game.state
    let objects = []

    let back = new Konva.Image({
      x: 150,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });
    back.on('click', () => game.goto('c'))
    objects.push(back)

    let doorRight = new Konva.Rect({
      x: 700,
      y: 200,
      width: 100,
      height: 400,
      opacity: 0
    })
    doorRight.on('click', () => game.goto('f'))
    objects.push(doorRight);

    let base = new Konva.Image({
      x: 400,
      y: 400,
      width: 110,
      height: 180,
      offsetX: 55,
      image: this.assets['mirror/base']
    })
    objects.push(base)

    let mirror = new Konva.Image({
      x: 400,
      y: 400,
      width: 110,
      height: 180,
      offsetX: 55,
      image: this.assets['mirror/' + (mirrorPlaced ? 'angle' + mirrorAngle : 'empty')]
    })
    mirror.on('click', () => {
      if (mirrorPlaced) {
        game.setState({mirrorAngle: (mirrorAngle + 1) % 3})
      } else {
        let selectedItem = game.selectedItem() || {}
        if (selectedItem.id === 'mirror') {
          game.state.mirrorAngle = 0
          game.state.mirrorPlaced = true
          game.removeItem('mirror')
        }
      }
    })
    objects.push(mirror)

    return objects;
  }

}
