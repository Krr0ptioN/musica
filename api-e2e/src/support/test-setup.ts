/* eslint-disable */

import axios from 'axios';

module.exports = async function() {
  // Configure axios for tests to use.
  const host = process.env.HOST_API ?? 'localhost';
  const port = process.env.PORT_API ?? '3000';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
