const https = require('https');
https.get('https://cn.bing.com/rp/n21aGRCN5EKHB3qObygw029dyNU.br.js', (res) => {
  let str = '';
  res.on('data', (chunk) => {
    str += chunk;
  });
  res.on('end', () => {
    console.log(str, 8);
  });
});
