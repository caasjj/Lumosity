define(function(require, exports, module) {
  var View     = require('famous/core/View');
  var Surface  = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');

  var BackgroundView = function() {
    View.apply( this, arguments);
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    this.surface = new Surface( this.options.surface );
    this.modifier = new Modifier({
      size: [windowWidth, windowHeight]
    });
    this._add(this.modifier).add(this.surface)
  };

  BackgroundView.prototype = Object.create(View.prototype);
  BackgroundView.prototype.constructor = BackgroundView;

  BackgroundView.prototype.display = function(show) {
    if (show) {
      this.modifier.setOpacity(1);
    } else {
      this.modifier.setOpacity(0);
    }
  };

  BackgroundView.DEFAULT_OPTIONS = {
    surface: {
      properties: {
        backgroundColor: 'white'
      }
    },
    perspective: 200
  }

  module.exports = BackgroundView;
});