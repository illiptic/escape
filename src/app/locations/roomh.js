export const h = {
  name: 'h',
  backgroundConditional (game) {
    let { hlit } = game.state
    return this.assets[hlit ? 'roomhlit' : 'roomh']
  },
  assets: [
    'roomh',
    'roomhlit',
    'back',
    'doorLopen'
  ],
  render (Konva, game) {
    let { hlit, towersDone } = game.state
    let objects = []

    let back = new Konva.Image({
      x: 368,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });
    back.on('click', () => game.goto('g'))
    objects.push(back)

    let torch = new Konva.Rect({
      x: 690,
      y: 275,
      width: 45,
      height: 100,
      opacity: 0
    })
    if (!hlit) {
      torch.on('click', () => {
        let selectedItem = game.selectedItem() || {}
        if (selectedItem.id === 'flintSteel' && selectedItem.pieces.length === 2) {
          game.setState({hlit: true})
        }
      })
    }
    objects.push(torch)

    if (hlit) {
      let pedestal = new Konva.Image({
        x: 300,
        y: 232,
        width: 184,
        height: 250
      });

      pedestal.on('click', () => {
        game.goto('towers')
      })
      objects.push(pedestal);
    }

    if (towersDone) {
      let doorLeft = new Konva.Image({
        x: 0,
        y: 180,
        width: 100,
        height: 400,
        image: this.assets['doorLopen']
      })
      doorLeft.on('click', () => {
        game.goto('end')
      })
      objects.push(doorLeft);
    }

    return objects;
  }

}
