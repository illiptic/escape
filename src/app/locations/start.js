export const start = {
  name: 'start',
  background: 'hieroglyphics1.jpg',
  render (Konva, game) {
    let test = new Konva.Text({
      x: 400,
      y: 40,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
      text: 'hi'
    });

    test.on('click', () => {
      game.goto('end')
    })

    return test
  }

}
