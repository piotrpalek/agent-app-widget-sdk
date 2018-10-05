# LiveChat AgentApp Widget SDK

## Instalation

```
npm install --save @livechat/agent-app-widget-sdk
```

## Usage

Initialization

```js
import LiveChat from "@livechat/agent-app-widget-sdk";

LiveChat.init();
```

Listen for events

```js
import LiveChat from "@livechat/agent-app-widget-sdk";

LiveChat.on("customer_profile", data => {
  console.log(data);
});
```

Example output

```json
{
  "id": "S126126161.O136OJPO1",
  "name": "Mary Brown",
  "email": "mary.brown@email.com",
  "chat": {
    "id": "NY0U96PIT4"
  }
}
```

## Get messages

You can easily get all messages from currently active chat. This method will return all customer messages sent from last agent reply.

Example usage:

```js
import LiveChat from "@livechat/agent-app-widget-sdk";

LiveChat.init();

const timer = setInterval(LiveChat.getMessages, 1800);

LiveChat.on("messages", receivedMessagesHandler);

const receivedMessagesHandler = data => {
  console.log(data.messages);
  console.log(data.chat);
};

setTimeout(() => clearInterval(timer), 15000);
```
