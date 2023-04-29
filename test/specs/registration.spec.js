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

    it('Email должен быть валидным', async function() {
        // Проверяем, что поле email не валидно. вводим по со специсимволами
        // Селектор ищет по id="email"
        await $('#email').setValue('Привет@dmail.ru')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email на латинице')
    })

    it('Email должен быть валидным', async function() {
        // Проверяем, что поле email не валидно. вводим по со специсимволами
        // Селектор ищет по id="email"
        await $('#email').setValue('Привет@dmail.ru')

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email на латинице')
    })

    it('Email должен быть валидным', async function() {
        // Проверяем, что поле email не валидно. вводим по со специсимволами
        // Селектор ищет по id="email"

        // Жмем кнопку "Зарегистрироваться". Селектор ищет тэг button с атрибутом type="submit"
        await $('button[type="submit"]').click()

        // Проверяем, что появился алерт с текстом "Введите email на латинице"
        const alertText = await browser.getAlertText();
        expect(alertText).toBe('Введите email на латинице')
    })

    
})

