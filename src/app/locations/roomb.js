export const b = {
  name: 'b',
  background: 'roomb',
  assets: [
    'back',
    'pickaxe',
    'pickaxeInventory'
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

    if (!game.inventoryContains('pickaxe')) {
      let pick = new Konva.Image({
        x: 580,
        y: 392,
        width: 120,
        height: 120,
        image: this.assets['pickaxe']
      });

      pick.on('click', () => {
        game.message = 'Found a pickaxe!'
        game.addItem({id: 'pickaxe', icon: this.assets['pickaxeInventory']})
      })
      objects.push(pick)
    }

    return objects;
  }

}
