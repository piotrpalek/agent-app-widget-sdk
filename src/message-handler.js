export function createMessageHandler(callbacks) {
  const invokeMessageCallbacks = (messageName, messageData) => {
    const messageCallbacks = callbacks[messageName];
    if (messageCallbacks) {
      messageCallbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(messageData);
        }
      });
    }
  };

  return function handleMessage(message) {
    if (!message || !message.event_name) {
      return;
    }

    switch (message.event_name) {
      case 'livechat:customer_profile':
        invokeMessageCallbacks('customer_profile', message.event_data);
        break;

      case 'livechat:customer_profile_hidden':
        invokeMessageCallbacks('customer_profile_hidden', message.event_data);
        break;

      case 'livechat:message':
        invokeMessageCallbacks('message', message.event_data);
        break;
    }
  };
}
