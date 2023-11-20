// pages/api/visualization.js

let data_saved = null
export default function handler(req, res) {
  if (req.method === 'POST') {
    data_saved = req.body
    res.status(200).json({data: data_saved})
  }
  else if (req.method ==='GET'){
    res.status(200).json({data: data_saved})
  }
  else{
    // Return a 405 Method Not Allowed for non-POST requests
    res.status(405).end();
  }
}
