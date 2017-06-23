import test from 'ava';
import Loader from './loader.js'

test('instantiate loader', t => {
  let callback = () => {}
	let loader = new Loader(callback);

	t.not(loader, null, 'Loader is instantiated');
  t.false(loader.loaded, 'Loader is not loaded');
  t.is(loader.loadedCount, 0);
  t.is(loader.totalCount, 0);
  t.is(loader.onLoad, callback);
});

test('load an image', async t => {
  let callback = () => { t.pass('Callback called') }
  let loader = new Loader(callback)

  loader.refreshBar = () => {} // Fake the refresh bar function

  loader.loadImage('back.png')
    .then((image) => {
      t.not(image, null, 'image should have been found')
      t.is(image.src, 'back.png', 'URL should match')

      t.is(loader.totalCount, 1)
      t.is(loader.loadedCount, 1)
      t.true(loader.loaded)
    })

  t.is(loader.totalCount, 1)
  t.is(loader.loadedCount, 0)
  t.false(loader.loaded)
})

// Fake Image:
global.Image = Image
function Image () {}
Image.prototype.onload = () => {}
Image.prototype = {
  get src() { return this._src },
  set src(url) {
    this._src = url
    setTimeout(this.onload, 0)
  }
}
