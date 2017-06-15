export const g = {
  name: 'g',
  backgroundConditional (game) {
    let { glit } = game.state
    return this.assets[glit ? 'roomglit' : 'roomg']
  },
  assets: [
    'roomg',
    'roomglit',
    'doorg',
    'doorgOpen',
    'back',
    'steel',
    'steelInventory',
    'flintSteelInventory'
  ],
  render (Konva, game) {
    let { sdnOpen, glit } = game.state
    let objects = []

    let back = new Konva.Image({
      x: 368,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });
    back.on('click', () => game.goto('f'))
    objects.push(back)

    if (!game.inventoryContains('flintSteel') || !_.includes(_.find(game.inventory, {id: 'flintSteel'}).pieces, 'steel')) {
      let steel = new Konva.Image({
        x: 150,
        y: 472,
        width: 40,
        height: 40,
        image: this.assets['steel']
      });

      steel.on('click', () => {
        game.message = 'Found a piece of steel'
        if (game.inventoryContains('flintSteel')) {
          let item = _.find(game.inventory, {id: 'flintSteel'})
          item.icon = this.assets['flintSteelInventory']
          item.pieces.push('steel')
          game.draw()
        } else {
          game.addItem({id: 'flintSteel', pieces: ['steel'], icon: this.assets['steelInventory']})
        }
      })
      objects.push(steel)
    }

    let torch = new Konva.Rect({
      x: 690,
      y: 275,
      width: 45,
      height: 100,
      opacity: 0
    })
    if (!glit) {
      torch.on('click', () => {
        let selectedItem = game.selectedItem() || {}
        if (selectedItem.id === 'flintSteel' && selectedItem.pieces.length === 2) {
          game.setState({glit: true})
        } else {
          game.print('I need something to light this')
        }
      })
    }
    objects.push(torch)

    if (glit) {
      let door = new Konva.Image({
        x: 300,
        y: 232,
        width: 184,
        height: 250,
        image: this.assets[sdnOpen ? 'doorgOpen' : 'doorg']
      });

      door.on('click', () => {
        if (sdnOpen) {
          game.goto('h')
        } else {
          game.goto('sdn')
        }
      })
      objects.push(door);
    }

    return objects;
  }

}
