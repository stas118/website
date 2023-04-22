function onsubmit(event) {
    // Получаем значение поля email
    var email = document.getElementById('email').value;

    // TODO: Проверить наличие email, и если email нет то вывести ошибку "Введите email"

    // Проверяем email
    if (email.includes('@') === false) {
        // Не email
        alert('Введите email');
        event.preventDefault();
        
        return;
    }

    // TODO: Проверить наличие пароля, и если пароля нет то вывести ошибку "Введите пароль"
    // TODO: Проверить совпадение паролей, и если пароли не совпадают то вывести ошибку "Пароли не совпадают"
}

function onload() {
    // Документ загружен

    // Получаем элемент формы
    var form = document.getElementById('registration-form');
    form.addEventListener('submit', onsubmit);

}

window.addEventListener('DOMContentLoaded', onload);