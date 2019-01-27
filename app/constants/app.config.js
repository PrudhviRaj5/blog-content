import webpackDevConfig from '../../webpack.dev';

const PROD_URL = 'https://raw.githubusercontent.com/PrudhviRaj5/my-awesome-blog/master';
const DEV_URL = `http://localhost:${webpackDevConfig.devServer.port}`;

module.exports = {
  URL: process.env.NODE_ENV === 'prodution' ? PROD_URL : DEV_URL,
};
