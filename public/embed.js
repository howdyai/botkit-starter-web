var messenger = {
  active: false,
  activate: function() {
    this.active = true;
    this.messenger.className = 'active';
    setCookie('messenger_active', this.active);
  },
  deactivate: function() {
    this.active = false;
    this.messenger.className = '';
    setCookie('messenger_active', this.active);
  },
  toggle: function() {
    console.log('TOGGLE');
    if (this.active) {
      this.deactivate();
    } else {
      this.activate();
    }
  },
  boot: function() {
    var that = this;

    that.messenger = document.getElementById('embedded_messenger');
    that.header = document.getElementById('messenger_header');
    if (getCookie('messenger_active') == 'true') {
      that.activate();
    }
    console.log('Booted embed!');
    return this;
  }

}


    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

// (function() {
  // your page initialization code here
  // the DOM will be available here
  console.log('EMBED READY');
  messenger.boot();
// })();
