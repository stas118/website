describe('Позитивные кейсы авторизации', () => {
    var email;

    // TODO: Написать реализацию регистрации юзера
    function registerUser() {
        // TODO: 1. Сгенерировать новый email
        // 2. По шагам зарегистрировать этого юзера
    }


    // Перед каждым тестом
    beforeEach(async () => {
        registerUser();
        await browser.url('/login')
    });

    //вводим валидные данные в поля 
    // TODO: в авторизации использовать email, который был зарегистрирован в beforeEach
    it('Авторизация успешна', async function() {
        await $('#email').setValue('hell@omail.ru')
        await $('#password').setValue('password')
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация прошла успешно и появился текст "Авторизация успешна"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Авторизация успешна')
    })
})