const http = require('http');
const fs = require('fs');

function rqListener(req, res) {}

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/' && method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Enter</button></form></body></html>'
    );
    res.end();
  } else if (url === '/message' && method === 'POST') {
    const body = [];

    // Add event when receiving data, add it to the body buffer
    req.on('data', chunk => {
      body.push(chunk);
    });

    // Add event when all data is process, concat the body buffer to a buffer, and read it
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const msg = parsedBody.split('=')[1];
      fs.writeFile('message.txt', msg, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  }
});

server.listen(3000);
