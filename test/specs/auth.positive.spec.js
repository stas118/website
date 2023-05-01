describe('Позитивные кейсы авторизации', () => {
    var email;
    // TODO: Написать реализацию регистрации юзера
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
        await browser.url('/login')
    }


    // Перед каждым тестом
    beforeEach(async () => {
        await registerUser();
        await browser.url('/login')
    });

    //вводим валидные данные в поля 
    // TODO: в авторизации использовать email, который был зарегистрирован в beforeEach
    it('Авторизация успешна', async function() {
        await $('#email').setValue(email)
        await $('#password').setValue('password')
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация прошла успешно и появился текст "Авторизация успешна"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Авторизация успешна')
    })
})
