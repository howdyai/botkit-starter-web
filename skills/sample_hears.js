module.exports = function(controller) {


  controller.hears('test','message_received', function(bot, message) {

    bot.reply(message,'I heard a test');

  });




}
