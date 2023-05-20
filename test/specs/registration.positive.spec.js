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

})
