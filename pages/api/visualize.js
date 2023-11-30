// /api/visualize.js

import {createRouter} from 'next-connect';
import cors from 'cors';
import fs from 'fs/promises';

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    credentials: true,
    optionsSuccessStatus: 204,
};

const DATA_FILE_PATH = './data.json';

const handler = createRouter();

handler.use(cors(corsOptions));

handler.post(async (req, res) => {
    const newData = req.body;

    // Save data to the file
    fs.writeFile(DATA_FILE_PATH, JSON.stringify(newData))
        .then(() => {
            res.status(200).json({data: newData});
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            res.status(500).json({error: 'Internal Server Error'});
        });
});

handler.get(async (req, res) => {
    // Get data from the file
    fs.readFile(DATA_FILE_PATH, 'utf-8')
        .then((data) => {
            res.status(200).json({data: JSON.parse(data)});
        })
        .catch((error) => {
            console.error('Error reading data:', error);
            res.status(500).json({error: 'Internal Server Error'});
        });
});

handler.all((req, res) => {
    res.status(405).end();
});

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler.handler();
