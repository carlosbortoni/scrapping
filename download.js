const puppeteer = require('puppeteer');
const Downloader = require('./images');
const path = require('path');

const filepath = path.resolve(__dirname, 'images');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html');

  const imageURL = await page.$eval('.thumbnail .item.active img', img => img.src);

  
  Downloader.download(imageURL, filepath, function(filename){
    console.log('Download complete', filename)
  })

  await browser.close();
})();