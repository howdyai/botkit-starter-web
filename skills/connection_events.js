module.exports = function(controller) {


    if (process.env.studio_token) {
      controller.on('hello', function(bot, message) {
            // a new session with an unknown user has begun
            controller.studio.run(bot, 'welcome_user', message.user, message.channel, message);
      });

      controller.on('welcome_back', function(bot, message) {
          // a known user has started a new, fresh session
          controller.studio.run(bot, 'welcome_user', message.user, message.channel, message).then(function(convo) {
              convo.gotoThread('welcome_back');
          })
      });

      controller.studio.before('welcome_user', function(convo, next) {
          convo.setVar('bot', controller.studio_identity);
          next();
      });

      controller.on('reconnect', function(bot, message) {
          // the connection between the client and server experienced a disconnect/reconnect
          // bot.reply(message, 'Some sub-space interference just caused our connection to be interrupted. But I am back now.');
      });
    }

}
