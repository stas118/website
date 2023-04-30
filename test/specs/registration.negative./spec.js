const email = "hell" + Date.now() + "@yandex.ru"

// Здесь тесты которые проверяют выводы "алертов" на неправильный ввод данных регистрации
describe('Негативные кейсы регистрации', () => {

    // Перед каждым тестом
    beforeEach(async () => {
        browser.url('/registration')
    });

    // После каждого теста
    afterEach(async () => {
        browser.acceptAlert();
    });

    it('Email должен быть валидным', async function () {
        // Проверяем, что поле email не валидно. вводим по со специсимволами
        // Селектор ищет по id="email"
        await $('#email').setValue('Привет@dmail.ru')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email на латинице')
    })

    it('Email должен быть с символом @', async function () {
        // Проверяем, что поле email не валидно. вводим без знака @
        // Селектор ищет по id="email"
        await $('#email').setValue('hellomail.ru')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email')
    })

    it('Email должен быть валидным', async function () {

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email на латинице')
    })

    it('Пароль должен быть не более 10 символов', async function () {
        // Проверяем, что поле password не валидно. Вводим пароль, содержащий более 10 символов.
        // Селектор ищет по id="password"
        await $('#email').setValue('hello@mail.ru')
        await $('#password').setValue('1234567')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Пароль должен содержать не более 10 символов"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Пароль должен содержать не менее 8 символов')
    })

    it('Пароли должны совпадать', async function () {
        // Проверяем, что поле password_confirmation не валидно. Вводим пароли, не совпадающие.
        // Селектор ищет по id="password" и по id="password_confirmation"
        await $('#email').setValue('hello@mail.ru')
        await $('#password').setValue('password')
        await $('#confirm_password').setValue('password1')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Пароли не совпадают"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Пароли не совпадают')
    })
})

describe('Позитивные кейсы регистрации', () => {

    // Перед каждым тестом
    beforeEach(async () => {
        browser.url('/registration')
    });

    //вводим валидные данные в поля 
    it.only('Регистрация успешна', async function () {
        await $('#email').setValue(email)
        await $('#password').setValue('password')
        await $('#confirm_password').setValue('password')
        await $('button[type="submit"]').click()
        // Проверяем, что регистрация прошла успешно и появился текст "Регистрация успешна"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Регистрация успешна')
    })
})

describe('Позитивные кейсы авторизации', () => {

    // Перед каждым тестом
    beforeEach(async () => {
        await browser.url('/login')
    });
    //вводим валидные данные в поля 
    it.only('Авторизация успешна', async function () {
        await $('#email').setValue('hell@omail.ru')
        await $('#password').setValue('password')
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация прошла успешно и появился текст "Авторизация успешна"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Авторизация успешна')
    })
})