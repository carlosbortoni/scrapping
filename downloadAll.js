const puppeteer = require('puppeteer');
const Downloader = require('./images');
const path = require('path');

const filepath = path.resolve(__dirname, 'images');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');

  const imageURLs = await page.$$eval('.product_pod .thumbnail', imgsAll => imgsAll.map(img => img.src));

  // console.log(imageURLs)

  imageURLs.forEach(imageURL => {
    Downloader.download(imageURL, filepath, function(filename){
      console.log('Download complete', filename)
    })
  })
  

  await browser.close();
})();