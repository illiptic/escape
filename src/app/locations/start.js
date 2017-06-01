export const start = {
  name: 'start',
  background: 'start',
  assets: [
    'door',
    'doorOpen',
    'flint',
    'flintInventory'
  ],
  render (Konva, game) {
    let { doorOpen } = game.state

    let objects = []

    let door = new Konva.Image({
      x: 300,
      y: 232,
      width: 184,
      height: 250,
      image: this.assets[doorOpen ? 'doorOpen' : 'door']
    });

    door.on('click', () => {
      if (doorOpen) {
        game.goto('end')
      } else {
        console.log('closed')
      }
    })
    objects.push(door);

    if (!game.inventoryContains('flint')) {
      let flint = new Konva.Image({
        x: 650,
        y: 472,
        width: 40,
        height: 40,
        image: this.assets['flint']
      });

      flint.on('click', () => {
        game.addItem({id: 'flint', icon: this.assets['flintInventory']})
      })
      objects.push(flint)
    }

    return objects;
  }

}
