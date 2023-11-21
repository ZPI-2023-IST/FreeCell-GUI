import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faPause, faPlay, faRedo} from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card';
import Stack from '../components/Stack';

const buttonStyle = {
    backgroundColor: 'green',
    border: 'none',
    borderRadius: '50%',
    width: '60px', // Adjusted width
    height: '60px', // Adjusted height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    margin: '10px',
};
const FreeCellPage = ({data}) => {
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
            alignItems: 'center',
        }}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px', width: '100%'}}>
                <button
                    onClick={() => {
                        handlePlayClick();
                        forceRerender();
                    }}
                    style={buttonStyle}
                >
                    {isPlaying ? <FontAwesomeIcon icon={faPause} size="3x"
                                                  color="white"/> : (currentBoardIndex === boardStates.length - 1 ?
                        <FontAwesomeIcon icon={faRedo} size="3x" color="white"/> :
                        <FontAwesomeIcon icon={faPlay} size="3x" color="white"/>)}
                </button>

                <button
                    onClick={() => {
                        handlePrevClick();
                        forceRerender();
                    }}
                    style={buttonStyle}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="3x" color="white"/>
                </button>

                <button
                    onClick={() => {
                        handleNextClick();
                        forceRerender();
                    }}
                    style={buttonStyle}
                >
                    <FontAwesomeIcon icon={faArrowRight} size="3x" color="white"/>
                </button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '40px',
                width: '100%',
                alignItems: 'flex-start' // Align items at the top
            }}>
                {/* Freecells (upper left) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    flexWrap: 'wrap',
                    textAlign: 'right',
                    marginRight: '20px',
                    alignItems: 'flex-start' // Align freecells at the top
                }}>
                    {currentBoard.FreeCells.map((card, index) => (
                        <Card key={index} value={card}/>
                    ))}
                </div>

                {/* Suit cells (upper right) */}
                <Stack stackData={currentBoard.Stack}/>
            </div>


            {/* Columns (below) */}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%'}}>
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
