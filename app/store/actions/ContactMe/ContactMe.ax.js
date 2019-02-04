import axios from 'axios';
import { decipher } from 'utils/utils';
import { SECRET_SALT, SECRET_EMAIL } from 'constants/app.config';

const myDecipher = decipher(SECRET_SALT);

export const mailMe = (content) => {
  const email = myDecipher(SECRET_EMAIL);
  return axios({
    method: 'POST',
    url: 'http://mail-service.zylotech.com/api/email/send_email',
    data: {
      to: [email],
      from: 'My Awesome Blog',
      subject: 'Potential from Blog',
      text: content,
      fromId: 'blog-noreply',
    },
  });
};
