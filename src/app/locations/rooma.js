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

    if (!game.inventoryContains('flintSteel') || !_.includes(_.find(game.inventory, {id: 'flintSteel'}).pieces, 'flint')) {
      let flint = new Konva.Image({
        x: 650,
        y: 472,
        width: 40,
        height: 40,
        image: this.assets['flint']
      });

      flint.on('click', () => {
        game.message = 'Found a piece of flint'
        if (game.inventoryContains('flintSteel')) {
          let item = _.find(game.inventory, {id: 'flintSteel'})
          item.icon = this.assets['flintSteelInventory']
          item.pieces.push('flint')
          game.draw()
        } else {
          game.addItem({id: 'flintSteel', pieces: ['flint'], icon: this.assets['flintInventory']})
        }
      })
      objects.push(flint)
    }

    return objects;
  }

}
