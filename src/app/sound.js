const AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let ids = ['chevronsDHD']
let sounds = {}

export function init() {
  return Promise.all(ids.map((id) => {
    return loadSound('/assets/' + id + '.wav')
      .then((sound) => {
        return {
          id,
          sound
        };
      })
      .catch(() => {
        console.error('could not load asset "', name, '"')
        throw Error('preloading error')
      });
  }))
  .then((promises) => {
    sounds = promises.reduce((acc, promise) => {
        acc[promise.id] = promise.sound;
        return acc;
      }, {});
  })
}

function loadSound (url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      context.decodeAudioData(request.response,
        (buffer) => resolve(buffer),
        (e) => reject(e)
      );
    }
    request.send();
  })
}

export function playSound(id, time) {
  let source = context.createBufferSource();
  source.buffer = sounds[id];
  source.connect(context.destination);
  if (!source.start)
    source.start = source.noteOn;
  source.start(time);

}

export default {
  init
}
