module.exports = function(controller) {

  if (controller.storage && controller.storage.users && controller.storage.users.remember) {

    controller.middleware.capture.use(function(bot, response, convo, next) {
      console.log('CAPTURE MIDDLEWARE! remember some stuff', convo.extractResponses());
      var responses = convo.extractResponses();
      controller.storage.users.remember(convo.context.user, responses);

      next();

    });

    controller.on('conversationEnded', function(bot, convo) {
      console.log('CONVO OVER', convo.extractResponses());

      var responses = convo.extractResponses();
      controller.storage.users.remember(convo.context.user, responses);

    });


  }


}
