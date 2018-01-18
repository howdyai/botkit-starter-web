# Botkit Anywhere Chat Server

In order for users to talk to your bot, the messages have to be sent to and received from the bot application. In traditional chat environments, the sending and receiving is done by an external chat service - like Slack, Facebook Messenger, or in the good ol' days, an IRC server.

Botkit now includes a built-in chat server, so that messages can be sent and received directly to the bot application without relying on a third-party. The server can be used in two ways: with real-time websocket connections, or with traditional http webhooks.

## Using Websockets

The best way to connect to your bot is using websockets, which enables real-time two-way delivery of messages. Websocket connections remain open, which allows the bot to send multiple messages in sequence, or take longer than usual to process a request before sending a response.

[The bundled web chat client](botkit_web_client.md) is configured to use websockets by default, and handles all of the complexity of managing the connection, including gracefully handling disconnects and reconnects that may occur. See [connection events below](#connection-events).

The websocket server accepts connections at the root URL of your Botkit application. If your application is served over SSL, the url will be `wss://<my_bot_url>`. Otherwise, use the unencrypted url at `ws://<my_bot_url>`


## Using Webhooks

If using websockets does not work for your application, Botkit can also receive messages via webhooks.

When using the webhooks to communicate with Botkit, several limitations apply:

* The bot MUST respond to every incoming request with some sort of reply
* The bot can only send a SINGLE reply to any incoming message
* Your bot cannot spontaneously message the user without first receiving a message (or other event trigger)

Messages can be sent to Botkit by sending a `POST` to `/botkit/receive` with a message object as the body of the request.

```
POST /botkit/receive

{
  "text": "Message Text",
  "user": "unique user id",
  "channel": "webhook"
}
```

The response to this request will be a message object representing the reply from the bot. The reply will be in the same format as the incoming message, with a `text`, `user`, and `channel` field, along with any additional attachments or custom fields sent by the bot.

## Connection events

When first establishing a connection, the client will send a connect event - either a `hello` event, or a `welcome_back` event. These events tell the bot that a user has connected and is ready to chat.

`hello` events occur when a brand new user opens their first chat session.

`welcome_back` events occur when a known user returns to the chat.

In addition, the bot may fire a `reconnect` event. These occur when an ongoing chat is disrupted by a disconnect/reconnect, and may indicate that some messages may not have been delivered.

These events can be [handled with skill modules](how_to_build_skills.md) to do things like send greetings or trigger analytics events.

## Learning Mode

Learning mode is a feature that grants your bot the ability to use Botkit Studio's API to
create new reply scripts interactively through the chat interface. Learning mode is **enabled by default**,
but should be disabled before making your bot availble to the public.

To enable learning mode, add `LEARNING_MODE=true` to the `.env` file.
Also, within the Botkit Studio interface, make sure the script named "create_a_reply" is set as the fallback reply.
This option can be found on your bot's settings tab.

To disable learning mode, comment out the line starting with `LEARNING_MODE` in the `.env` file.
Also, make sure to change the fallback script setting in Botkit Studio to point to a script other than "create_a_reply".
If you forget, your bot will remind you.

## Enable Message History

Botkit Anywhere comes bundled with a message history feature which will capture and track all messages sent during a user's communication with the bot.  This log of messages is available via an API call which is used by the built-in client to display previously sent messages when a user reconnects.

This is particularly useful when the bot is embedded in a site, as each time a user navigates to a new page, the chat widget will have to establish a brand new connection and repopulate the interface.

By default, the message history feature is disabled. To enable it, specify a MongoDB connect string in your applications environment as `MONGO_URI`. Once set, your Botkit will automatically capture and store messages, as well as serve them up to the web chat client.
