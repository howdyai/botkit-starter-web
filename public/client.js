    var converter = new showdown.Converter();


    var messenger = {
      config: {
        ws_url: (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host,
        http_url: (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host + '/botkit/receive',
        reconnect_timeout: 3000,
        max_reconnect: 5,
      },
      options: {
        sound: false,
        use_sockets: true,
      },
      reconnect_count: 0,
      guid: null,
      on: function(event, handler) {
        this.message_window.addEventListener(event, function(evt) {
          handler(evt.detail);
        });
      },
      trigger: function(event, details) {
        var event = new CustomEvent(event, {
          detail: details
        });
        this.message_window.dispatchEvent(event);
      },

      send: function(text, e) {
        if (e) e.preventDefault();
        if (!text) {
          return;
        }
        var message = {
          type: 'outgoing',
          text: text
        };

        this.clearReplies();

        var el = document.createElement('div');
        message.html = converter.makeHtml(message.text);
        el.innerHTML = this.message_template({
          message: message
        });
        this.message_list.appendChild(el);

        if (this.options.use_sockets) {
          this.socket.send(JSON.stringify({
            type: 'message',
            text: text,
            user: this.guid,
            channel: 'socket',
          }));
        } else {

          this.webhook({
            type: 'message',
            text: text,
            user: this.guid,
            channel: 'webhook',
          });
        }
        this.input.value = '';

        this.trigger('sent', message);

        return false;
      },
      webhook: function(message) {
        that = this;
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
              var response = xmlhttp.responseText;
              var message = null;
              try {
                message = JSON.parse(response);
              } catch (err) {
                that.trigger('webhook_error', err);
                return;
              }
              that.trigger(message.type, message);
            } else {
              that.trigger('webhook_error', new Error('status_' + xmlhttp.status));
            }
          }
        };

        xmlhttp.open("POST", "/botkit/receive", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(message));

      },
      connectWebhook: function() {
        var that = this;
        if (getCookie('guid')) {
          that.guid = getCookie('guid');
          connectEvent = 'welcome_back';
        } else {
          that.guid = guid();
          setCookie('guid', that.guid, 1);
        }

        // connect immediately
        that.trigger('connected', {});
        that.webhook({
          type: connectEvent,
          user: that.guid,
          channel: 'webhook',
        });

      },
      connect: function(ws_url) {
        var that = this;
        // Create WebSocket connection.
        that.socket = new WebSocket(ws_url);

        var connectEvent = 'hello';
        if (getCookie('guid')) {
          that.guid = getCookie('guid');
          connectEvent = 'welcome_back';
        } else {
          that.guid = guid();
          setCookie('guid', that.guid, 1);
        }

        // Connection opened
        that.socket.addEventListener('open', function(event) {
          console.log('CONNECTED TO SOCKET');
          that.reconnect_count = 0;
          that.trigger('connected', event);
          that.socket.send(JSON.stringify({
            type: connectEvent,
            user: that.guid,
            channel: 'socket',
          }));
        });

        that.socket.addEventListener('error', function(event) {
          console.error('ERROR', event);
        });

        that.socket.addEventListener('close', function(event) {
          console.log('SOCKET CLOSED!');
          that.trigger('disconnected', event);
          if (that.reconnect_count < that.config.max_reconnect) {
            setTimeout(function() {
              console.log('RECONNECTING ATTEMPT ',++that.reconnect_count);
              that.connect(that.config.ws_url);
            }, that.config.reconnect_timeout);
          } else {
            that.message_window.className = 'offline';
          }
        });

        // Listen for messages
        that.socket.addEventListener('message', function(event) {
          var message = null;
          try {
            message = JSON.parse(event.data);
          } catch (err) {
            that.trigger('socket_error', err);
            return;
          }

          that.trigger(message.type, message);
        });
      },
      clearReplies: function() {
        this.replies.innerHTML = '';
      },
      quickReply: function(payload) {
        this.send(payload);
      },
      focus: function() {
        this.input.focus();
      },
      boot: function() {

        console.log('Booting up');

        var that = this;

        that.message_window = document.getElementById("message_window");

        that.message_list = document.getElementById("message_list");

        var source = document.getElementById('message_template').innerHTML;
        that.message_template = Handlebars.compile(source);

        that.replies = document.getElementById('message_replies');

        that.input = document.getElementById('messenger_input');

        that.focus();



        that.on('connected', function() {
          that.message_window.className = 'connected';
          that.input.disabled = false;
        })

        that.on('disconnected', function() {
          that.message_window.className = 'disconnected';
          that.input.disabled = true;
        });

        that.on('webhook_error', function(err) {

          alert('Error sending message!');
          console.error('Webhook Error',err);

        });

        that.on('typing', function() {
          that.clearReplies();
          if (!that.next_line) {
            that.next_line = document.createElement('div');
            that.next_line.innerHTML = that.message_template({
              message: {
                isTyping: true
              }
            });
            that.message_list.appendChild(that.next_line);
          }
        });

        that.on('sent', function() {
          if (that.options.sound) {
            var audio = new Audio('sent.mp3');
            audio.play();
          }
        });

        that.on('message', function() {
          if (that.options.sound) {
            var audio = new Audio('beep.mp3');
            audio.play();
          }
        });

        that.on('message', function(message) {
          if (!that.next_line) {
            that.next_line = document.createElement('div');
            that.message_list.appendChild(that.next_line);
          }
          message.html = converter.makeHtml(message.text);
          that.next_line.innerHTML = that.message_template({
            message: message
          });
          delete(that.next_line);

        });

        that.on('message', function(message) {
          that.clearReplies();
          if (message.quick_replies) {

            for (var r = 0; r < message.quick_replies.length; r++) {
              (function(reply) {

                var el = document.createElement('a');
                el.innerHTML = reply.title;
                el.href = '#';

                el.onclick = function() {
                  that.quickReply(reply.payload);
                }

                that.replies.appendChild(el);

              })(message.quick_replies[r]);
            }
          }
        });

        // connect to the chat server!
        if (that.options.use_sockets) {
          that.connect(that.config.ws_url);
        } else {
          that.connectWebhook();
        }

        return that;
      }
    };


    (function() {
      // your page initialization code here
      // the DOM will be available here
      console.log('READY');
      messenger.boot();
    })();


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

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
