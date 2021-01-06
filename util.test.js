const { generateText, checkAndGenerate } = require('./util')
const puppeteer = require('puppeteer')

test('should output name and age', () => {
    const text = generateText('Andrew', 30)
    expect(text).toBe('Andrew (30 years old)')
    const text2 = generateText('Anh', 30)
    expect(text2).toBe('Anh (30 years old)')
})

test('should output data less text', ()=> {
    const text = generateText('', null)
    expect(text).toBe(' (null years old)')
})


test('should generate a valid text output', () => {
    const text = checkAndGenerate('Andrew', 30)
    expect(text).toBe('Andrew (30 years old)')
})

test('should click around', async () => {
    const broswer = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920, 1080']
    })
    const page = await broswer.newPage();
    await page.goto(
        'file:///Users/Hawley/Development/code/js-testing-introduction/index.html'
    )
    await page.click('input#name')
    await page.type('input#name', 'Anna')

    await page.click('input#age')
    await page.type('input#age', '28')
    await page.click('#btnAddUser')
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (28 years old)')
}, 10000)