import React from 'react';
import Card from './Card';

const Stack = ({ stackData }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      {Object.entries(stackData).map(([suit, card], index) => (
        <Card
          key={index}
          value={suit}
          style={{
            margin: '0 10px',
            // Add additional styles as needed
          }}
        />
      ))}
    </div>
  );
};

export default Stack;
