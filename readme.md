# Botkit Anywhere

Embed a bot in any web page or app with Botkit for the Web.

Botkit Anywhere is a self-contained chat server, API and messaging client that has been built on top of the industry leading Botkit development stack.

## Get Started

Botkit Anywhere is built to work hand-in-hand with Botkit Studio, a
web-based bot building, content management and analytics platform. To
set up your own bot, sign up for a free developer account and you'll
be guided through the process of configuring and deploying an instance
of this starter kit!

**[![Sign up for Botkit Studio](https://raw.githubusercontent.com/howdyai/botkit/master/docs/studio.png)](https://studio.botkit.ai/signup?code=webreadme)**

## Features

## Dialog Authoring and Content Management

Botkit Studio provides dialog authoring and content management tools that enable
developers, designers, copywriters and other botmakers to build features for bots
without writing any code. The visual authoring environment in Botkit Studio can be used to
create branching conversations, Q&A systems, and transactional conversations.

Conversational content in Botkit Studio can be updated and expanded at any time,
without requiring changes to the bot's code. With help from Botkit's reports
and operational tools, developers can ensure that their bot is provided the
right answers to all the important questions.

Then, with just a bit of code, your bot can access and use information from databases,
APIs and third party services as part of the conversation. The business logic
of your bot stays clean and easy to maintain by separating the form from the functionality.

* [Botkit Studio Knowledge Base](http://botkit.groovehq.com/help_center)
* [Botkit Studio API documentation](https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#why-use-botkit-studio)

## Analytics

Out of the box, Botkit Anywhere works with Botkit Studio's analytics capabilities,
which includes custom metrics, daily, weekly and monthly stats, user retention reports,
a queryable customer database, and full transcripts of every conversation your bot conducts.

### Customizable web-based chat client

Botkit Anywhere includes an easy to customize chat client that can be used as a full-screen web app, built into the structure
of an existing page, or embedded in an entire site with an iframe.

The built-in client uses websocket connections to establish a real time connection
to your Botkit app in order to instantly send and receive messages. It supports bot-friendly
features like quick replies and image attachments. It gracefully handles failed connections
and reconnects.

The chat client is built with HTML, CSS and vanilla Javascript.
Developers can customize the look and feel of the client by modifying the included markup and CSS.
New chat features such as custom cards or actions can be added with just a little bit of code.

* [How to embed a bot in your website](docs/botkit_web_client.md)
* [How to customize the look and feel of your web chat](docs/botkit_web_client.md)
* [How to extend the events and UI of your web chat](docs/botkit_web_client.md)
* [How to specify user profile info to chat](docs/botkit_web_client.md)

### The full power of Botkit, in your app or site

Botkit's SDK powers tens-of-thousands of bots, and supports development of chatbots on
all major messaging platforms. Members of the Botkit developer community have created dozens of useful plugins,
including plugins that add compatibility with top A.I. technologies like IBM Watson, DialogFlow, and RASA.

New code-driven features can be added to this starter kit by creating "skills" which are
Javascript modules containing a set of specialized pattern matchers, handler functions and middlewares.

* [How to build Botkit Skill Modules](docs/how_to_build_skills.md)
* [Full Botkit Documentation](https://github.com/howdyai/botkit/blob/master/docs/readme.md#developing-with-botkit)


How to configure, deploy and host your bot
  * How to specify user profile info to chat
  * How to set up DB for message history etc



## Chat Server and API

Botkit Anywhere's built-in chat server can handle thousands of simultaneous one-on-one conversations with your users.
The chat server provides both a websocket and a webhook based interface for sending and receiving messages.
It is a great solution for including one-on-one chat in a web site or native app.

Additionally, Botkit Anywhere includes APIs for retrieving a user's conversation history,
and account-linking features that enable you to identify existing users to your bot.

* How to set up DB for message history etc


## TOC



How to add additional features to your bot
