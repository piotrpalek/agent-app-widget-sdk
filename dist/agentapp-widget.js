(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.AgentAppWidgetSDK = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var index = (function () {
  var config = {};
  var sessionId = null;
  var pluginId = null;

  // callbacks
  var callbacks = {};

  var utils = {
    getUrlParam: function getUrlParam(name) {
      var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results) {
        return results[1] || 0;
      } else {
        return null;
      }
    }
  };

  var setPluginId = function setPluginId() {
    if (!pluginId) {
      pluginId = utils.getUrlParam('plugin_id');
    }
    return pluginId;
  };

  // sending postMessage messages
  var sendMessage = function sendMessage(message) {
    var e = message;
    e.plugin_id = setPluginId();
    return parent.postMessage(e, config.targetOrigin || '*');
  };

  // receiving postMessage messages
  window.addEventListener('message', function (e) {
    if (!['http://my.lc:3000', 'https://my.labs.livechatinc.com', 'https://my.staging.livechatinc.com', 'https://my.livechatinc.com'].includes(e.origin)) {
      console.log('incorrect origin');
      return false;
    }

    switch (e.data.event_name) {
      case 'livechat:customer_profile':
        if (!callbacks['customer_profile']) {
          return false;
        }

        return function () {
          var result = [];
          for (var _iterator = callbacks['customer_profile'], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var callback = _ref;

            result.push(callback(e.data.event_data));
          }
          return result;
        }();

      case 'livechat:customer_profile_hidden':
        if (!callbacks['customer_profile_hidden']) {
          return false;
        }

        return function () {
          var result1 = [];
          for (var _iterator2 = callbacks['customer_profile_hidden'], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var callback = _ref2;

            result1.push(callback(e.data.event_data));
          }
          return result1;
        }();
    }
  });

  return {
    init: function init() {
      sendMessage({ message: 'plugin_inited' });
    },
    on: function on(method, callback) {
      if (!callbacks[method]) {
        callbacks[method] = [];
      }

      return callbacks[method].push(callback);
    },
    track: function track() {
      var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var eventProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof eventName !== 'string' || (typeof eventProperties === 'undefined' ? 'undefined' : _typeof(eventProperties)) !== 'object') {
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
    refreshSessionId: function refreshSessionId() {
      return sendMessage({ message: 'plugin_loaded' });
    },
    getSessionId: function getSessionId() {
      return sessionId;
    },
    putMessage: function putMessage(message) {
      return sendMessage({ message: 'put_message', data: message });
    }
  };
})();

exports.default = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
