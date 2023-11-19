// components/RenderedFreeCellPage.js
import React from 'react';
import FreeCellPage from '../pages/freecell/[id]';

const RenderedFreeCellPage = ({ data }) => {
  return <FreeCellPage data={data} />;
};

export default RenderedFreeCellPage;
