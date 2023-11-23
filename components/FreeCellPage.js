import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faPause, faPlay, faRedo} from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card';

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
    const [cardPositions, setCardPositions] = useState({});


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


    // useEffect(() => {
    //     if (currentBoardIndex > 0) {
    //         //make a loop for stroing all positions of all possible cards in the whoal page, freecells, suitstacks, and columns
    //         let move = findMove(boardStates[currentBoardIndex - 1], boardStates[currentBoardIndex]);
    //         const endPosition = document.getElementById(move.movedCard.toString()).getBoundingClientRect()
    //         const startPosition = cardPositions[move.movedCard.toString()]
    //         console.log(startPosition.x, endPosition.x)
    //     }
    // }, [currentBoardIndex, boardStates, isPlaying])

    useEffect(() => {

        // Iterate through freecells
        currentBoard.FreeCells.forEach((card) => {
            const cardElement = document.getElementById(card?.toString());
            if (cardElement) {
                const position = cardElement.getBoundingClientRect();
                setCardPositions((prevPositions) => ({
                    ...prevPositions,
                    [card.toString()]: position,
                }));
            }
        });

        // Iterate through suitstacks
        currentBoard.Stack.forEach((card) => {
            const cardElement = document.getElementById(card?.toString());
            if (cardElement) {
                const position = cardElement.getBoundingClientRect();
                setCardPositions((prevPositions) => ({
                    ...prevPositions,
                    [card.toString()]: position,
                }));
            }
        });

        // Iterate through columns
        currentBoard.Board.forEach((column) => {
            column.forEach((card) => {
                const cardElement = document.getElementById(card?.toString());
                if (cardElement) {
                    const position = cardElement.getBoundingClientRect();
                    setCardPositions((prevPositions) => ({
                        ...prevPositions,
                        [card.toString()]: position,
                    }));
                }
            });
        });

    }, [currentBoardIndex, boardStates, isPlaying]);

    return (
        <div style={{
            maxWidth: '100%',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: green;
        }
      `}</style>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px', width: '100%'}}>
                <button
                    onClick={() => {
                        handlePlayClick();
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
                    }}
                    style={buttonStyle}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="3x" color="white"/>
                </button>
                <button
                    onClick={() => {
                        handleNextClick();
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
                alignItems: 'flex-start', // Align items at the top
            }}>
                {/* Freecells (upper left) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    flexWrap: 'wrap',
                    textAlign: 'right',
                    alignItems: 'flex-start', // Align freecells at the top
                }}>
                    {currentBoard.FreeCells.map((card, index) => (
                        <Card key={index} value={card}/>
                    ))}
                </div>

                {/* Suit cells (upper right) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    flexWrap: 'wrap',
                    textAlign: 'right',
                    marginRight: '15px',
                    alignItems: 'flex-start', // Align freecells at the top
                }}>
                    {currentBoard.Stack.map((card, index) => (
                        <Card key={index} value={card}/>
                    ))}
                </div>
            </div>



            {/* Columns (below) */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                width: '100%',
                marginTop: '20px'
            }}>
                {currentBoard.Board.map((column, columnIndex) => (
                    <div key={columnIndex} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '10px',
                        marginBottom: '20px',
                        flex: '1',
                        position: 'relative',
                        width: 'calc(20% - 10px)',
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

