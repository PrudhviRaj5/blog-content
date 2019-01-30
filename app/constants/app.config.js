const PORT = 5500;
const PROD_URL = 'https://raw.githubusercontent.com/PrudhviRaj5/my-awesome-blog/master';
const DEV_URL = `http://localhost:${PORT}`;

export const URL = process.env.NODE_ENV === 'prodution' ? PROD_URL : DEV_URL;
