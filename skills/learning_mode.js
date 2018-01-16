/* This module includes some handy helpers for building your bot.
   This module should be DISABLED before you go to production!!! */
module.exports = function(controller) {

    controller.studio.before('create_a_reply',  function(convo, next) {

        // make this bot's studio identity available
        convo.setVar('bot',convo.context.bot.identity);

        // if learning mode is not enabled, redirect to an error
        if (!process.env.LEARNING_MODE) {
            convo.gotoThread('error_not_enabled')
        }
        next();
    });

    if (process.env.LEARNING_MODE) {
        console.log('--------------------------------------------');
        console.log('> LEARNING MODE ENABLED!');
        console.log('> This bot can modify itself! Disable learning mode in production!!')
        console.log('--------------------------------------------');

        controller.studio.beforeThread('create_a_reply', 'confirmation', function(convo, next) {

          // get original input
          var trigger = convo.source_message.text;

          // get reply
          var text = convo.extractResponse('response_text');

          controller.studio.createScript(convo.context.bot, trigger, text).then(function(script) {
              console.log('SUCCESSFULLY CREATED SCRIPT', script);
            next();
          }).catch(function(err) {
              convo.setVar('error', JSON.stringify(err));
              convo.gotoThread('error');
              next();
          });

        });


        controller.hears('edit', 'message_received', function(bot, message) {

          controller.studio.getScripts().then(function(scripts) {

            var reply = 'Which of my scripts would you like to modify?\n';

            for (var x = 0; x < scripts.length; x++) {

              reply = reply + '* [' + scripts[x].name + '](https://studio.botkit.ai/app/bots/' + bot.identity.botkit_studio_id + '/commands/' + scripts[x].id + ')\n';

            }

            bot.reply(message, reply);

          });
        });


    }


}
