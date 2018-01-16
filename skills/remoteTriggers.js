var debug = require('debug')('botkit:remote triggers');

/* receive and respond to remote script triggers */
module.exports = function(controller) {

  controller.on('trigger', function(bot, event) {
    debug('Trigger Received: ', event);

    controller.studio.run(bot, event.script, event.user, event.channel, event).then(function(convo) {
      if (convo) {
        if (event.thread && convo.hasThread(event.thread)) {
          convo.gotoThread(event.thread);
        }
      } else {
        bot.reply(event, 'I was unable to load a script from Botkit Studio called `' + event.script +'`');
      }
    }).catch(function(err) {

      console.log('Error triggering script: ', err);
      bot.reply(event, 'I was unable to load a script from Botkit Studio called `' + event.script +'`');

    })

  });

}
