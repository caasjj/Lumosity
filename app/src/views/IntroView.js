define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Surface   = require('famous/core/Surface');
  var Modifier  = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');

  var BackgroundShifterView = require('views/BackgroundShifterView');
  var CircleContainerView   = require('views/CircleContainerView');

  var IntroView = function(){
    View.apply(this, arguments);

    this.backgroundShifterView = new BackgroundShifterView({
      perspective: this.options.perspective
    });

    this.circleContainerView = new CircleContainerView({
      perspective: this.options.perspective
    });
    
    this.circleContainerView.on('start-folding', function() {
      this.backgroundShifterView.set('solid');
    }.bind(this));

    this.circleContainerView.on('done', function() {
      this._eventOutput.emit('intro-done');
    }.bind(this));
    

    this._add(this.backgroundShifterView);
    this._add(this.circleContainerView);
  };

  IntroView.prototype = Object.create(View.prototype);
  IntroView.prototype.constructor = IntroView;
  IntroView.prototype.reset = function() {
    this.backgroundShifterView.reset();
    this.circleContainerView.reset();
  };

  IntroView.prototype.animate = function() {
    this.circleContainerView.animate();
  };

  IntroView.DEFAULT_OPTIONS = {
    perspective: 200
  };

  module.exports = IntroView;
});