const https = require('https');
const fs = require('fs');
const path = require('path');

downloadFile = (url, callback) => {
  const filename = path.basename(url);
  const req = https.get(url, (res) => {
    const fileStream = fs.createWriteStream(`./images/${filename}`);
    res.pipe(fileStream);
  
    fileStream.on('error', (err) => {
      console.log(err)
    })

    fileStream.on('close', () => {
      callback(filename)
    })
  
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Download done!');
    })
  });
  
  req.on('error', (err) => {
    console.log(err)
  })
}

downloadFile("https://domia.com.br/assets/images/logo-domia.png", (fn) => {
  console.log(fn);
});