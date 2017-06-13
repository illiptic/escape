import _ from 'lodash'

const keyInventoryList = _.range(7).map((i) => 'scarabKey/scarabKeysInventory'+(i+1))
const keyList = _.range(3).map((i) => 'scarabKey/scarabKeyDark'+(i+1))

export const e = {
  name: 'e',
  background: 'roome',
  assets: [
    'back'
  ].concat(keyList, keyInventoryList),
  takeKey (game, k) {
    let using = game.selectedItem() || {}
    if (using.id === 'pickaxe') {
      let keysOwned = _.find(game.inventory, {id: 'scarabKey'})
      if (keysOwned) {
        keysOwned.key = keysOwned.key + k
        keysOwned.icon = this.assets['scarabKey/scarabKeysInventory' + keysOwned.key]
        game.draw()
      } else {
        game.addItem({id: 'scarabKey', key: k, icon: this.assets['scarabKey/scarabKeysInventory' + k]})
      }
    } else {
      game.print('Can\'t remove this with my bare hands.')
    }
  },
  render (Konva, game) {
    let objects = []

    let back = new Konva.Image({
      x: 368,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });

    back.on('click', () => game.goto('c'))

    objects.push(back)

    let keysOwned = (_.find(game.inventory, {id: 'scarabKey'}) || {}).key
    if (!(keysOwned & 4)) {
      let key1 = new Konva.Image({
        x: 535,
        y: 284,
        width: 40,
        height: 40,
        image: this.assets['scarabKey/scarabKeyDark1']
      });
      key1.on('click', this.takeKey.bind(this, game, 4))
      objects.push(key1)
    }
    if (!(keysOwned & 2)) {
      let key2 = new Konva.Image({
        x: 422,
        y: 185,
        width: 20,
        height: 40,
        image: this.assets['scarabKey/scarabKeyDark2']
      });
      key2.on('click', this.takeKey.bind(this, game, 2))
      objects.push(key2)
    }
    if (!(keysOwned & 1)) {
      let key3 = new Konva.Image({
        x: 436,
        y: 276,
        width: 20,
        height: 40,
        image: this.assets['scarabKey/scarabKeyDark3']
      });
      key3.on('click', this.takeKey.bind(this, game, 1))
      objects.push(key3)
    }

    return objects;
  }

}
