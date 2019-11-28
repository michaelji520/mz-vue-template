const path = require('path');
const { exec } = require('child_process');
// mock server list
const mock = {
  localhost: 'http://localhost:9527',
  server: 'your mock server address'
};

exec(`node ${path.resolve(__dirname, './mock/server.js')} > ${path.resolve(__dirname, './mock/access.log')}`, (err, stdout, stderr) => {
  if (err) {
    console.error('Failed to launch mock server!', err);
    return;
  }
  console.log(stdout);
  console.error(stderr);
})

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