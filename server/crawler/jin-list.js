const puppeteer = require('puppeteer')

const url = `https://www.jin10.com/`

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
  
  const result = await page.evaluate(() => {
    let items = document.getElementsByClassName('jin-flash-item-container')
    var links = []
    if (items.length >= 1) {
      for (let index = 0; index < items.length; index++) {
        let item = items[index]
        let right = item.getElementsByClassName('right-content')[0].getElementsByTagName('div')[0]
        links.push({
          time: item.getElementsByClassName('item-time')[0].innerText,
          txt: right.innerText,
        })
      }
    }
    return links
  })
  browser.close()
  console.log(result);
})()