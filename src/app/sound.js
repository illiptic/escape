const AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let sounds = []

export function init() {
  let request = new XMLHttpRequest();
  request.open('GET', '/assets/chevronsDHD.wav', true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      sounds.push(buffer);
    }, (e) => console.error(e));
  }
  request.send();
}

export function playSound(idx, time) {
  let source = context.createBufferSource();
  source.buffer = sounds[idx];
  source.connect(context.destination);
  if (!source.start)
    source.start = source.noteOn;
  source.start(time);

}

export default {
  init
}
