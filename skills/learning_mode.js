/* This module includes some handy helpers for building your bot.
   This module should be DISABLED before you go to production!!! */
module.exports = function(controller) {

    controller.studio.before('tutorial', function(convo, next) {
        convo.setVar('bot',convo.context.bot.identity);
        next();
    });

    controller.studio.before('create_a_reply',  function(convo, next) {

        // make this bot's studio identity available
        convo.setVar('bot',convo.context.bot.identity);

        // if learning mode is not enabled, redirect to an error
        if (process.env.LEARNING_MODE!=='true') {
            convo.gotoThread('error_not_enabled')
        }
        next();
    });

    if (process.env.LEARNING_MODE=='true') {
        console.log('--------------------------------------------');
        console.log('> LEARNING MODE ENABLED!');
        console.log('> This bot can modify itself! Disable learning mode in production!!')
        console.log('--------------------------------------------');

        controller.studio.beforeThread('create_a_reply', 'confirmation', function(convo, next) {

          // get original input
          var trigger = convo.source_message.text;

          // sanitize the trigger text a bit
          // remove punctuation at the end of the sentence.
          // allow users to exclude punctuation in real life.
          trigger = trigger.replace(/(\?|\!|\.)*$/,'').toLowerCase();

          // get reply
          var text = convo.extractResponse('response_text');

          controller.studio.createScript(convo.context.bot, trigger, text).then(function(script) {
              convo.setVar('new_script', script);
            next();
          }).catch(function(err) {
              convo.setVar('error', JSON.stringify(err));
              convo.gotoThread('error');
              next();
          });

        });

    }


}
