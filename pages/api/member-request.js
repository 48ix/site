import axios from 'axios';
import siteConfig from '../../siteConfig';
import Cors from 'cors';

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS'],
    origin: '*',
  }),
);

export default async function handler(req, res) {
  await cors(req, res);
  let message, status;
  try {
    const slackResponse = await axios.post(siteConfig.endpoints.join, req.body);
    message = slackResponse.statusText;
    status = slackResponse.status;
  } catch (err) {
    message = err;
    status = 400;
  }
  res.status(status).json({ response: String(message) });
}
