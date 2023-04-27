const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

/**
 * Работа с файлом в котором хранятся пользователи
 **/

// Массив с пользователями
var users = [];

// Путь до файла в котором хранятся пользователи
const usersFile = __dirname + "/../data/users.json";

// Проверяем что файл есть
if (fs.existsSync(filename)) {
  // Если файл есть, то читаем его и получаем JSON просто в виде строки которую сохраняем в data
  const data = fs.readFileSync(filename, 'utf-8');

  // Преобразуем строку в массив и сохраняем в переменную users
  users = JSON.parse(data);
}

// Функция сохраняет пользователя в массив
function saveUser(email, password) {
  // Добавляем нового пользователя в массив
  users.push({
    email: email,
    password: password
  });

  // Сохраняем массив с пользователями в файл
  fs.writeFileSync(usersFile, JSON.stringify(users));
}

// Функция обработки запроса регистрации юзера
function registerUser(req, res) {
  // Получаем значение полей email, password, confirm_password
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
   // TODO: написать проверки аналогичные как в  registration.js. В случае ошибки данных делать return false
  // Пример проверки наличия email:
  // if (email.trim().length === 0) {
  //   return false;

  if (!/^[a-zA-Z\.@]+$/.test(email)) {
        return false;
    }
    if (email.trim().length === 0) {
        return false;
    }
    if (email.includes('@') === false) {      
        return false;
    }

    var password = document.getElementById('password').value
    if(password.length === 0) {
           return false;
    }
    if (password.length > 10) {
     return false;
    }

    var confirm_password = document.getElementById('confirm_password').value
    if(password !== confirm_password) {      
           return false;
       }
}

 
  // }

  // TODO: в массиве users найти пользователя с таким же email. Если пользователь найден, то return false
  // массив users это массив объектов вида [ { email: "vasya@gmail.com", password: "123123" }, ... ]
  // Для этого нужно использовать метод find. Пример использования:
  // const user = users.find(function(user) { return u.email === email })
  // Если user будет равен undefined, то пользователь не найден, если не undefined, то пользователь найден
  // Если пользователь найден, то return false
    const user = users.find(function(user) {
    return u.email === email;
  });

  if (user) {
    return false;
  }

  return true;
  // Сохраняем пользователя
  saveUser(email, password);
  
  // Возвращаем успешное завершение регистрации
  return true;
}




/**
 * Обработка запросов
 * Метод вызывается на каждый запрос к серверу
 */
function onRequest(req, res) {
  console.log(`Incoming request for ${req.url}`);
  
  if (req.url.startsWith('/static/')) {
    returnStatic(req, res);

  // вызов страницы авторизации
  } else if (req.url ==="/registration") {
    returnHtml("registration", req, res);
  
  // вызов страницы с успешной Регистрацией 
  } else if (req.url === "/login") {
    returnHtml("login", req, res);

  // путь на котором обрабатывается запрос регистрации
  } else if (req.url ==="/register") {
    const result = registerUser(req, res);
      // TODO: Проверить если result === false, то вывести страницу с ошибкой регистрации
    // А если нет, то вывести страницу с успешной регистрацией
    // Сейчас выводится всегда успешная
     // Если регистрация не удалась, выводим страницу с ошибкой
    if (!result) {
      returnHtml("registration-error", req, res);
    } else {
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

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(onRequest)

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




