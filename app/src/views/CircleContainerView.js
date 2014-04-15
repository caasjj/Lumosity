define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Modifier  = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');

  var BackgroundView = require('views/BackgroundView');
  var CircleView     = require('views/CircleView');

  function CircleContainerView() {
    View.apply(this, arguments);

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var circleContainerWidth = windowWidth - this.options.widthMargin;
    var circleContainerHeight = windowHeight - this.options.heightMargin;

    this.finalBannerWidth = Math.ceil(circleContainerWidth * 0.5 *
                           this.options.circleZoom * this.options.circleScale +
                           (this.options.widthMargin));

    this.blueBackground = new BackgroundView({
      surface: {
        content: '<img src="content/images/' + this.options.backgroundImage + '" width="' + windowWidth + '" height="' + windowHeight + '">'
      },
      perspective: this.options.perspective
    });

    this.blueBackgroundMod = new Modifier({
      transform: Transform.translate(0, 0, this.options.perspective*1.5-50),
      opacity: 0.25
    });

    this.circleView = new CircleView({
      width: circleContainerWidth,
      height: circleContainerHeight,
      perspective: this.options.perspective,
      circleZoom: this.options.circleZoom,
      circleScale: this.options.circleScale
    });

    this.circleView.on('start-folding', this.foldBackground.bind(this));

    this.circleMod = new Modifier({
      size: [circleContainerWidth, circleContainerHeight],
      origin:[0.5, 0.5]
    });

    this._add(this.blueBackgroundMod).add(this.blueBackground);
    this._add(this.circleMod).add(this.circleView);

    this.circleView.on('done', function() {
      this._eventOutput.emit('done');
    }.bind(this));

  }

  CircleContainerView.prototype = Object.create(View.prototype);
  CircleContainerView.prototype.constructor = CircleContainerView;
  CircleContainerView.prototype.reset = function() {
    this.blueBackgroundMod.setTransform(Transform.translate(0,0,this.options.perspective*1.5-50));
    this.blueBackgroundMod.setOpacity(0.25);
    this.circleView.reset();
  };

  CircleContainerView.prototype.animate = function() {
    this.circleView.animate();
    this.blueBackgroundMod.setOpacity(
      1,
      {
        duration: 500,
        curve: 'linear'
      }
    );
    this.blueBackgroundMod.setTransform(
      Transform.translate(0,0,0),
      {
        duration: 500,
        curve: 'linear'
      }
    );
  };

  CircleContainerView.prototype.foldBackground = function() {
    this._eventOutput.emit('start-folding');
    var windowHeight = window.innerHeight;
    this.blueBackgroundMod.setTransform(
      Transform.translate(0, this.finalBannerWidth - windowHeight, 0),
        {
          duration: 500,
          curve: 'linear'
        }
      );
  };

  CircleContainerView.DEFAULT_OPTIONS = {
    perspective: 200,
    widthMargin: 10,
    heightMargin: 10,
    circleZoom: 1.1,
    circleScale: 0.25,
    backgroundImage: 'blue-background.png'
  };

  module.exports = CircleContainerView;
});
