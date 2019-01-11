# How to build custom skill modules for Botkit

Botkit bots can do a lot right out of the box, without having to write any code.
But to do the type of jobs bots do - like read and write databases, use APIs,
and interact with files - some code is necessary.

When you want to add features like this to a Botkit application,
the right place to do that is in a skill module.
Skill modules are Javascript files that live in the projects `skills/` folder,
and get automatically loaded into the application when it boots.

Skill modules can contain any type of code, but most of the time will consist
of one or more Botkit event handers, middlewares, or related features. [Refer to the main Botkit READMEs for full documentation.](https://botkit.ai/docs/core.html)

Sample code for a simple skill module is below. To enable this module, copy this code into a file in this project called `skills/example.js` and restart your bot.

```js
module.exports = function(controller) {

    // My custom skill module!
    // controller is a Botkit application instance
    // I can add handlers and specify middlewares here!

    // respond to the `hello` event, fired when a web chat begins with a new user
    controller.on('hello', function(bot, message) {

        bot.reply(message,'Welcome, new human!');

    });

    // listen for the word "help"
    controller.hears('help',  'message_received', function(bot, message) {

        bot.reply(message,'Need help? I am here!');

    });

    // add a middleware to log messages sent to the console
    controller.middleware.send.use(function(bot, message, next) {
        console.log('Sending: ', message);
        next();
    });

}
```

## Botkit CMS Skills

Conversations powered by Botkit CMS's content management APIs have additional middleware endpoints and events that can be used to extend and alter the functionality of the pre-scripted conversations.

* [Learn more about Botkit CMS script events](https://botkit.ai/docs/readme-studio.html#controllerstudiobefore)

A skill module built to work with a Botkit CMS script called "onboarding" might look something like this. Note that rather than directly using Botkit's `hears` and `on` handlers, this module uses Botkit CMS's more sophisticated conversation events that provide a cleaner separation of content and functionality.

```js
module.exports = function(controller) {

    // this function will before BEFORE the onboarding script runs
    controller.studio.before('onboarding', function(convo, next) {

        console.log('STARTING ONBOARDING PROCESS FOR ', convo.context.user);

        next();

    });

    // this function will fire AFTER the onboarding script runs
    controller.studio.after('onboarding', function(convo, next) {

        console.log('COMPLETED ONBOARDING FOR ', convo.context.user);

    });

    // this function will fire whenever a user tells the bot what username they desire
    controller.studio.validate('onboarding','username', function(convo, next) {

        var username = convo.extractResponse('username');

        // make sure user's requested username field is less than 8 chars
        if (username.length > 8) {
            convo.gotoThread('username_length');
        } else {
            next();
        }

    });
}
```
