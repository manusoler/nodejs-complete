module.exports = routeHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hi there!</h1>');
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="user" /><button type="submit">Go!</button></form>'
    );
    res.end();
  } else if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<ul><li>Manu</li><li>Rocio</li><li>Jose</li></ul>');
    res.end();
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const params = Buffer.concat(body).toString();
      console.log(params.split('=')[1]);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  }
};
