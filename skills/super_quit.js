/*

THIS MODULE IS DISABLED BY DEFAULT!

UNCOMMENT THE CODE BELOW TO ACTIVATE THIS FEATURE

This module causes your bot to listen for variations on the word "Quit"
and causes it to immediately quit any ongoing conversation.
*/

module.exports = function(controller) {

    // controller.middleware.receive.use(function(bot, message, next) {
    //
    //     if (message.text && message.text.match(bot.utterances.quit)) {
    //         bot.findConversation(message, function(convo) {
    //             if (convo) {
    //                 // stop the conversation and swallow this message
    //                 convo.stop('quit');
    //                 bot.reply(message,'Quitting.');
    //             } else {
    //                 // nothing ongoing, this message passes through
    //                 next();
    //             }
    //         });
    //     } else {
    //         next();
    //     }
    //
    // });

}
