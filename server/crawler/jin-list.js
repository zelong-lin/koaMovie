const puppeteer = require('puppeteer')

const url = `https://rili.jin10.com/`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  await page.waitForSelector('#J_economics_tag')

  for (let i = 0; i < 1; i++) {
    await sleep(3000)
    await page.click('#J_economics_tag')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    let links = []
    let items = $('#J_economicsWrap tr')
    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let img = it.find('.jin-rili_content-country img').attr('src')
        let main = it.find('.important a').attr('href')
        links.push({
          img,
          main
        })
      })
    }
    return links
  })
  browser.close()
  console.log(result);
})()