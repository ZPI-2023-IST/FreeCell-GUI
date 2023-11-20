import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Stack from '../components/Stack';

const FreeCellPage = ({ data }) => {
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const boardStates = data;
  const currentBoard = boardStates[currentBoardIndex];

  const handleNextClick = () => {
    if (currentBoardIndex < boardStates.length - 1) {
      setCurrentBoardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentBoardIndex > 0) {
      setCurrentBoardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handlePlayClick = () => {
    if (currentBoardIndex === boardStates.length - 1) {
      // Game has ended, restart the game
      setCurrentBoardIndex(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        if (currentBoardIndex < boardStates.length - 1) {
          setCurrentBoardIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsPlaying(false);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentBoardIndex, boardStates, isPlaying]);

  // Function to force re-render by changing the key
  const forceRerender = () => setKey((prevKey) => prevKey + 1);

  return (
    <div key={key} style={{
      maxWidth: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', width: '100%' }}>
        <button onClick={() => {
          handlePlayClick();
          forceRerender();
        }}>{isPlaying ? 'Stop Game' : (currentBoardIndex === boardStates.length - 1 ? 'Restart Game' : 'See Game')}</button>
        <button onClick={() => {
          handlePrevClick();
          forceRerender();
        }}>Previous Board
        </button>
        <button onClick={() => {
          handleNextClick();
          forceRerender();
        }}>Next Board
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', width: '100%' }}>
        {/* Freecells (upper left) */}
        <div style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          flexWrap: 'wrap',
          textAlign: 'right',
          marginRight: '20px'
        }}>
          {currentBoard.FreeCells.map((card, index) => (
            <Card key={index} value={card} />
          ))}
        </div>

        {/* Suit cells (upper right) */}
        <Stack stackData={currentBoard.Stack} />
      </div>

      {/* Columns (below) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%' }}>
        {currentBoard.Board.map((column, columnIndex) => (
          <div key={columnIndex} style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '10px',
            marginBottom: '20px',
            flex: '1',
            position: 'relative',
            width: 'calc(20% - 10px)'
          }}>
            {column.map((card, cardIndex) => (
              <Card
                key={cardIndex}
                value={card}
                style={{
                  zIndex: cardIndex + 1,
                  position: 'absolute',
                  top: cardIndex * 50,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeCellPage;
