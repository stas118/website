describe('Позитивные кейсы регистрации', () => {
    var email;

    // Перед каждым тестом
    beforeEach(async () => {
        email = "hello" + Date.now() + "@mail.ru";
        browser.url('/registration')
    });

    //вводим валидные данные в поля 
    it('Регистрация успешна', async function() {
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