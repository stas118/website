const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const ejs = require('ejs');

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

// TODO: В случае ошибки не отправлять false а отправлять текст ошибки
// Функция обработки запроса регистрации юзера
function registerUser(req, res) {
  // Получаем значение полей email, password, confirm_password
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
 
  if (email.trim().length === 0) {
    console.log("Email is empty")
    return "Email не введен";

  // Проверяет наличие @
  if (email.includes('@') === false) {     
    console.log("Email is not has @")
     return "email без знака @";
  }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    console.log("Email is not valid")
    return "Пароль не валидный";
  }

  if(password.length === 0) {
    console.log("Password is empty")
    return "Пароль не введен";
  }
  if (password.length < 8) {
    console.log("Password is not valid")
    return "Пароли меньше 8 символов";
  }

  if(password !== confirm_password) {   
    console.log("Password is not equal confirm_password")   
     return "Пароли не совпадают";
  }

  const user = users.find(function(user) {
    return user.email === email;
  });

  // TODO написать тесткейс в автоматизированом тестировании который проверяет этот кейс с существующим пользователем
  if (user) {
    console.log("User already exists")

    // Возвращаем ошибку текстов. Если результат текстовый значит это ошибка
    return "Такой пользователь уже существует";
  }

  // Сохраняем пользователя
  saveUser(email, password);
  
  // Возвращаем успешное завершение регистрации
  return true;
}

function authUser(req, res) {
  // Получаем значение полей email, password
  var email = req.body.email;
  var password = req.body.password;

  /// ищем нового пользователя c таким же email   
  const user = users.find(function(user) {
    return user.email === email;
  });
    // Если пользователь не найден или пароль не совпадает, возвращаем false
  if (!user || user.password !== password) {
    console.log("Invalid email or password");
    return false;
  }
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

    if (typeof(result) === "string") {
      res.status(400);
      // Вместо returnHtml вызываем функцию которая возвращает страницу ШАБЛОНА с ошибкой
      res.render("registration-error", { result: result });
    } else {
      // А здесь мы возвращаем уже готовую страницу. Потому что регистрация успешна и у нас уже есть готовая html
      returnHtml("registration-success", req, res);
    }
  } else if (req.url === '/auth') {
    const result = authUser(req, res);

    if (!result) {
      res.status(400);
      returnHtml('auth-error', req, res);
    } else {
      returnHtml('auth-success', req, res);
    }
  }
}

function authUser(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    console.log('User not found');
    return false;
  }

  // Успешная авторизация
  return true;
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

  res.type('html');
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

// Устанавливаем папку для файлов шаблонов
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '..', 'ejs'));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(onRequest)

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

