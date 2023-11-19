// pages/api/visualize.js
import { v4 as uuidv4 } from 'uuid';
import RenderedFreeCellPage from '../../components/RenderedFreeCellPage';

export default function handler(req, res) {
  if (req.method === 'POST') {
    handlePost(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function handlePost(req, res) {
  try {
    const data = req.body;
    const uniqueId = uuidv4();

    // Send proper JSON response
    res.status(200).json({
      message: 'Data received successfully',
      id: uniqueId,
      boardData: data, // Include the received board data
      link: `/freecell/${uniqueId}`, // Add link to the response
    });

    // RenderedFreeCellPage({ data });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
