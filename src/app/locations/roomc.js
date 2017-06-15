export const c = {
  name: 'c',
  background: 'roomc',
  assets: [
    'back',
    'doorLclosed',
    'mirror',
    'mirrorInventory'
  ],
  render (Konva, game) {
    let { scarabOpen } = game.state

    let objects = []

    let back = new Konva.Image({
      x: 368,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });

    back.on('click', () => game.goto('start'))

    objects.push(back)

    // Left
    if (!scarabOpen) {
      objects.push(new Konva.Image({
        x: 0,
        y: 144,
        width: 81,
        height: 453,
        image: this.assets['doorLclosed']
      }));
    }
    let doorLeft = new Konva.Rect({
      x: 0,
      y: 200,
      width: 100,
      height: 400,
      opacity: 0
    })
    doorLeft.on('click', () => {
      if (scarabOpen) {
        game.goto('d')
      } else {
        game.goto('scarab')
      }
    })
    objects.push(doorLeft);

    // Right
    let doorRight = new Konva.Rect({
      x: 700,
      y: 200,
      width: 100,
      height: 400,
      opacity: 0
    })
    doorRight.on('click', () => game.goto('e'))
    objects.push(doorRight);

    if (!game.inventoryContains('mirror')) {
      let mirror = new Konva.Image({
        x: 100,
        y: 407,
        width: 120,
        height: 120,
        image: this.assets['mirror']
      });

      mirror.on('click', () => {
        game.message = 'Found a rather large mirror'
        game.addItem({id: 'mirror', icon: this.assets['mirrorInventory']})
      })
      objects.push(mirror)
    }


    return objects;
  }

}
