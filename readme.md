# THIS IS EXPERIMENTAL SOFTWARE

This is an experimental and in-development version of Botkit. Both this starter kit and the related functionality in Botkit are currently incomplete.

However, it works! And we welcome your input.

See [this Github Issue](https://github.com/howdyai/botkit/issues/871) to track progress on this project.

[View sample app](https://botkit-web.glitch.me/)

# Botkit Starter Kit for Web Bots

This repo contains everything you need to get started building a bot with Botkit and Botkit Studio!

[Botkit Studio](https://studio.botkit.ai/signup?code=webstarter) is a set of tools that adds capabilities
to the open source Botkit library by offering hosted GUI interfaces for script
management and action trigger definition. Botkit Studio is built by the company
that created and maintains the open source Botkit library, [Howdy.](https://howdy.ai)

### Instant Start

[Remix this project on Glitch](https://glitch.com/edit/#!/import/github/howdyai/botkit-starter-web)

[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/howdyai/botkit-starter-web/master)

### Get Started

Clone this repository:

`git clone https://github.com/howdyai/botkit-starter-web.git`

Install dependencies, including [Botkit](https://github.com/howdyai/botkit):

```
cd botkit-starter-web
npm install
```

Get a Botkit Studio token [from your Botkit developer account](https://studio.botkit.ai/)

Update the `.env` file with your newly acquired token. Also, set the `PORT` to 3000, or your port of choice.

Launch your bot application by typing:

`node .`

Now, visit your new bot's login page: http://localhost:3000

You should see a chat window! Your bot should leap to attention and start talking! YOU MAY HAVE JUST CREATED SKYNET.

Continue your journey to becoming a champion botmaster by [reading the Botkit Studio SDK documentation here.](https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md)

### Extend This Bot

This repo is designed to provide developers a robust starting point for building a custom bot. Included in the code are a set of sample bot "skills" that illustrate various aspects of the Botkit SDK features.  Once you are familiar with how Botkit works, you may safely delete all of the files in the `skills/` subfolder.

Developers will build custom features as modules that live in the `skills/` folder. The main bot application will automatically include any files placed there.

A skill module should be in the format:

```
module.exports = function(controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

}
```

### Customize Storage

By default, the starter kit uses a simple file-system based storage mechanism to
record information about the teams and users that interact with the bot. While
this is fine for development, or use by a single team, most developers will want
to customize the code to use a real database system.

There are [Botkit plugins for all the major database systems](https://github.com/howdyai/botkit/blob/master/docs/readme-middlewares.md#storage-modules) which can be enabled with just a few lines of code.
