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
        //УЗ-01
    it('Email должен быть валидным', async function() {
        // Проверяем, что поле email не валидно. вводим по со специсимволами
        // Селектор ищет по id="email"
        await $('#email').setValue('Привет@dmail.ru')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Email должен быть валидным')
    })
        //УЗ-02
    it('Email должен быть с символом @', async function() {
        // Проверяем, что поле email не валидно. вводим без знака @
        // Селектор ищет по id="email"
        await $('#email').setValue('hellomail.ru')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Email должен быть валидным');
    })
        //УЗ-03
    it('Email должен быть валидным', async function() {
       
        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email')
    })
         //УЗ-04   
    it('Пароль должен содержать не менее 8 символов', async function() {
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
         //УЗ-05
    it('Пароли должны совпадать', async function() {
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
         //УЗ-06
    it('Ввод только email и confirm_password', async function() {
    // Проверяем, что поле password_confirmation не валидно. Вводим пароли, не совпадающие.
    // Селектор ищет по id="password" и по id="password_confirmation"
        await $('#email').setValue('hello@mail.ru')
        await $('#confirm_password').setValue('password')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()
        // Проверяем, что появился алерт с текстом "Пароли не совпадают"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите пароль')
    })
        //УЗ-07
    it('Ввод только password и confirm_password', async function() {
    // Селектор ищет по id="password" и по id="password_confirmation"
        await $('#password').setValue('password')
        await $('#confirm_password').setValue('password')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()
        // Проверяем, что появился алерт с текстом "Введите email"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email')
    })      
     //УЗ-08
    it('Ввод email без домена', async function() {
    //  Вводим пароли password и confirm_password совпадающие.
    // Селектор ищет по id="password" и по id="password_confirmation"
        await $('#email').setValue('hello@mail')    
        await $('#password').setValue('password')
        await $('#confirm_password').setValue('password')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()
        // Проверяем, что появился алерт с текстом "Введите email"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Email должен быть валидным')
    })      
});
    //УЗ-09
describe('повторная регистрация:', () => {
    var email;

    async function registerUser() {
        email = "hello" + Date.now() + "@mail.ru";
        browser.url('/registration')
        await $('#email').setValue(email)
        await $('#password').setValue('password')
        await $('#confirm_password').setValue('password')
        await $('button[type="submit"]').click()
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Регистрация успешна')
    }

    // Перед каждым тестом
    beforeEach(async () => {
        await registerUser();
        await browser.url('/registration')
    });

    //повторная регистрация  с зарегистрированным пользователем
    // TODO: регистрации использовать email, который был зарегистрирован в beforeEach
    it('Такой пользователь уже существует', async function() {
        await $('#email').setValue(email)
        await $('#password').setValue('password')
        await $('#confirm_password').setValue('password')
        await $('button[type="submit"]').click()
        // Проверяем что появился текст "Такой пользователь уже существует"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Такой пользователь уже существует')
    })
})
