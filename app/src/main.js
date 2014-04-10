define(function(require, exports, module) {
  var Engine   = require('famous/core/Engine');
  var Modifier = require('famous/core/Modifier');
  var AppView  = require('views/AppView');

  var mainContext = Engine.createContext();
  var perspective = 200;
  var animated = false;
  var simOngoing = false;

  mainContext.setPerspective( perspective );

  var appView = new AppView({
    perspective: perspective
  });
  mainContext.add(appView);

  appView.on('done', function() {
    simOngoing = false;
  });

  Engine.on('click', function() {
    if (!simOngoing) {
      simOngoing = true;
      appView.reset();
      appView.introView.animate();
    }
  });

  Engine.on('touchstart', function() {
    if (!simOngoing) {
      simOngoing = true;
      appView.reset();
      appView.introView.animate();
    }
  });
});
