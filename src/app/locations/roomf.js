export const f = {
  name: 'f',
  background: 'roomf',
  assets: [
    'back',
    'breakablewall',
    'brokenwall',
    'cubes',
    'cubesInventory'
  ],
  render (Konva, game) {
    let { mirrorAngle, wallbroken } = game.state
    let objects = []

    let wall = new Konva.Image({
      x: 702,
      y: 147,
      width: 98,
      height: 453,
      image: this.assets[wallbroken ? 'brokenwall' : 'breakablewall']
    })
    wall.on('click', () => {
      if (wallbroken) {
        game.goto('g')
      } else {
        let selectedItem = game.selectedItem() || {}
        if (selectedItem.id === 'pickaxe') {
          game.setState({wallbroken: true})
        }
      }
    })
    objects.push(wall);

    if (!game.inventoryContains('cubes')) {
      let cubes = new Konva.Image({
        x: 111,
        y: 447,
        width: 156,
        height: 60,
        image: this.assets['cubes']
      });
      cubes.on('click', () => {
        game.message = 'Found a bunch of stone cubes'
        game.addItem({id: 'cubes', icon: this.assets['cubesInventory']})
      })
      objects.push(cubes)
    }


    if (mirrorAngle !== 2) {
      let obscurity = new Konva.Rect({
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        fill: 'black',
        opacity: 0.9
      });

      obscurity.on('click', () => {
        game.print('Can\'t see a thing in here')
      })
      objects.push(obscurity)
    }

    let back = new Konva.Image({
      x: 368,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });

    back.on('click', () => game.goto('d'))

    objects.push(back)

    return objects;
  }

}
