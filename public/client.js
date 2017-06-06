

    var messenger = {
        config: {
            ws_url: 'ws://localhost:3000', // CHANGE THIS TO YOUR HOST/PORT COMBO
        },
        options: {
            sound: true,
        },
        guid: null,
        on: function(event, handler) {
            this.message_window.addEventListener(event, function(evt) {
                handler(evt.detail);
            });
        },
        trigger: function(event, details) {
            var event = new CustomEvent(event, {detail: details});
            this.message_window.dispatchEvent(event);
        },

        send: function(text,e) {
            if (e) e.preventDefault();

            var message = {type: 'outgoing', text:text};

            this.clearReplies();

            var el = document.createElement('div');
            el.innerHTML = this.message_template({message: message});
            this.message_list.appendChild(el);

            this.socket.send(JSON.stringify({
                type: 'message',
                text: text,
                user: this.guid,
                channel: 'socket',
            }));
            this.input.value = '';

            this.trigger('sent', message);

            return false;
        },
        connect: function(ws_url) {
            var that = this;
            // Create WebSocket connection.
            that.socket = new WebSocket(ws_url);


            // Connection opened
            that.socket.addEventListener('open', function (event) {
                console.log('CONNECTED TO SOCKET');
                that.trigger('connected', event);
                that.socket.send(JSON.stringify({
                    type: 'hello',
                    user: that.guid,
                    channel: 'socket',
                }));
            });

            that.socket.addEventListener('error', function (event) {
                console.log('ERROR', event);
            });

            that.socket.addEventListener('close', function (event) {
                console.log('SOCKET CLOSED!');
                that.trigger('disconnected', event);
                setTimeout(function() {
                    console.log('RECONNECTING');
                    that.connect(that.config.ws_url);
                }, 3000);
            });

            // Listen for messages
            that.socket.addEventListener('message', function (event) {
                // console.log('Message from server', event.data);
                var message = JSON.parse(event.data);

                if (message.typing) {
                    that.trigger('typing', message);
                } else if (message.type == 'hello') {
                    that.guid = message.user;
                    setCookie('guid', message.user,1);
                } else {
                    that.trigger('received', message);
                }
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

            if (getCookie('guid')) {
                that.guid = getCookie('guid');
            }

            that.message_window = document.getElementById("message_window");

            that.message_list = document.getElementById("message_list");

            var source   = document.getElementById('message_template').innerHTML;
            that.message_template = Handlebars.compile(source);

            that.replies = document.getElementById('message_replies');

            that.input = document.getElementById('messenger_input');

            that.connect(that.config.ws_url);
            that.focus();

            that.on('connected', function() {
                that.message_window.className = 'connected';
                that.input.disabled = false;
            })

            that.on('disconnected', function() {
                that.message_window.className = 'disconnected';
                that.input.disabled = true;
            });

            that.on('typing', function() {
                that.clearReplies();
                if (!that.next_line) {
                    that.next_line = document.createElement('div');
                    that.next_line.innerHTML = that.message_template({message: {typing:true}});
                    that.message_list.appendChild(that.next_line);
                }
            });

            that.on('sent', function() {
                if (that.options.sound) {
                    var audio = new Audio('sent.mp3');
                    audio.play();
                }
            });

            that.on('received', function() {
                if (that.options.sound) {
                    var audio = new Audio('beep.mp3');
                    audio.play();
                }
            });

            that.on('received', function(message) {
                console.log(message);
                if (!that.next_line) {
                    that.next_line = document.createElement('div');
                    that.message_list.appendChild(that.next_line);
                }
                that.next_line.innerHTML = that.message_template({message: message});
                delete(that.next_line);



            });

            that.on('received', function(message) {

                that.clearReplies();
                if (message.attachments && message.attachments.quick_replies) {

                    for (var r = 0; r < message.attachments.quick_replies.length; r++) {
                        (function(reply) {

                            var el = document.createElement('a');
                            el.innerHTML = reply.text;
                            el.href = '#';

                            el.onclick = function() {
                                that.quickReply(reply.payload);
                            }

                            that.replies.appendChild(el);

                        })(message.attachments.quick_replies[r]);

                    }
                }
            });

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
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
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
