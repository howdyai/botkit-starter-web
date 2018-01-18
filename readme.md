# Botkit Anywhere

Embed a bot in any web page or app with Botkit for the Web.

Botkit Anywhere is a self-contained chat server, API and web-based messaging client that has been built on top of the industry leading Botkit development stack.

## Get Started

Botkit Anywhere is built to work hand-in-hand with Botkit Studio, a
web-based bot building, content management and analytics platform. To
set up your own bot, sign up for a free developer account and you'll
be guided through the process of configuring and deploying an instance
of this starter kit!

Adding new content and replies to your new bot is as easy as chatting with it using the built in chat client! You'll be a bot master in no time.

**[![Sign up for Botkit Studio](https://raw.githubusercontent.com/howdyai/botkit/master/docs/studio.png)](https://studio.botkit.ai/signup?code=webreadme)**

Alternately, you can deploy this starter kit project directly to Glitch, or clone it to your own development environment, then add a Botkit Studio access token at a later point.

* [Remix on Glitch](https://glitch.com/~botkit-web)

## Add Features with Botkit Studio

Bots can be thought of as a series of pre-defined conversations, navigated by users who exchange messages with the bot application. The bot is responsible for replying with the appropriate message, and taking whatever automated actions are necessary to satisfy the user.

Each "feature" of your bot will consist of one or more conversations, along with some code to power the related actions.

Botkit Studio enables developers, designers, copywriters and other botmakers to build features for bots
without writing any code by providing dialog authoring and content management tools. The visual authoring environment in Botkit Studio can be used to create branching conversations, Q&A systems, complex transactions, or any other type of conversational content.

Conversational content in Botkit Studio can be updated and expanded at any time,
without requiring changes to the bot's code. With help from Botkit's reports
and operational tools, developers can ensure that their bot is provided the
right answers to all the important questions.

Then, with just a bit of code, your bot can access and use information from databases,
APIs and third party services as part of the conversation. The business logic
of your bot stays clean and easy to maintain by separating the form from the functionality. Botkit Studio will even generate this boilerplate code for you!

* [Botkit Studio Knowledge Base](http://botkit.groovehq.com/help_center)
* [Botkit Studio API documentation](https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#why-use-botkit-studio)

## The full power of Botkit, in your app or site

Botkit's SDK powers tens-of-thousands of bots, and supports development of chatbots on
all major messaging platforms. Members of the Botkit developer community have created dozens of useful plugins,
including plugins that add compatibility with top A.I. technologies like IBM Watson, DialogFlow, and RASA.

New code-driven features can be added to this starter kit by creating "skills" which are
Javascript modules containing a set of specialized pattern matchers, handler functions and middlewares.

* **[How to build Botkit Skill Modules](docs/how_to_build_skills.md)**
* [Full Botkit Documentation](https://github.com/howdyai/botkit/blob/master/docs/readme.md#developing-with-botkit)


## Analytics

Out of the box, Botkit Anywhere works with Botkit Studio's analytics capabilities,
which includes custom metrics, daily, weekly and monthly stats, user retention reports,
a queryable customer database, and full transcripts of every conversation your bot conducts.

* [How to share user account/profile info with Botkit](docs/botkit_web_client.md#share-user-accounts--profile-data-with-botkit)
* [Botkit Studio Metrics Knowledge Base](http://botkit.groovehq.com/knowledge_base/categories/metrics-7)

## Customizable web-based chat client

Botkit Anywhere includes an easy to customize chat client that can be used as a full-screen web app, built into the structure
of an existing page, or embedded in an entire site with an iframe.

The built-in client uses websocket connections to establish a real time connection
to your Botkit app in order to instantly send and receive messages. It supports bot-friendly
features like quick replies and image attachments. It gracefully handles failed connections
and reconnects.

The chat client is built with HTML, CSS and vanilla Javascript.
Developers can customize the look and feel of the client by modifying the included markup and CSS.
New chat features such as custom cards or actions can be added with just a little bit of code.

* **[Web Chat Client Overview](docs/botkit_web_client.md)**
* [How to embed a bot in your website](docs/botkit_web_client.md#embed-botkit-in-a-website-with-iframes)
* [How to customize the look and feel of your web chat](docs/botkit_web_client.md#customize-the-look-and-feel-of-the-chat-interface)
* [How to extend the UI of your web chat with custom fields](docs/botkit_web_client.md#using-botkit-studio-custom-fields-to-add-custom-features)
* [How to share user account/profile info with Botkit](docs/botkit_web_client.md#share-user-accounts--profile-data-with-botkit)

## Chat Server and API

Botkit Anywhere's built-in chat server can handle thousands of simultaneous one-on-one conversations with your users.
The chat server provides both a websocket and a webhook based interface for sending and receiving messages.
It is a great solution for including one-on-one chat in a web site or native app.

Additionally, Botkit Anywhere includes APIs for retrieving a user's conversation history,
and account-linking features that enable you to identify existing users to your bot.

* **[Chat Server Overview](docs/botkit_chat_server.md)**
* [Communicating with Websockets](docs/botkit_chat_server.md#using-websockets)
* [Communicating with Webhooks](docs/botkit_chat_server.md#using-webhooks)
* [How to enable message history API](docs/botkit_chat_server.md#enable-message-history)
* [Enable or Disable Learning Mode](docs/botkit_chat_server.md#learning-mode)

# Developer & Support Community

You can find full documentation for Botkit on our [GitHub page](https://github.com/howdyai/botkit/blob/master/readme.md). Botkit Studio users can access the [Botkit Studio Knowledge Base](https://botkit.groovehq.com/help_center) for help in managing their account.

###  Need more help?
* Glitch allows users to ask the community for help directly from the editor! For more information on raising your hand, [read this blog post.](https://medium.com/glitch/just-raise-your-hand-how-glitch-helps-aa6564cb1685)

* Join our thriving community of Botkit developers and bot enthusiasts at large. Over 4500 members strong, [our open Slack group](http://community.botkit.ai) is _the place_ for people interested in the art and science of making bots.

 Come to ask questions, share your progress, and commune with your peers!

* We also host a [regular meetup and annual conference called TALKABOT.](http://talkabot.ai) Come meet and learn from other bot developers!

 [Full video of our 2016 event is available on Youtube.](https://www.youtube.com/playlist?list=PLD3JNfKLDs7WsEHSal2cfwG0Fex7A6aok)

# About Botkit

Botkit is a product of [Howdy](https://howdy.ai) and made in Austin, TX with the help of a worldwide community of botheads.
