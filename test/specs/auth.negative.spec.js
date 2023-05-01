// TODO: Написать реализацию тестов негативной авторизации
describe('Негативные кейсы авторизации', () => {
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
        await browser.url('/login')
    }


    // Перед каждым тестом
    beforeEach(async () => {
        await registerUser();
        await browser.url('/login')
    });

    //вводим  данные несуществующего пользователя
    it('Ошибка авторизации', async function() {
        await $('#email').setValue(email)
        await $('#password').setValue('1')
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация не прошла  и появился текст "Ошибка авторизации"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Ошибка авторизации')
    })
        //вводим  данные несуществующего пользователя на русском языке
    it('Ошибка авторизации', async function() {
        await $('#email').setValue('емайл')
        await $('#password').setValue('1')
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация не прошла  и появился текст "Ошибка авторизации"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Ошибка авторизации')
    })
        //оставляем поля пустыми
    it('Ошибка авторизации', async function() {
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация не прошла  и появился текст "Ошибка авторизации"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Ошибка авторизации')
    })
    	// вводим пароль без email
        it('Ошибка авторизации', async function() {
        await $('#password').setValue('1')
        await $('button[type="submit"]').click()
        // Проверяем, что авторизация не прошла  и появился текст "Ошибка авторизации"
        await $('#result-text').waitForDisplayed()
        const resultText = await $('#result-text').getText()
        expect(resultText).toBe('Ошибка авторизации')
    })
})
