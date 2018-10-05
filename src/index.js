const config = {};
let sessionId = null;
let pluginId = null;

// callbacks
const callbacks = {};

const setPluginId = function() {
  if (!pluginId) {
    pluginId = getUrlParam('plugin_id');
  }
  return pluginId;
};

// sending postMessage messages
const sendMessage = function(message) {
  const e = message;
  e.plugin_id = setPluginId();
  return parent.postMessage(e, config.targetOrigin || '*');
};

const messagesListener = e => {
  if (
    [
      'http://my.lc:3000',
      'https://my.labs.livechatinc.com',
      'https://my.staging.livechatinc.com',
      'https://my.livechatinc.com'
    ].indexOf(e.origin) === -1
  ) {
    console.log('incorrect origin');
    return false;
  }

  switch (e.data.event_name) {
    case 'livechat:customer_profile':
      if (!callbacks['customer_profile']) {
        return false;
      }

      return (() => {
        const result = [];
        for (let callback of callbacks['customer_profile']) {
          result.push(callback(e.data.event_data));
        }
        return result;
      })();

    case 'livechat:customer_profile_hidden':
      if (!callbacks['customer_profile_hidden']) {
        return false;
      }

      return (() => {
        const result1 = [];
        for (let callback of callbacks['customer_profile_hidden']) {
          result1.push(callback(e.data.event_data));
        }
        return result1;
      })();

    case 'livechat:messages':
      if (!callbacks['messages']) {
        return false;
      }

      return (() => {
        const result1 = [];
        for (let callback of callbacks['messages']) {
          result1.push(callback(e.data.event_data));
        }
        return result1;
      })();
  }
};
// receiving postMessage messages

const getUrlParam = name => {
  const results = new RegExp(`[\?&]${name}=([^&#]*)`).exec(
    window.location.href
  );
  if (results) {
    return results[1] || 0;
  } else {
    return null;
  }
};

export default {
  init() {
    sendMessage({ message: 'plugin_inited' });
    window.addEventListener('message', messagesListener);
  },

  on(method, callback) {
    if (!callbacks[method]) {
      callbacks[method] = [];
    }

    return callbacks[method].push(callback);
  },

  track(eventName = '', eventProperties = {}) {
    if (typeof eventName !== 'string' || typeof eventProperties !== 'object') {
      return false;
    }

    return sendMessage({
      message: 'track',
      data: {
        event_name: eventName,
        event_properties: eventProperties
      }
    });
  },

  refreshSessionId() {
    return sendMessage({ message: 'plugin_loaded' });
  },

  getSessionId() {
    return sessionId;
  },

  putMessage(message) {
    return sendMessage({ message: 'put_message', data: message });
  },

  getMessages() {
    return sendMessage({ message: 'get_messages' });
  }
};
