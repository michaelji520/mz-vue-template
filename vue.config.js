const path = require('path');
const execa= require('execa');
// mock server list
const mock = {
  localhost: 'http://localhost:9527',
  server: 'your mock server address'
};

// launch local mock server
if (process.env.MOCK) {
  console.log('launching local mock server...');
  (async () => {
    const { stdout } = await execa(`node ${path.resolve(__dirname, './mock/server.js')} > ${path.resolve(__dirname, './mock/access.log')}`);
    console.log(stdout);
  })();
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
