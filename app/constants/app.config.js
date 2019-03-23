const PORT = 5500;
const PROD_URL = 'https://raw.githubusercontent.com/PrudhviRaj5/my-awesome-blog/master';
const DEV_URL = `http://localhost:${PORT}`;
// const DEV_URL = 'http://aff8577e.ngrok.io';

export const URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;
export const SECRET_SALT = 'AT2F27K812BR';
export const SECRET_EMAIL = '76656e2a747671606c726d31446369656d682a676b69';
