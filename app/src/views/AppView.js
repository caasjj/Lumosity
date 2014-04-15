define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Modifier  = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');

  var IntroView      = require('views/IntroView');
  var ScoreboardView = require('views/ScoreboardView');

  function AppView() {
    View.apply(this, arguments);

    this.introView = new IntroView({
      perspective: this.options.perspective
    });

    this._add(this.introView);

    this.scoreboardView = new ScoreboardView({
      perspective: this.options.perspective
    });

    this.scoreboardMod = new Modifier({
      size: [window.innerWidth, window.innerHeight],
      origin: [0.5, 0.5],
      transform: Transform.multiply(
        Transform.translate(0, 0, 100),
        Transform.scale(.5, .5, 1)
      ),
      opacity: 0
    });

    this.fadeInScoreboard = function() {
      this.scoreboardMod.setOpacity(1, {duration: 200},
        function() {
          this.scoreboardView.bodyView.showRibbon();
        }.bind(this)
      );
    };
    this._add(this.scoreboardMod).add(this.scoreboardView);

    this.scoreboardView.on('done', function() {
      this._eventOutput.emit('done');
    }.bind(this));

    this.introView.on('intro-done', function() {
      this.fadeInScoreboard.call(this);
    }.bind(this));
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;
  AppView.prototype.reset = function() {
    this.scoreboardMod.setOpacity(0);
    this.scoreboardView.bodyView.reset();
    this.introView.reset();
  };

  AppView.DEFAULT_OPTIONS = {
    perspective: 200
  };

  module.exports = AppView;
});
