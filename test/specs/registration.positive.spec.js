describe('Позитивные кейсы регистрации', () => {
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
