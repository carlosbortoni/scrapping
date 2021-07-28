const https = require('https');
const fs = require('fs');

const url = "https://domia.com.br/assets/images/logo-domia.png";

https.get(url, (res) => {
  const fileStream = fs.createWriteStream('./images/logo.png');
  res.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Download done!');
  })
});