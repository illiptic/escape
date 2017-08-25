import _ from 'lodash'

const labels = _.range(5).map((i) => 'cubelabels/h'+(i+1))

const eyes = {
  top: [ // colums top
    [{x: 274, y: 93}, {x: 295, y: 93}, {x: 274, y: 104}, {x: 295, y: 104}],
    [{x: 326, y: 89}, {x: 347, y: 89}, {x: 326, y: 101}, {x: 347, y: 101}],
    [{x: 394, y: 89}, {x: 394, y: 103}],
    [{x: 446, y: 100}],
    [{x: 497, y: 87}, {x: 497, y: 101}]
  ],
  bottom: [ // columns bottom
    [{x: 282, y: 439}],
    [{x: 337, y: 433}, {x: 337, y: 445}],
    [{x: 391, y: 434}, {x: 391, y: 446}, {x: 391, y: 458}],
    [{x: 438, y: 436}, {x: 458, y: 436} , {x: 438, y: 448} , {x: 458, y: 448} , {x: 448, y: 458}],
    [{x: 502, y: 436}, {x: 503, y: 448}]
  ],
  left: [
    [{x: 220, y: 182}, {x: 240, y: 175}, {x: 240, y: 192}],
    [{x: 216, y: 235}, {x: 238, y: 227}, {x: 238, y: 244}],
    [{x: 216, y: 284}, {x: 238, y: 278}, {x: 237, y: 295}],
    [{x: 236, y: 335}, {x: 235, y: 349}],
    [{x: 229, y: 397}]
  ],
  right: [
    [{x: 542, y: 176}, {x: 542, y: 189}],
    [{x: 544, y: 235}],
    [{x: 545, y: 278}, {x: 545, y: 290}, {x: 565, y: 284}],
    [{x: 545, y: 335}, {x: 545, y: 349}, {x: 569, y: 333}, {x: 569, y: 349}],
    [{x: 547, y: 389},  {x: 547, y: 402}]
  ]
}

export const towers = {
  name: 'towers',
  background: 'towers',
  assets: ['back', 'cube', 'reset', 'eye', 'eyebad'].concat(labels),
  code: _.range(25).map(() => 0),
  duplicates: [],
  codeValid (code) {
    if (_.includes(code, 0)) {
      return false
    }

    // check solution
    return _.isEqual(this.code, [
      2,1,4,5,3,
      3,2,1,4,5,
      1,4,5,3,2,
      4,5,3,2,1,
      5,3,2,1,4
    ])
  },
  winChecker: _.debounce(
    function (game) {
      if (this.codeValid(this.code)) {
        game.state.towersDone = true
        game.goto('h')
      }
    }, 500
  ),
  checkBoard () {
    let columns = _.range(5).map((c) => {
      return _.range(5).map((i) => this.code[i*5 + c])
    })
    let rows = _.range(5).map((r) => {
      return _.range(5).map((i) => this.code[r*5 + i])
    })

    this.checkEyes(columns, rows)
    this.checkDuplicates(columns, rows)
  },
  checkDuplicates (columns, rows) {
    let duplicates = []

    columns.forEach((c, colIndex) => {
      let dic = {}

      c.forEach((v, i) => {
        if (dic[v] || dic[v] === 0) {
          duplicates[i * 5 + colIndex] = true
          duplicates[dic[v] * 5 + colIndex] = true
        }
        if (v > 0) {
          dic[v] = i
        }
      })
    })
    rows.forEach((r, rowIndex) => {
      let dic = {}

      r.forEach((v, i) => {
        if (dic[v] || dic[v] === 0) {
          duplicates[rowIndex * 5 + i] = true
          duplicates[rowIndex * 5 + dic[v]] = true
        }
        if (v > 0) {
          dic[v] = i
        }
      })
    })
    this.duplicates = duplicates
  },
  checkEyes (columns, rows) {
    this.eyesCounts =  {
      top: columns.map(c => this.count(c)),
      bottom: columns.map(c => this.count(c.slice().reverse())),
      left: rows.map(r => this.count(r)),
      right: rows.map(r => this.count(r.slice().reverse()))
    }
  },
  count (towers) {
    let count = 0
    let height = 0
    for (let i = 0; i < towers.length; i++) {
      let t = towers[i]
      if (t > height) {
        height = t
        count += 1
      }
    }
    return count
  },
  onArrival (game) {
    if (!this.visited) {
      game.message = 'This looks like a pressure plate surrounded by weird eye symbols.'
      this.visited = true
    }
  },
  render (Konva, game) {
    let back = new Konva.Image({
      x: 368,
      y: 476,
      width: 64,
      height: 64,
      image: this.assets['back']
    });

    back.on('click', () => game.goto('h'))

    let reset = new Konva.Image({
      x: 650,
      y: 150,
      width: 64,
      height: 64,
      image: this.assets['reset']
    })

    reset.on('click', () => {
      this.code = _.range(25).map(() => 0)
      this.eyesCounts = {}
      game.draw()
    })

    return [back, reset].concat(this.renderCubes(Konva, game)).concat(this.renderEyes(Konva, game))
  },
  renderCubes (Konva, game) {
    return this.code.map((value, i) => {
      let x = 264 + (i % 5) * 55;
      let y = 160 + Math.floor(i / 5) * 54

      let zone = new Konva.Group()

      let tile = new Konva.Rect({
        x,
        y,
        width: 55,
        height: 54
      })

      for (var v = 0; v < value; v+=1) {
        let offset = v * 4 + 5
        zone.add(new Konva.Image({
          x,
          y: y - offset,
          width: 55,
          height: 54,
          image: this.assets['cube']
        }))
      }

      if (value) {
        let label = new Konva.Image({
          x,
          y: y - (value - 1) * 4,
          width: 50,
          height: 50,
          image: this.assets['cubelabels/h' + value]
        })
        if (this.duplicates[i]) {
          label.cache()
          label.filters([Konva.Filters.RGBA])
          label.red(255)
        }
        zone.add(label)

      }

      zone.add(tile)

      tile.on('click', () => {
        if (game.inventoryContains('cubes')) {
          game.selectItem('cubes')
          this.code[i] = (this.code[i]+1) % 6
          this.checkBoard()
          this.winChecker.call(this, game)
        } else {
          game.message = "I have nothing to put on the tiles."
        }
        game.draw()
      })

      return zone
    })
  },
  renderEyes (Konva, game) {
    return _.flatMapDeep(this.eyesCounts, (side, sidename) => {
      let coords = eyes[sidename]
      return side.map((eyecount, index) => {
        let icon = eyecount > coords[index].length ? 'eyebad' : 'eye'
        let range = _.range(Math.min(eyecount, coords[index].length))

        return range.map((i) => new Konva.Image({
          x: coords[index][i].x,
          y: coords[index][i].y,
          width: 20,
          height: 10,
          image: this.assets[icon]
        }))
      })
    })
  }
}
