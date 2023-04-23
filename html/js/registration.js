function onsubmit(event) {
    // Получаем значение поля email
    var email = document.getElementById('email').value;

    // TODO: Проверить наличие email, и если email нет то вывести ошибку "Введите email"
 
    if (email.trim().length === 0) {

        alert('Введите email');
        event.preventDefault();
        
        return;
    }

    // Проверяем email
    if (email.includes('') === false) {
        // Не email
        alert('Введите email');
        event.preventDefault();
        
        return;
    }

    // TODO: Проверить наличие пароля, и если пароля нет то вывести ошибку "Введите пароль"
    var password = document.getElementById('password').value
    if(password.length === 0) {
         alert('Введите пароль');
         event.preventDefault();
          
           return;
    }
    // TODO: Проверить совпадение паролей, и если пароли не совпадают то вывести ошибку "Пароли не совпадают"
    var password = document.getElementById('password').value
    if(password !== confirm_password) {
         alert('Пароли не совпадают');
         event.preventDefault();
          
           return;
       }
}

function onload() {
    // Документ загружен

    // Получаем элемент формы
    var form = document.getElementById('registration-form');
    form.addEventListener('submit', onsubmit);

}

window.addEventListener('DOMContentLoaded', onload);