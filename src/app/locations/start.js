export const start = {
  name: 'start',
  background: 'start',
  assets: [
    'door',
    'doorOpen',
    'cubesInventory'
  ],
  onArrival (game) {
    if (!this.visited) {
      game.message = 'Ouch. I just fell through the floor! Huh, this must be a subterranean chamber. I\'d better find a way out.'
      this.visited = true

      game.addItem({id: 'cubes', icon: this.assets['cubesInventory']})
    }
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
        game.goto('c')
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
      opacity: 0
    })
    doorRight.on('click', () => game.goto('a'))
    objects.push(doorRight);
    let doorLeft = new Konva.Rect({
      x: 0,
      y: 200,
      width: 100,
      height: 400,
      opacity: 0
    })
    doorLeft.on('click', () => game.goto('b'))
    objects.push(doorLeft);

    return objects;
  }

}
