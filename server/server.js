const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Incoming request for ${req.url}`);
  
  if (req.url === '/') {
    // if user visits root path, redirect to index.html
    res.writeHead(302, { 'Location': '/index' });
    res.end();


  } else if (req.url.startsWith('/static/')) {
    // if user requests a file in /static directory, return the file
    const filename = path.join(__dirname, '..', req.url);
    const stream = fs.createReadStream(filename);

    stream.on('error', err => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
    });

    stream.pipe(res);


  } else {
    // if user requests an html page, return the html file
    const filename = path.join(__dirname, '../html', `${req.url}.html`);
    const stream = fs.createReadStream(filename);

    stream.on('error', err => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    stream.pipe(res);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
