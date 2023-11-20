// pages/visualizations/freecell.js

import { useEffect, useState } from 'react';
import FreeCellPage from '../components/FreeCellPage';

const VisualizationPage = (data) => {
  const [postData, setPostData] = useState(null);

    useEffect(() => {
      // Make a POST request to the API route
      fetch('/api/visualization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* your data here */ }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Set the retrieved data to the state
          setPostData(responseData.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []); // Run the effect only once when the component mounts

  return (
    <div>
      {postData ? (
        <FreeCellPage data={postData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VisualizationPage;
