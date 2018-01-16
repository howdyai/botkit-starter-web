/* This module includes some handy helpers for building your bot.
   This module should be DISABLED before you go to production!!! */
module.exports = function(controller) {

    controller.hears('edit', 'message_received', function(bot, message) {

      controller.studio.getScripts().then(function(scripts) {

        console.log('scripts', scripts);
        var reply = 'Which of my scripts would you like to modify?\n';

        for (var x = 0; x < scripts.length; x++) {

          reply = reply + '* [' + scripts[x].name + '](https://studio.botkit.ai/app/bots/' + bot.identity.botkit_studio_id + '/commands/' + scripts[x].id + ')\n';

        }

        bot.reply(message, reply);

      });
    });


    controller.studio.beforeThread('create_a_reply', 'confirmation', function(convo, next) {

      // get original input
      var trigger = convo.source_message.text;

      // get reply
      var text = convo.extractResponse('response_text');

      controller.studio.createScript(convo.context.bot, trigger, text).then(function(script) {
        next();
      }).catch(function(err) {
        next();
      });



    });


}
