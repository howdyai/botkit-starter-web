module.exports = function(controller) {

  controller.hears('quick replies','message_received', function(bot, message) {

    bot.reply(message, {
        text: 'Look, quick replies!',
        attachments: {
            quick_replies: [
                {
                    text: 'Hello',
                    payload: 'hello'
                },
                {
                    text: 'Test',
                    payload: 'test'
                },
            ]
        }
      },function() {});


      });

}
