define(function(require, exports, module) {
  var View      = require('famous/core/View');

  var BackgroundView = require('views/BackgroundView');

  // Creates an image background, and a solid color background and allows to switch between
  // them.  Default image is 'green-background.png', and is shown by default.  Default solid
  // color is white and is hidden by the image background.  The image background opacity is
  // set to 0 to show the solid backround.  To pass in other defaults, use:
  //
  // var myBackground = new BackgroundShifterView( {
  //   image: 'myImage.png',
  //   color: 'green'
  // });
  //
  // myBackground.set('solid')  or
  // myBackground.set()
  //
  function BackgroundShifterView() {
    View.apply( this, arguments);
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.solidBackground = new BackgroundView({
        surface: {
          properties: {
            backgroundColor: this.options.color
          }
        }
    });
    this.imageBackground = new BackgroundView( {
      surface: {
        content: '<img src="content/images/' + this.options.image + '" width="' + width + '" height="' + height + '">'
      }
    });
    this._add(this.imageBackground);
    this._add(this.solidBackground);
  }

  BackgroundShifterView.prototype = Object.create(View.prototype);
  BackgroundShifterView.prototype.constructor = BackgroundShifterView;

  BackgroundShifterView.prototype.reset = function() {
    this.set('green-background');
  };

  BackgroundShifterView.prototype.set = function(backgroundType) {
    if (backgroundType==='solid')
      this.imageBackground.display(false);
    else
      this.imageBackground.display(true);
  };

  BackgroundShifterView.DEFAULT_OPTIONS = {
    image: 'green-background.png',
    color: 'white'
  };


  module.exports  = BackgroundShifterView;
});
