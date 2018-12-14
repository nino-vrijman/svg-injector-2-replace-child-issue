$(function () {
  Barba.Pjax.start();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    const injector = new SVGInjector({
      evalScripts: false,
      pngFallback: 'assets/png'
    })
    const elementsToReplace = document.querySelectorAll('.inject-me');
    console.log({elementsToReplace})
    injector.inject(elementsToReplace);
  });

  const HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.finish.bind(this));
    },
  
    finish: function() {
      document.body.scrollTop = 0;
      this.done();
    }
  });
  
  Barba.Pjax.getTransition = function() {
    return HideShowTransition;
  };
});