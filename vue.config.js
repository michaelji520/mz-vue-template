const path = require('path');
const { exec } = require('child_process');
// mock server list
const mock = {
  localhost: 'http://localhost:9527',
  server: 'your mock server address'
};

// launch local mock server
if (process.env.MOCK) {
  console.log('launching local mock server...');
  exec(`node ${path.resolve(__dirname, './mock/server.js')} > ${path.resolve(__dirname, './mock/access.log')}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}


module.exports = {
  devServer: {
    proxy: {
      '/mock_api': {
        target: mock.localhost,
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
}
