const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://34.28.233.41:8000/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
