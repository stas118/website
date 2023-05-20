function onsubmit(event) {
    // Получаем значение поля email
    var email = document.getElementById('email').value;
   

    // TODO: Проверить наличие email, и если email нет то вывести ошибку "Введите email"
 
    if (email.trim().length === 0) {

        alert('Введите email');
        event.preventDefault();
        
        return;
    } 

        // Проверяем длину поля ввода email
    if (email.length > 30) {
        alert('Email не должен содержать больше 30 символов');
        event.preventDefault();
        return;
    }

    // Проверяем, содержит ли email только латинские буквы
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Email должен быть валидным');
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

    // Поле не должно содержать менее 8 и не более 30 символов
   
    if (password.length < 8 || password.length > 30) {
    alert('Пароль должен содержать от 8 до 30 символов');
    event.preventDefault();

        return;
    }
    
    if (confirm_password.length < 8 || confirm_password.length > 30) {
    alert('Подтверждение пароля должно содержать от 8 до 30 символов');
    event.preventDefault();
    return;

    // TODO: Проверить совпадение паролей, и если пароли не совпадают то вывести ошибку "Пароли не совпадают"
    var confirm_password = document.getElementById('confirm_password').value
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