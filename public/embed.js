var messenger = {
  active: true,
  activate: function() {
    this.active = true;
    if (this.container) {
      this.container.className = 'active';
    }
    this.tellClient('activate');
    setCookie('messenger_active', this.active);
  },
  deactivate: function() {
    this.active = false;
    if (this.container) {
      this.container.className = '';
    }
    this.tellClient('deactivate');
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
  tellClient: function(message) {
    this.chatClient.postMessage(message, '*');
  },
  receiveMessage: function(message) {
    // message contains the following fields:
    // message.data, message.origin, message.source

    switch (message.data.name) {
      case 'booted':
        messenger.tellClient({
          name: 'connect'
        });

        if (getCookie('messenger_active') == 'true') {
          messenger.activate();
        }
        console.log('Embedded Botkit: Ready!');
        break;
      case 'connected':

        console.log('100% CONNECTED AND READY TO GO');

        break;
    }
  },
  triggerScript: function(script, thread) {

    this.tellClient({
      type: 'event',
      name: 'trigger',
      script: script,
      thread: thread,
    });
  },
  identifyUser: function(user) {

    // user should contain any of the following:
    // id, email, nickname, first_name, last_name, full_name, gender, timezone, timezone_offset

    this.tellClient({
      type: 'event',
      name: 'identify',
      user: user,
    });

  },
  boot: function() {
    var that = this;

    that.container = document.getElementById('embedded_messenger');
    that.header = document.getElementById('messenger_header');
    that.chatClient = document.getElementById('botkit_client').contentWindow;

    if (!that.chatClient) {
      console.error('Cannot find Botkit chat client iframe. Make sure your iframe has the id #botkit_client');
    }

    window.addEventListener('message', that.receiveMessage, false);

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
// console.log('EMBED READY');
messenger.boot();
// })();
