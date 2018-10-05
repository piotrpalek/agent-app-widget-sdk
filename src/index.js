import { getUrlParam } from './utils/url';

class WidgetSDK {
  constructor() {
    this.callbacks = {};
    this.pluginId = null;
    this.postMessageOriginsWhitelist = [
      'http://localhost:3000',
      'http://my.lc:3000',
      'https://my.labs.livechatinc.com',
      'https://my.staging.livechatinc.com',
      'https://my.livechatinc.com'
    ];

    window.addEventListener('message', this.receiveMessage.bind(this));
  }

  getPluginId() {
    if (!this.pluginId) {
      this.pluginId = getUrlParam('plugin_id');
    }
    this.pluginId;
  };

  addCallback(method, callback) {
    if (!this.callbacks[method]) {
      this.callbacks[method] = [];
    }
    this.callbacks[method].push(callback);
  }

  sendMessage(message) {
    const e = message;
    e.plugin_id = this.getPluginId();
    window.parent.postMessage(e, '*');
  };

  receiveMessage(e) {
    if (this.postMessageOriginsWhitelist.indexOf(e.origin) === -1) {
      console.log('incorrect origin');
      return false;
    }

    switch (e.data.event_name) {
      case 'livechat:customer_profile':
        if (!this.callbacks['customer_profile']) {
          return false;
        }
        this.callbacks['customer_profile'].forEach(callback => {
          callback(e.data.event_data);
        });
        break;

      case 'livechat:customer_profile_hidden':
        if (!this.callbacks['customer_profile_hidden']) {
          return false;
        }
        this.callbacks['customer_profile_hidden'].forEach(callback => {
          callback(e.data.event_data);
        });
        break;
    }
  }
};

const SDK = new WidgetSDK();

export default {
  init() {
    SDK.sendMessage({
      message: 'plugin_inited'
    });
  },

  on(method, callback) {
    SDK.addCallback(method, callback);
  },

  track(eventName = '', eventProperties = {}) {
    if (typeof eventName !== 'string' || typeof eventProperties !== 'object') {
      return false;
    }

    SDK.sendMessage({
      message: 'track',
      data: {
        event_name: eventName,
        event_properties: eventProperties
      }
    });
  },

  putMessage(message) {
    SDK.sendMessage({
      message: 'put_message',
      data: message
    });
  }
};
