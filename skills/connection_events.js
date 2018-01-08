module.exports = function(controller) {


    controller.on('hello', function(bot, message) {

          // a new session with an unknown user has begun
          controller.studio.run(bot, 'tutorial_hello', message.user, message.channel, message);
    });

    controller.on('welcome_back', function(bot, message) {

        // a known user has started a new, fresh session
        controller.studio.run(bot, 'tutorial_hello', message.user, message.channel, message).then(function(convo) {
            convo.gotoThread('welcome_back');
        })
    });

    controller.studio.before('tutorial_hello', function(convo, next) {
        convo.setVar('bot', controller.studio_identity);
        next();
    });

    controller.on('reconnect', function(bot, message) {

        // the connection between the client and server experienced a disconnect/reconnect
        // bot.reply(message, 'Some sub-space interference just caused our connection to be interrupted. But I am back now.');
    });


}
