const net = require('net');

const ENDLINE = '\r\n';
const PW_PROMPT = 'Enter password:';
const PW_SUCCESS = 'Logged in successfully';

class Telnet {
  constructor() {
    this._host = '127.0.0.1';
    this._port = global.serverConfig['ServerConfig']['Tel_Port'];
    this._password = global.serverConfig['ServerConfig']['Tel_Pwd'];
    this._connection = new net.Socket();
    this._buffers = [];

    this._connection.on('data', (data) => this._onData(data));
    this._connection.on('close', () => this._onClose());
    this._connection.on('error', (e) => this._onError(e));
  }

  connect() {
    try {
      this._connection.connect(
        this._port,
        this._host
      );
    } catch (e) {
      console.log(e);
      this._timeoutConnect();
    }
  }

  write(data) {
    return this._connection.write(data + ENDLINE);
  }

  _timeoutConnect() {
    setTimeout(() => this.connect(), 1000);
  }

  _onData(data) {
    this._buffers.push(data);
    if (data.indexOf(ENDLINE) != -1) {
      const buffer = Buffer.concat(this._buffers).toString();
      this._buffers = [];
      const lines = buffer.split(ENDLINE);
      lines.forEach((line) => this._handleLine(line));
    }
  }

  _onClose() {
    console.log('Connection closed');
    this._timeoutConnect();
  }

  _onError(e) {
    console.log('Connection error:', e && e.code);
  }

  _handleLine(line) {
    if (line === PW_PROMPT) {
      this.write(this._password);
    } else if (line === PW_SUCCESS) {
      console.log('Logged in to Empyrion telnet server');
    } else if (line === '') {
    } else {
      console.log(line);
    }
  }
}

module.exports = Telnet;