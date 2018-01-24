/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function(controller) {


  if (!process.env.studio_token) {

    function conductOnboarding(bot, message) {

      bot.startConversation(message, function(err, convo) {

        convo.say('Hello! I am a brand new Botkit bot!');
        convo.say({
          text: 'I am _almost_ ready to work! Before I am fully operational, I need an API token from [Botkit Studio](https://studio.botkit.ai) to enable my cloud features.',
          quick_replies: [
            {
              title: 'Help me get a token',
              payload: 'help me get a token',
            },
            {
              title: 'I already have a token',
              payload: 'i have a token',
            }
          ]
        });

      });


    }

    function unhandledMessage(bot, message) {
      bot.startConversation(message, function(err, convo) {

        convo.say('I do not know how to respond to that message yet.');
        convo.say('With my learning mode enabled, you can teach me new responses just by chatting.');
        convo.say({

          text: 'To enable learning mode, I need a Botkit Studio API token.',
          quick_replies: [
            {
              title: 'How do I get a token',
              payload: 'how do i get a token',
            },
            {
              title: 'Help me!',
              payload: 'help',
            }
          ]
        });

      });

    }

    controller.hears('get a token','message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {

          convo.say('To get an API token from Botkit Studio, [sign up for a free account](https://studio.botkit.ai/) and create a bot profile for me.');

          convo.say('Once a profile has been created, an API token will be displayed on the dashboard. Copy it into your clipboard!');

          convo.say({
            text: 'Let me know when you have a token...',
            quick_replies: [
              {
                title: 'I have a token',
                payload: 'i have a token',
              },
              {
                title: 'Help me!',
                payload: 'help'
              }
            ]
          });
      });

    });


    controller.hears('have a token','message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {
        convo.say('The next step is to add your token to my `.env` file. This file lives in the root folder of my project, and contains settings used by my code.');

        if (process.env.PROJECT_DOMAIN) {
          var edit_url = 'https://glitch.com/edit/#!/' + process.env.PROJECT_DOMAIN + '?path=.env:1:0';
          convo.say('It looks like I am being hosted on Glitch - that means [you can edit this file right here](' + edit_url + ')!');
        }

        convo.say('Add a line that says: `studio_token=MY_TOKEN_HERE`');

        convo.say({
          text: 'After that, restart me and we can continue!',
          quick_replies: [
            {
              title: 'Actually, I need to get a token',
              payload: 'actually, i need to get a token',
            },
            {
              title: 'Help me!',
              payload: 'help me'
            }
          ]});

      });

    });


    controller.hears(['help','contact','documentation','docs','community'], 'message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {

        // set up a menu thread which other threads can point at.
        convo.ask({
          text: 'I can point you to resources, and connect you with experts who can help.',
          quick_replies: [
            {
              title: 'Read the Docs',
              payload: 'documentation',
            },
            {
              title: 'Join the Community',
              payload: 'community',
            },
            {
              title: 'Expert Help',
              payload: 'contact us',
            },
          ]
        },[
          {
            pattern: 'documentation',
            callback: function(res, convo) {
              convo.gotoThread('docs');
              convo.next();
            }
          },
          {
            pattern: 'community',
            callback: function(res, convo) {
              convo.gotoThread('community');
              convo.next();
            }
          },
          {
            pattern: 'contact',
            callback: function(res, convo) {
              convo.gotoThread('contact');
              convo.next();
            }
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.say('Without a Botkit Studio token, my help is limited to a few specific topics.');
              convo.next();
            }
          }
        ]);

        // set up docs threads
        convo.addMessage({
          text: 'Botkit is extensively documented! Here are some useful links:\n\n[Botkit Studio Help Desk](https://botkit.groovehq.com/help_center)\n\n[Botkit Anywhere README](https://github.com/howdyai/botkit-starter-web/blob/master/readme.md#botkit-anywhere)\n\n[Botkit Developer Guide](https://github.com/howdyai/botkit/blob/master/readme.md#build-your-bot)',
        },'docs');

        convo.addMessage({
          action: 'default'
        }, 'docs');


        // set up community thread
        convo.addMessage({
          text: 'Our developer community has thousands of members, and there are always friendly people available to answer questions about building bots!',
        },'community');

        convo.addMessage({
          text: '[Join our community Slack channel](https://community.botkit.ai) to chat live with the Botkit team, representatives from major messaging platforms, and other developers just like you!',
        },'community');

        convo.addMessage({
          text: '[Checkout the Github Issue Queue](https://github.com/howdyai/botkit/issues) to find frequently asked questions, bug reports and more.',
        },'community');

        convo.addMessage({
          action: 'default'
        }, 'community');



        // set up contact thread
        convo.addMessage({
          text: 'The team who built me can help you build the perfect robotic assistant! They can answer all of your questions, and work with you to develop custom applications and integrations.\n\n[Use this form to get in touch](https://botkit.ai/contact.html), or email us directly at [help@botkit.ai](mailto:help@botkit.ai), and a real human will get in touch!',
        },'contact');
        convo.addMessage({
          action: 'default'
        }, 'contact');

      });

    });

    controller.on('hello', conductOnboarding);
    controller.on('welcome_back', conductOnboarding);
    controller.on('message_received', unhandledMessage);

  }


}
