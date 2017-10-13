module.exports = function(controller) {

    // expose history as an endpoint
    controller.webserver.post('/botkit/history', function(req, res) {
      if (req.body.user) {
        getHistoryForUser(req.body.user, 10, function(err, history) {
          res.json({success: true, history: history});
        });
      } else {
        res.json({success: false, history: [], error: 'no user specified'});
      }
    });

    function logMessage(message, user) {
        if (!user) {
            user = {
                id: message.user,
            }
        }

        if (!user.message_history) {
            user.message_history = [];
        }

        if (message.type == 'message' || message.type == 'message_received') {
          user.message_history.push({
            type: message.type,
            text: message.text,
          });
          controller.storage.users.save(user);
        }
    }

    function getHistoryForUser(user_id, limit, cb) {
        controller.storage.users.get(user_id, function(err, user) {

            if (err) return cb(err);

            if (!user || !user.message_history) {
                cb(null,[]);
            } else {
                var truncated = [];
                if (user.message_history.length > limit) {
                  truncated = user.message_history.slice(user.message_history.length - limit);
                } else {
                  truncated = user.message_history;
                }
                cb(null, truncated);
            }
        });
    }

    // log incoming messages to the user history
    controller.middleware.receive.use(function(bot, message, next) {
        controller.storage.users.get(message.user, function(err, user) {
            logMessage(message,user);
        });
        next();
    });


    controller.middleware.format.use(function(bot, message, platform_message, next) {
        controller.storage.users.get(message.to, function(err, user) {
            logMessage(platform_message,user);
        });
        next();
    });

}
