import axios from 'axios';
import { URL } from 'constants/app.config';

const instance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    // 'session-token': getToken(),
  },
});

instance.interceptors.request.use(
  (config) => {
    // if (config.baseURL === baseApiAddress && !config.headers.session_token) {
    //   const ses_token = getToken();
    //   if (ses_token) {
    //     // eslint-disable-next-line no-param-reassign
    //     config.headers['session-token'] = ses_token;
    //   }
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
