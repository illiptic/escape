export const start = {
  name: 'start',
  background: 'start',
  assets: [
    'door',
    'doorOpen',
    'flint',
    'flintInventory'
  ],
  start (game) {
    game.message = 'Ouch. I just fell through the floor! Huh, this must be a subterranean chamber. I\'d better find a way out.'
  },
  render (Konva, game) {
    let { glyphDoorOpen } = game.state

    let objects = []

    let door = new Konva.Image({
      x: 300,
      y: 232,
      width: 184,
      height: 250,
      image: this.assets[glyphDoorOpen ? 'doorOpen' : 'door']
    });

    door.on('click', () => {
      if (glyphDoorOpen) {
        game.goto('end')
      } else {
        game.goto('piccode')
      }
    })
    objects.push(door);

    let doorRight = new Konva.Rect({
      x: 700,
      y: 200,
      width: 100,
      height: 400,
      fill: 'black',
      opacity: 0.2
    })
    doorRight.on('click', () => game.goto('a'))
    objects.push(doorRight);
    let doorLeft = new Konva.Rect({
      x: 0,
      y: 200,
      width: 100,
      height: 400,
      fill: 'black',
      opacity: 0.2
    })
    doorLeft.on('click', () => game.goto('b'))
    objects.push(doorLeft);

    if (!game.inventoryContains('flint')) {
      let flint = new Konva.Image({
        x: 650,
        y: 472,
        width: 40,
        height: 40,
        image: this.assets['flint']
      });

      flint.on('click', () => {
        game.message = 'Found a piece of flint'
        game.addItem({id: 'flint', icon: this.assets['flintInventory']})
      })
      objects.push(flint)
    }

    return objects;
  }

}
