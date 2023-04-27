const http = require('http');
const fs = require('fs');
const path = require('path');

// Метод вызывается на каждый запрос к серверу
function onRequest(req, res) {
  console.log(`Incoming request for ${req.url}`);
  
  if (req.url.startsWith('/static/')) {
    returnStatic(req, res);

// вызов страницы авторизации

  } else if (req.url ==="/registration") {
    returnHtml("registration", req, res);
// вызов страницы с успешной Регистрацией 
  } else if (req.url == "/login") {
    returnHtml("login", req, res);
  } else if (req.url ==="/register") {
    returnHtml("registration-success", req, res);
  }

  

}

// Возвращает html-страницу и обрабатывать запросы
function returnHtml (name, req, res) {
  // if user requests an html page, return the html file
  
  const filename = __dirname + '/../html/' + name + ".html" ;
  const stream = fs.createReadStream(filename);


  stream.on('error', err => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });
  stream.pipe(res);
}

// Возвращает статический файл
function returnStatic(req, res) {
  // if user requests a file in /static directory, return the file
  const filename = path.join(__dirname, '..', req.url);
  const stream = fs.createReadStream(filename);

  stream.on('error', err => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  });

  stream.pipe(res);
}

const server = http.createServer(onRequest);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




