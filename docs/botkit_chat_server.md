# Botkit Anywhere Chat Server


## Using Websockets

The best way to connect to your bot is via websockets, which enables real-time two-way delivery of messages. Websocket connections remain open, which allows the bot to send multiple messages in sequence, or take longer than usual to process a request before sending a response.



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
