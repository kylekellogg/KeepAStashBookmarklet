(function() {
  /**
  * The basic idea behind this:
  *   Setup a globally accessible object (window.KeepAStash) which:
  *   A) Sets up the <iframe> which is hosted on the same URL we will be submitting to
  *   B) Sets up two-way communication
  *   C) Listens for the <iframe> loaded state
  *   D) Responds to loaded state with calling the addGift() function
  *     (This could be replaced by a form in order to handle descriptions)
  */
  if ( typeof window.KeepAStash !== 'function' ) {
    function KeepAStash() {
      function createForm() {
        if ( document.body.firstChild.id === 'keepAStashForm' ) {
          return;
        }
        
        if ( window.addEventListener ) {
          window.addEventListener( 'message', messageReceived, false );
        } else if ( window.attachEvent ) {
          window.attachEvent( 'message', messageReceived );
        }
        
        var iframe = document.createElement( 'iframe' );
        iframe.src = 'http://keepastash.kylekellogg.com/';
        iframe.name = iframe.id = 'keepAStashForm';
        document.body.insertBefore( iframe, document.body.firstChild );
      }
      
      function messageReceived( e ) {
        var obj = JSON.parse( e.data );
        
        if ( obj.state === 'complete' ) {
          console.log( 'Complete!', obj.url );
        } else if ( obj.state === 'frameLoaded' ) {
          window.KeepAStash.addGift();
        }
      }
      
      this.addGift = function() {
        createForm();
        
        document.getElementById( 'keepAStashForm' ).contentWindow.postMessage(
          JSON.stringify(
            {
              "authenticity_token": "TOKEN",
              "url": window.location.href
            }
          ),
          '*'
        );
      };
    }
    
    window.KeepAStash = new KeepAStash();
  }
})();