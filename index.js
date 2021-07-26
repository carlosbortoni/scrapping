const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/santosfc');

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img')

    const imgArray = [...nodeList]

    const imgList = imgArray.map( img => ({
      src: img.src
    }))

    // console.log(list)
    return imgList;
  })
  // await page.screenshot({ path: 'example-instagram.png' });
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('something went wrong');

    console.log('well done!')
  });

  await browser.close();
})();