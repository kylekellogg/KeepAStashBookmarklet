(function() {
  /**
  * If undefined, load script.
  * Otherwise, call main method again. This could be replaced with closing the iframe/content loaded in.
  */
  if ( window.KeepAStash === undefined ) {
    var a = document.createElement( 'script' );
    a.setAttribute( 'src', 'http://keepastash.kylekellogg.com/keepastash.js' );
    a.onload = function() {
      //  Good to go
      window.KeepAStash.addGift();
    };
    a.onreadystatechange = function onReadyStateChange() {
      if ( this.readystate === 'complete' ) {
        //  Good to go
        window.KeepAStash.addGift();
      }
    };
    document.body.appendChild( a );
  } else {
    window.KeepAStash.addGift();
  }
})();