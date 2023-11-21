import cors from 'cors';

let data_saved = null;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your actual frontend origin
  methods: 'GET,POST',
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  credentials: true,
  optionsSuccessStatus: 204, // A 204 status code will be sent for successful OPTIONS requests
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    cors(corsOptions)(req, res, () => {
      res.status(200).end();
    });
  } else if (req.method === 'POST') {
    data_saved = req.body;
    cors(corsOptions)(req, res, () => {
      res.status(200).json({ data: data_saved });
    });
  } else if (req.method === 'GET') {
    cors(corsOptions)(req, res, () => {
      res.status(200).json({ data: data_saved });
    });
  } else {
    // Return a 405 Method Not Allowed for non-POST requests
    res.status(405).end();
  }
}
