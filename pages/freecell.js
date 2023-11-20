// pages/visualizations/freecell.js

import { useEffect, useState } from 'react';
import FreeCellPage from '../components/FreeCellPage';

const VisualizationPage = () => {

  return (
    <div>
      {data ? (
        <FreeCellPage data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VisualizationPage;
