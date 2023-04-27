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
const usersFile = __dirname + "/../users.json";

// Проверяем что файл есть
if (fs.existsSync(usersFile)) {
  // Если файл есть, то читаем его и получаем JSON просто в виде строки которую сохраняем в data
  const data = fs.readFileSync(usersFile, 'utf-8');

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

  if (!/^[a-zA-Z\.@]+$/.test(email)) {
    console.log("Email is not valid")
    return false;
  }
  if (email.trim().length === 0) {
    console.log("Email is empty")
    return false;
  }
  if (email.includes('@') === false) {     
    console.log("Email is not has @")
    return false;
  }

  if(password.length === 0) {
    console.log("Password is empty")
    return false;
  }
  if (password.length < 8) {
    console.log("Password is not valid")
    return false;
  }

  if(password !== confirm_password) {   
    console.log("Password is not equal confirm_password")   
    return false;
  }

  const user = users.find(function(user) {
    return user.email === email;
  });

  if (user) {
    console.log("User already exists");
    return false;
  }

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

