define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Surface   = require('famous/core/Surface');
  var Modifier  = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');

  // uses a combination of views below! (not in seperate files.. haha) try: CMD + A, then CMD + (K --> 2)

  function ScoreboardView() {

    View.apply(this, arguments);

    var width = this.options.width;
    var height = this.options.height;

    this.headerView = new HeaderView();
    this.headerMod = new Modifier({
      origin: [0, 0],
      size: [undefined, height * .08],
      opacity: 1
    });

    this.bodyView = new BodyView();
    this.bodyMod = new Modifier({
      origin: [0, 0],
      transform: Transform.translate(0, height * .15, 0),
      size: [undefined, height * .7],
      opacity: 1
    });

    this.footerView = new FooterView();
    this.footerMod = new Modifier({
      origin: [0, 0],
      size: [width, height * .22],
      transform: Transform.translate(0, height * .78, 0),
      opacity: 1
    });

    // this._add(this.backdropMod).add(this.backdropSurf);
    this._add(this.headerMod).add(this.headerView);
    this._add(this.bodyMod).add(this.bodyView);
    this.bodyView.on('done', function() {
      this._eventOutput.emit('done');
    }.bind(this));
    this._add(this.footerMod).add(this.footerView);
  }

  ScoreboardView.prototype = Object.create(View.prototype);
  ScoreboardView.prototype.constructor = ScoreboardView;
  ScoreboardView.prototype.toggleText = function() {
    var opacity = this.headerMod.getOpacity();
    function setOpacity(val) {
      this.headerMod.setOpacity(val, {duration:1000});
      this.bodyMod.setOpacity(val, {duration:1000});
      this.footerMod.setOpacity(val, {duration:1000});
    }
    if (opacity)
      setOpacity.call(this, 0);
    else
      setOpacity.call(this, 1);
  };

  ScoreboardView.DEFAULT_OPTIONS = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  function HeaderView() {
    View.apply(this, arguments);

    function _createHouse() {
      var houseSurf = new Surface({
        content: '<img width=50 src="content/images/house-icon.png"/>'
      });
      var houseMod = new Modifier({
        origin: [0, 0.5],
        size: [true, true],
        transform: Transform.translate(0, -15, 0) // dependent on size of icon; doesn't affect centering with scaled window
      });
      this._add(houseMod).add(houseSurf);
    }

    function _createTitle() {
      var titleSurf = new Surface({
        content: 'lumosity',
        properties: {
          fontSize: '18px'
        }
      });
      var titleMod = new Modifier({
        size: [true, true],
        origin: [.5, .5],
        transform: Transform.translate(-40, -6, 0)
      });
      this._add(titleMod).add(titleSurf);
    }

    // _createBackdrop.call(this);
    _createHouse.call(this);
    _createTitle.call(this);
  }

  HeaderView.prototype = Object.create(ScoreboardView.prototype);
  HeaderView.prototype.constructor = HeaderView;
  HeaderView.DEFAULT_OPTIONS = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  function BodyView() {
    View.apply(this, arguments);

    var height = this.options.height;

    function _createChallengeTitle() {
      var challengeTitleSurf = new Surface({
        content: 'Chalkboard Challenge',
        properties: {
          color: 'grey',
          fontSize: '18px'
        }
      });
      var challengeTitleMod = new Modifier({
        size: [true, true],
        origin: [.5, 0],
        transform: Transform.translate(-90, height * .7 * .05, 0)
      });

      this._add(challengeTitleMod).add(challengeTitleSurf);
    }

    function  _createScores() {
      var scores = [3750, '-', '-', '-', '-'];

      function _createScoreKeys() {
        for (var i = 0; i < scores.length; i++){
          var scoreKeySurf = new Surface({
            content: (i + 1) + '.',
            properties: {
              color: 'grey',
              fontSize: '16px'
            }
          });
          var scoreNumMod = new Modifier({
            size: [true, true],
            origin: [.5, 0],
            transform: Transform.translate(-45, height * .7 * .15 + i * (height * .7 * .1), 0)
          });
          this._add(scoreNumMod).add(scoreKeySurf);
        }
      }

      function _createScoreVals() {
        for (var i = 0; i < scores.length; i++){
          var scoreValSurf = new Surface({
            content: scores[i],
            properties: {
              textAlign: 'right',
              color: 'grey',
              fontSize: '16px'
            }
          });
          var scoreValMod = new Modifier({
            size: [40, true],
            origin: [.5, 0],
            transform: Transform.translate(18, height * .7 * .15 + i * (height * .7 * .1), 0)
          });
          this._add(scoreValMod).add(scoreValSurf);
        }
      }

      _createScoreKeys.call(this);
      _createScoreVals.call(this);
    }

    function _createStatus() {
      var statusSurf = new Surface({
        content: '25 Equations',
        properties: {
          color: 'teal',
          fontSize: '18px'
        }
      });
      var statusMod = new Modifier({
        size: [true, true],
        origin: [.5, 0],
        transform: Transform.translate(-50, height * .7 * .65, 0)
      });
      this._add(statusMod).add(statusSurf);
    }

    function _createMessage() {
      var messageSurf = new Surface({
        content: 'Great first play!',
        properties: {
          color: 'grey',
          fontSize: '17px'
        }
      });
      var messageMod = new Modifier({
        size: [true, true],
        origin: [.5, 0],
        transform: Transform.translate(-55, height * .7 * .65 + 30, 0)
      });
      this._add(messageMod).add(messageSurf);
    }

    function _createRibbon() {

      var ribbonSurf = new Surface({
        content: '<img width=200 src="content/images/ribbon_v2.png"/>'
      });
      this.ribbonMod = new Modifier({
        size: [200, true],
        origin: [.5, 0],
        transform: Transform.translate(0, height * .7 * .15 + 0 * (height * .7 * .1) - 8, 0),
        opacity:0
      });
      this._add(this.ribbonMod).add(ribbonSurf);

      this.ribbonCoverSurf = new Surface({
        size: [200, 40],
        content:'<div></div>',
        properties: {
          backgroundColor: 'white'
        }
      });
      this.ribbonCoverMod = new Modifier({
        size: [200, 40],
        origin: [.5, 0],
        transform: Transform.translate(0, height * .7 * .15 + 0 * (height * .7 * .1) - 8, 0),
        opacity:1
      });
      this._add(this.ribbonCoverMod).add(this.ribbonCoverSurf);

      function BadgeView() {
        View.apply(this, arguments);

        var badgeSurf = new Surface({
          content: '<img width=82 src="content/images/trophee-icon.png"/>'
        });
        var badgeMod = new Modifier({
          size: [82, 82],
          origin: [.5, .5]
        });
        this._add(badgeMod).add(badgeSurf);
      }
      BadgeView.prototype = Object.create(View.prototype);
      BadgeView.prototype.constructor = BadgeView;
      this.badgeViewMod = new Modifier({
        size: [true, true],
        origin: [0.5, 0],
        transform: Transform.multiply(
          Transform.translate(-110, height * .7 * .15 + 0 * (height * .7 * .1) + 8, 0),
          Transform.scale(.02, .02, 1)
        )
      });
      this._add(this.badgeViewMod).add(new BadgeView());
    }

    this.showRibbon = function() {
      function slideCover() {
        this.ribbonMod.setOpacity(1);
        this.ribbonCoverMod.setTransform(
          Transform.translate(
            window.innerWidth, height * .7 * .15 + 0 * (height * .7 * .1) - 8, 0),
            {duration: 800},
            function() {
              this._eventOutput.emit('done');
            }.bind(this)
        );
      }

      function popBadge() {
        this.badgeViewMod.setTransform(
          Transform.multiply(
            Transform.translate(-110, height * .7 * .15 + 0 * (height * .7 * .1) + 8, 0), // how can i extend badgeViewMod's transform/translation? getTransform and getFinaltransform?! halp
            Transform.scale(.8, .8, 1)
          ),
          {duration:200, curve:'easeOut'},
          function() {
            this.badgeViewMod.setTransform(
              Transform.multiply(
                Transform.translate(-110, height * .7 * .15 + 0 * (height * .7 * .1) + 8, 0), // how can i extend badgeViewMod's transform/translation? getTransform and getFinaltransform?! halp
                Transform.scale(.7, .7, 1)
              ),
              {duration:100, curve: 'easeIn'}
            );
          }.bind(this)
        );
      }

      slideCover.call(this);
      setTimeout(popBadge.bind(this), 180);
    }.bind(this);

    this.reset = function() {

      function _resetCover() {
        this.ribbonMod.setOpacity(0);
        this.ribbonCoverMod.setTransform(
          Transform.translate(0, height * .7 * .15 + 0 * (height * .7 * .1) - 8, 0)
        );
      }

      function _resetBadge() {
        this.badgeViewMod.setTransform(
          Transform.multiply(
            Transform.translate(-110, height * .7 * .15 + 0 * (height * .7 * .1) + 8, 0),
            Transform.scale(.02, .02, 1)
          )
        );
      }

      _resetCover.call(this);
      _resetBadge.call(this);
    }.bind(this);

    _createChallengeTitle.call(this);
    _createRibbon.call(this);
    _createScores.call(this);
    _createStatus.call(this);
    _createMessage.call(this);
  }

  BodyView.prototype = Object.create(ScoreboardView.prototype);
  BodyView.prototype.constructor = BodyView;
  BodyView.DEFAULT_OPTIONS = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  function FooterView() {
    View.apply(this, arguments);

    var width = this.options.width;
    var height = this.options.height;

    // -------- create backdrop: for development only
    // -------- actually we need it for footerview lol
    function  _createBackdrop() {
      var surf = new Surface({
          // backgroundColor: 'rgb(247,247,246)',
        content: '<img width=' + (width + 1) + ' height=' + height * .22 + ' src="content/images/footer.png"/>'
      });
      var mod = new Modifier({
        size: [320, undefined],
        origin: [0, 0],
        transform: Transform.translate(-1, 0, 0)
      });
      this._add(mod).add(surf);
    }

    function _createNextButton() {
      var buttonView = new NextGameView();
      var buttonMod = new Modifier({
        size: [width * .8, height * .09],
        origin: [0, 0],
        transform: Transform.translate(width * .1, height * .2 * .17, 0)
      });
      this._add(buttonMod).add(buttonView);
    }

    function _createReplayButton() {
      var replaySurf = new Surface({
        content: 'Replay Game',
        properties: {
          color: 'grey',
          fontSize: '14px'
        }
      });
      var replayMod = new Modifier({
        size: [true, true],
        origin: [.5, .5],
        transform: Transform.translate(-40, height * .2 * .25, 0)
      });
      this._add(replayMod).add(replaySurf);
    }

    function NextGameView() {
      View.apply(this, arguments);

      function _createContainer() {
        var containerSurf = new Surface({
          properties: {
            backgroundColor: 'rgba(247, 129, 61, 1)',
            borderRadius: '2px',
            boxShadow: '0px 2px 2px rgb(183, 94, 42)'
          }
        });
        var containerMod = new Modifier({
          size: [undefined, undefined],
          origin: [0, 0]
        });
        this._add(containerMod).add(containerSurf);
      }
      function _createText() {
        var nextButtonTextSurf = new Surface({
          content: 'Next Recommended Game ',
          properties: {
            fontSize: '16px',
            color: 'white'
          }
        });
        var nextButtonTextMod = new Modifier({
          size: [true, true],
          origin: [.5, .5],
          transform: Transform.translate(-105, -9, 0)
        });
        this._add(nextButtonTextMod).add(nextButtonTextSurf);
      }
      function _createArrow() {
        var nextButtonArrowSurf = new Surface({
          content: '<img width=20 height="14" src="content/images/arrow-icon.png"/>'
        });
        var nextButtonArrowMod = new Modifier({
          size: [true, true],
          origin: [0.5, 0.5],
          transform: Transform.translate(95, -8, 0)
        });
        this._add(nextButtonArrowMod).add(nextButtonArrowSurf);
      }

      _createContainer.call(this);
      _createText.call(this);
      _createArrow.call(this);
    }

    NextGameView.prototype = Object.create(View.prototype);
    NextGameView.prototype.constructor = NextGameView;

    _createBackdrop.call(this);
    _createNextButton.call(this);
    _createReplayButton.call(this);
  }
  FooterView.prototype = Object.create(ScoreboardView.prototype);
  FooterView.prototype.constructor = FooterView;
  FooterView.DEFAULT_OPTIONS = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  module.exports = ScoreboardView;
});
