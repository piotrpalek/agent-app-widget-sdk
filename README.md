# LiveChat Agent App Widget SDK

Handle communication between LiveChat Agent App and your [Agent App Widget](https://developers.livechatinc.com/docs/agent-app-widgets/).

## Instalation
```
npm install --save @livechat/agent-app-widget-sdk
```

## Usage
Initialization:
```
import LiveChat from '@livechat/agent-app-widget-sdk';

LiveChat.init();
```

Listen for events:
```
import LiveChat from '@livechat/agent-app-widget-sdk';

LiveChat.on("customer_profile", (data) => {
	console.log(data);
});
```

Example output:
```
{
  "id": "S126126161.O136OJPO1",
  "name": "Mary Brown",
  "email": "mary.brown@email.com",
  "chat": {
    "id": "NY0U96PIT4"
  }
}
```
