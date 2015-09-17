import WebSocket from 'ws';

export default class GamesService {
  constructor(appConfig, $log) {
    this.appConfig = appConfig;
    this.$log = $log;
  }

  subscribe(messageCallback) {
    return new Promise((resolve, reject) => {
      // Open the socket
      var ws = new WebSocket(this.appConfig.apiWsUrl + 'games');

      ws.onopen = () => {
        this.$log.debug('Games socket opened');
        resolve();
      };

      ws.onerror = () => {
        this.$log.error('Can not open the games socket');
        reject('Games inaccessible');
      };

      ws.onmessage = (event) => {
        var msg = JSON.parse(event.data);
        messageCallback.call(null, msg);
      };
    });
  }
}
