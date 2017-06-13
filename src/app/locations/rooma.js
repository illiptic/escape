export const a = {
  name: 'a',
  background: 'rooma',
  assets: [
    'back',
    'flint',
    'flintInventory'
  ],
  render (Konva, game) {
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
