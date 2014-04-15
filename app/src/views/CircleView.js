define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Surface   = require('famous/core/Surface');
  var Modifier  = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var Timer     = require('famous/utilities/Timer');

  function _setImage(image, width, height) {
    if (!height)
      this.setContent( '<img src="content/images/'+ image + '" width="' + width + '">' );
    else
      this.setContent( '<img src="content/images/'+ image + '" width="' + width + '" height="' + height + '">' );
  }

  function CircleView(){
    View.apply(this, arguments);

    var width = this.options.width;
    var height = this.options.height;

    this.circleSize = width * 0.5;

    this.circle = new Surface();
    this.wedge = new Surface();

    _setImage.call(this.circle, 'wheel-blue-2.png', this.circleSize);
    _setImage.call(this.wedge, 'wedge-yellow.png', this.circleSize);

    this.mod = new Modifier({
      size:[this.circleSize, this.circleSize],
      origin: [.5, .5]
    });

    this.circleFlyInMod = new Modifier({
      transform: Transform.translate(0, 0, this.options.perspective*1.5)
    });

    this.wedgeFlyInMod = new Modifier({
      transform: Transform.translate(0.1*width, -0.1*height, this.options.perspective*1.5)
    });

    var node = this._add(this.mod);
    node.add( this.circleFlyInMod ).add( this.circle );
    node.add( this.wedgeFlyInMod ).add( this.wedge );
  }

  CircleView.prototype = Object.create(View.prototype);
  CircleView.prototype.constructor = CircleView;
  CircleView.prototype.reset = function() {
    var width = this.options.width;
    var height = this.options.height;
    this.circleFlyInMod.setTransform( Transform.translate(0,0,this.options.perspective*1.5));
    this.wedgeFlyInMod.setTransform( Transform.translate(0.1*width, -0.1*height, this.options.perspective*1.5) );
    this.mod.setOrigin([.5,.5]);
    this.mod.setTransform( Transform.scale(1,1,1));
  };

  CircleView.prototype.animate = function() {
    this.circleFlyInMod.setTransform(
      Transform.translate(0,0,0),
      {
        duration: 500,
        curve: 'linear'
      }, this.animateWedge.bind(this));
  };

  CircleView.prototype.animateWedge = function() {
    this.wedgeFlyInMod.setTransform(
      Transform.translate(0,0,0),
      {
        duration: 500,
        curve: 'linear'
      }, function() {
         this._eventOutput.emit('start');
         this.animateZoom();
      }.bind(this));
  };

  CircleView.prototype.animateZoom = function() {
    this.mod.setTransform(
      Transform.scale(this.options.circleZoom, this.options.circleZoom, 1),
      { duration: 250,
        curve: 'linear'
      },
      function(){
        Timer.setTimeout( this.animateOrigin.bind(this), 250 );
      }.bind(this) );
  };

  CircleView.prototype.animateOrigin = function() {
    this._eventOutput.emit('start-folding');
    this.mod.setOrigin(
        [1,0],
        { duration: 500,
          curve: 'linear'
        },
        function(){
          //this._eventOutput.emit('done');
        }.bind(this));

    this.mod.setTransform(
      Transform.scale(this.options.circleScale, this.options.circleScale, 1),
      { duration: 500,
        curve: 'linear'
      },
      function(){
        this._eventOutput.emit('done');
      }.bind(this) );
  };


  CircleView.DEFAULT_OPTIONS = {
    width: 270,
    height:  518,
    perspective: 200,
    circleZoom: 1.1,
    circleScale: 0.25,
    backgroundImage: 'blue-background.png'
  };

  module.exports = CircleView;
});
