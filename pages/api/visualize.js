// /api/visualize.js

import { createRouter } from 'next-connect';
import cors from 'cors';

let data_saved = null;

const corsOptions = {
  origin: 'http://frontend:3000', // Replace with your actual frontend origin
  methods: 'GET,POST',
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  credentials: true,
  optionsSuccessStatus: 204,
};

const handler = createRouter();

// Add CORS middleware
handler.use(cors(corsOptions));


// Route handler for POST requests
handler.post(async (req, res) => {
  data_saved = req.body;
  console.log(data_saved)
  res.status(200).json({ data: data_saved });
});

// Route handler for GET requests
handler.get((req, res) => {
  console.log(data_saved)
  res.status(200).json({ data: data_saved });
});

// Return a 405 Method Not Allowed for non-POST requests
handler.all((req, res) => {
  res.status(405).end();
});

export default handler.handler();
