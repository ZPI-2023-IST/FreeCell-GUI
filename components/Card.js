// components/Card.js

import React from 'react';

const Card = ({ value, style }) => {
  const getSuitSymbol = (suit) => {
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

  const cardStyle = {
    border: '2px solid #333',
    borderRadius: '15px',
    padding: '15px',
    margin: '10px',
    minWidth: '80px',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    ...style, // Allow custom styles to override defaults
  };

  const suitStyle_upper_left = {
    fontSize: '24px',
    color: value && (value.includes('h') || value.includes('d')) ? 'red' : 'black',
    position: 'absolute',
    top: '5px',
    left: '5px',
  };

  const suitStyle_bottom_right = {
    fontSize: '24px',
    color: value && (value.includes('h') || value.includes('d')) ? 'red' : 'black',
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  };

  const valueStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: value && (value.includes('h') || value.includes('d')) ? 'red' : 'black',
    position: 'absolute',
    top: '50%', // Center the value vertically
    left: '50%', // Center the value horizontally
    transform: 'translate(-50%, -50%)', // Center the value using translation
  };

  return (
    <div style={{ ...cardStyle }}>
      {value && (
        <>
          <div style={suitStyle_upper_left}>{getSuitSymbol(value.slice(-1))}{value.split(' ')[0]}</div>
          <div style={valueStyle}>{value.split(' ')[0]}</div>
          <div style={suitStyle_bottom_right}>{getSuitSymbol(value.slice(-1))}{value.split(' ')[0]}</div>
        </>
      )}
    </div>
  );
};

export default Card;
