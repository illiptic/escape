export default function Loader (onLoad) {
  this.loaded = false;
  this.loadedCount = 0;
  this.totalCount = 0;

  this.onLoad = onLoad;
}

Loader.prototype.loadImage = function(url){

  return new Promise((resolve, reject) => {
    this.totalCount += 1;
    this.loaded = false;

    console.log('loading ', url, '(image #'+ this.totalCount +')');

    this.refreshBar();

    // setTimeout(this.imageLoaded.bind(this), 100*url);

    var image = new Image();
    image.onload = () => {
      this.imageLoaded.call(this)
      resolve(image)
    }
    image.src = url;
  })

};

Loader.prototype.imageLoaded = function(){
  this.loadedCount += 1;
  this.refreshBar();

  if(this.loadedCount === this.totalCount){
    this.loaded = true;

    if(this.onLoad){
      this.onLoad();
    }
  }
};

Loader.prototype.refreshBar = function(){
  var progress = Math.floor(this.loadedCount / this.totalCount * 100);

  var loadingBar = document.getElementById('loadingBar');
  loadingBar.setAttribute('style', 'width: '+progress+'%');
};
