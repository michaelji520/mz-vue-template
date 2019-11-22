import axios from 'axios';

/**
 * @description send ajax request
 * @param {object} options
 */
function send(options) {
  const { url } = options;
  if (!url) {
    return new Promise((resolve, reject) => {
      reject(new Error('api cannot be empty!'));
    });
  }
  return new Promise((resolve, reject) => {
    axios(options).then((response) => {
      // You can do custom data process here
      const { data } = response;
      resolve(data);
    }).catch((err) => {
      // You can define custom error handler here
      console.error(err);
      reject(err);
    });
  });
}

/**
 * @description send http get request
 * @param {string} api
 * @param {object} params
 */
function get(api, params) {
  return send({ url: api, params: params || {} });
}

/**
 * @description send http post request
 * @param {string} api
 * @param {object} data
 */
function post(api, data) {
  return send({ url: api, data: data || {} });
}

export default { send, get, post };
