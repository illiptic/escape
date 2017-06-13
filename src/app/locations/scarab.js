import _ from 'lodash'

const keyInventoryList = _.range(7).map((i) => 'scarabKey/scarabKeysInventory'+(i+1))
const keyList = _.range(3).map((i) => 'scarabKey/scarabKey'+(i+1))

export const scarab = {
  name: 'scarab',
  background: 'scarab',
  assets: ['back'].concat(keyList, keyInventoryList),
  onArrival (game) {
    game.state.scarab = game.state.scarab || {}
  },
  placeKey (game, k) {
    let selectedItem = game.selectedItem() || {}
    if (selectedItem.id === 'scarabKey') {
      let newkey = (k & selectedItem.key) > 0 ? selectedItem.key - k : -1
      if (newkey > 0) {
        game.state.scarab[k] = true
        selectedItem.key = newkey
        selectedItem.icon = this.assets['scarabKey/scarabKeysInventory' + newkey]
        game.draw()
      } else if (newkey === 0) {
        game.state.scarab[k] = true
        game.removeItem('scarabKey')
        game.draw()
        setTimeout(() => {
          game.state.scarabOpen = true
          game.goto('c')
        }, 500)
      } else {
        game.print('I don\'t have a matching piece')
      }
    }
  },
  render (Konva, game) {
    let { scarab } = game.state
    let objects = []

    let back = new Konva.Image({
      x: 368,
      y: 450,
      width: 64,
      height: 64,
      image: this.assets['back']
    });
    back.on('click', () => game.goto('c'))
    objects.push(back)

    // slot1
    if (scarab[4]) {
      objects.push(new Konva.Image({
        x: 316,
        y: 152,
        width: 174,
        height: 174,
        image: this.assets['scarabKey/scarabKey1']
      }))
    } else {
      let slot1 = new Konva.Rect({
        x: 316,
        y: 178,
        width: 170,
        height: 110,
        fill: 'red',
        opacity: 0
      })
      slot1.on('click', this.placeKey.bind(this, game, 4))
      objects.push(slot1)
    }


    // slot2
    if (scarab[2]) {
      objects.push(new Konva.Image({
        x: 318,
        y: 276,
        width: 70,
        height: 160,
        image: this.assets['scarabKey/scarabKey2']
      }))
    } else {
      let slot2 = new Konva.Rect({
        x: 320,
        y: 283,
        width: 70,
        height: 150,
        fill: 'red',
        opacity: 0
      })
      slot2.on('click', this.placeKey.bind(this, game, 2))
      objects.push(slot2)
    }

    // slot3
    if (scarab[1]) {
      objects.push(new Konva.Image({
        x: 408,
        y: 276,
        width: 74,
        height: 160,
        image: this.assets['scarabKey/scarabKey3']
      }))
    } else {
      let slot3 = new Konva.Rect({
        x: 410,
        y: 283,
        width: 70,
        height: 150,
        fill: 'red',
        opacity: 0
      })
      slot3.on('click', this.placeKey.bind(this, game, 1))
      objects.push(slot3)
    }

    return objects
  }
}
