// pages/api/visualization.js

import FreeCellPage from "@/components/FreeCellPage";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;



    console.log(data)
    res.status(200).json({ data });
  } else {
    // Return a 405 Method Not Allowed for non-POST requests
    res.status(405).end();
  }
}
