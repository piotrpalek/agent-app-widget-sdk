import { createConnection } from './connection';
import { createMessageHandler } from './message-handler';
import { getQueryParam } from './helpers';

export function createSdk() {
  const initMessage = 'plugin_inited';
  const callbacks = {};
  let connection;
  let initialized = false;
  let initializer;

  const getConnection = () => {
    if (connection) {
      return Promise.resolve(connection);
    }

    return createConnection(createMessageHandler(callbacks)).then(
      _connection => (connection = _connection)
    );
  };

  return {
    init() {
      if (!initializer) {
        initializer = this._sendMessage(initMessage).then(() => {
          initialized = true;
        });
      }

      return initializer;
    },

    on(method, callback) {
      if (!callbacks[method]) {
        callbacks[method] = [];
      }

      return callbacks[method].push(callback);
    },

    track(eventName = '', eventProperties = {}) {
      if (
        typeof eventName !== 'string' ||
        typeof eventProperties !== 'object'
      ) {
        return false;
      }

      return this._sendMessage('track', {
        event_name: eventName,
        event_properties: eventProperties
      });
    },

    refreshSessionId() {
      return this._sendMessage('plugin_loaded');
    },

    getSessionId() {
      return null;
    },

    putMessage(data) {
      return this._sendMessage('put_message', data);
    },

    watchMessages() {
      return this._sendMessage('watch_messages');
    },

    _sendMessage(message, data = null) {
      if (message !== initMessage && !initialized) {
        throw new Error(
          'Before any operation you must initialize the SDK using the `init` method and wait for it to resolve'
        );
      }

      return getConnection().then(_connection => {
        _connection.send({ message, data });
      });
    }
  };
}
