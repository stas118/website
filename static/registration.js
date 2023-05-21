function onsubmit(event) {
    var email = document.getElementById('email').value;

    if (email.trim().length === 0) {
        alert('Введите email');
        event.preventDefault();
        return;
    }

    if (email.length > 30) {
        alert('Email не должен содержать больше 30 символов');
        event.preventDefault();
        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Email должен быть валидным');
        event.preventDefault();
        return;
    }

    var password = document.getElementById('password').value;
    if (password.length === 0) {
        alert('Введите пароль');
        event.preventDefault();
        return;
    }

    if (password.length < 8 || password.length > 30) {
        alert('Пароль должен содержать не менее 8 символов');
        event.preventDefault();
        return;
    }

    var confirm_password = document.getElementById('confirm_password').value;
    if (confirm_password.length === 0) {
        alert('Введите подтверждение пароля');
        event.preventDefault();
        return;
    }

    if (password !== confirm_password) {
        alert('Пароли не совпадают');
        event.preventDefault();
        return;
    }
}

function onload() {
    var form = document.getElementById('registration-form');
    form.addEventListener('submit', onsubmit);
}

window.addEventListener('DOMContentLoaded', onload);
