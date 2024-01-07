const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
const FileBasedCache = require('./task1');
const logger = require('./logger');

dotenv.config();

const proxyConfig = {
  host: process.env.PROXY_HOST || 'api.publicapis.org',
  port: process.env.PROXY_PORT || 443,
  protocol: process.env.PROXY_PROTOCAL || 'https',
};

const PORT = process.env.SERVER_PORT || 3000;

const httpServer = http.createServer((req, res) => {

  const cache = new FileBasedCache();

  if (req.method === 'GET') {
    const cachedData = cache.get(req.url);

    if (cachedData !== null) {
      logger.info("Read from cache");
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(cachedData);
      return;
    }
  }

  logger.info(req.headers)

  const targetProtocol = proxyConfig.protocol === 'https' ? https : http;
  const targetRequest = targetProtocol.request({
    host: proxyConfig.host,
    port: proxyConfig.port,
    path: req.url,
    method: req.method
  }, (targetResponse) => {
    let response = '';

    targetResponse.on('data', (chunk) => response += chunk);

    targetResponse.on('end', () => {
      if (req.method === 'GET') {
        cache.set(req.url, response, 60);
      }

      res.writeHead(targetResponse.statusCode, targetResponse.headers);
      res.end(response);
    });
  });

  targetRequest.on('error', (error) => {
    console.log(error);
    logger.error(error.message);
    res.writeHead(500);
    res.end('Internal Server Error');
  });

  req.on('data', (chunk) => targetRequest.write(chunk));
  req.on('end', () => targetRequest.end());
});

httpServer.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
