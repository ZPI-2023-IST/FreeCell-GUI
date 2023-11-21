import React from 'react';
import Card from './Card';

const Stack = ({ stackData }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
{Object.entries(stackData).map(([suit, card], index) => (
  <Card
    key={index}
    value={card ? card : getSuitSymbol(suit)} // If card is empty, show only the suit
    style={{
      margin: '0 10px',
      minWidth: '120px', // Match the width of the Card component
      minHeight: '180px', // Match the height of the Card component
    }}
  />
))}

    </div>
  );
};

export const getSuitSymbol = (suit) => {
  switch (suit) {
    case 'h':
      return '♥'; // Hearts
    case 'd':
      return '♦'; // Diamonds
    case 'c':
      return '♣'; // Clubs
    case 's':
      return '♠'; // Spades
    default:
      return '';
  }
};

export default Stack;
