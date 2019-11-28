// set web port
var PORT = 9527;

var url=require('url');
var path=require('path');
var fs = require('fs');
var http = require('http');

var server = http.createServer((req, res) => {
  var url = req.url;
  switch (url) {
    case '':
    case '/':
    case '/index':
      res.writeHeader(200, {'content-type': 'text/html;charset="utf-8"'});
      res.write('This is index page.');
      res.end();
      break;
    case '/favicon.ico':
      try {
        res.write(fs.readFileSync(path.resolve(__dirname, './favicon.ico')));
        res.end();
      } catch(err) {
        console.log(err);
      }
      break;
    default:
      console.log(`request ${url}`);
      const json = path.resolve(__dirname, `./data${url}.json`);
      try {
        const package = require(json);
        res.write(JSON.stringify(package));
        res.end();
      } catch(err) {
        res.write(JSON.stringify({
          status: 1000,
          msg: `Target mock file ${json} doesn't exist! Check your mock data`
        }));
        res.end();
      }
  }
});
server.listen(PORT, '0.0.0.0');
console.log('Server started at port:', PORT);