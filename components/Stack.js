// components/Stack.js

import React from 'react';
import Card from './Card'; // Adjust the path based on your project structure

const Stack = ({ stackData }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {Object.entries(stackData).map(([suit, card], index) => (
        <Card key={index} value={suit} style={{ margin: '0 10px' }} />
      ))}
    </div>
  );
};

export default Stack;
