import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faPause, faPlay, faRedo} from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card';
import {findMove, whatBoard} from "@/moveHelper";


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
    marginBottom: '10px',
};

const FreeCellPage = ({data}) => {
    const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cardBackgrounds, setCardBackgrounds] = useState({});
    const [movedCard, setMovedCard] = useState(null);


    const boardStates = data;
    let currentBoard = whatBoard(boardStates, currentBoardIndex);


    let nextBoard = boardStates[currentBoardIndex + 1] ? boardStates[currentBoardIndex + 1] : boardStates[boardStates.length - 1];

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


    useEffect(() => {
        if (currentBoardIndex < boardStates.length - 1) {
            // Find the move for the current board index
            const move = findMove(boardStates[currentBoardIndex], boardStates[currentBoardIndex + 1]);

            // Get all elements with the ID equal to move.movedCard
            const movedCardElements = document.querySelectorAll('[id="' + move.movedCard + '"]');

            if (movedCard) {
                // Change the background color of all movedCard elements to the original background color
                movedCard.forEach((element) => {
                    element.style.backgroundColor = 'white';
                });
            }

            setMovedCard(movedCardElements);

            // Change the background color of all movedCard elements to grey
            movedCardElements.forEach((element) => {
                element.style.backgroundColor = '#878f99';
            });


        }
    }, [currentBoardIndex, boardStates, isPlaying]);


    useEffect(() => {

        // Iterate through freecells
        currentBoard.FreeCells.forEach((card) => {
            const cardElement = document.getElementById(card?.toString());
            if (cardElement) {
                const background = cardElement.style.background;
                setCardBackgrounds((prevBackground) => ({
                    ...prevBackground,
                    [card.toString()]: background,
                }));
            }
        });

        // Iterate through suitstacks
        currentBoard.Stack.forEach((card) => {
            const cardElement = document.getElementById(card?.toString());
            if (cardElement) {
                const background = cardElement.style.background;
                setCardBackgrounds((prevBackground) => ({
                    ...prevBackground,
                    [card.toString()]: background,
                }));
            }
        });

        // Iterate through columns
        currentBoard.Board.forEach((column) => {
            column.forEach((card) => {
                const cardElement = document.getElementById(card?.toString());
                if (cardElement) {
                    const background = cardElement.style.background;
                    setCardBackgrounds((prevBackground) => ({
                        ...prevBackground,
                        [card.toString()]: background,
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
                        <Card
                            key={index}
                            value={card}
                            style={{
                                borderColor: nextBoard.FreeCells[index] !== card ? 'grey' : 'black',
                                opacity: nextBoard.FreeCells[index] !== card ? 0.5 : 1,
                                filter: nextBoard.FreeCells[index] !== card ? 'grayscale(100%)' : 'none',
                                cursor: nextBoard.FreeCells[index] !== card ? 'not-allowed' : 'pointer',
                            }}
                        />
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
                        <Card
                            key={index}
                            value={card}
                            style={{
                                borderColor: nextBoard.Stack[index] !== card ? 'grey' : 'black',
                                opacity: nextBoard.Stack[index] !== card ? 0.5 : 1,
                                filter: nextBoard.Stack[index] !== card ? 'grayscale(100%)' : 'none',
                                cursor: nextBoard.Stack[index] !== card ? 'not-allowed' : 'pointer',
                            }}
                        />
                    ))}
                </div>
            </div>

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
                        marginRight: '5px',
                        marginBottom: '20px',
                        flex: '1',
                        position: 'relative',
                    }}>
                        {column.map((card, cardIndex) => (
                            <Card
                                key={cardIndex}
                                value={card}
                                style={{
                                    zIndex: cardIndex + 1,
                                    position: 'absolute',
                                    top: cardIndex * 50,
                                    borderColor: nextBoard.Board[columnIndex][cardIndex] !== card ? 'grey' : 'black',
                                    opacity: nextBoard.Board[columnIndex][cardIndex] !== card ? 0.5 : 1,
                                    filter: nextBoard.Board[columnIndex][cardIndex] !== card ? 'grayscale(100%)' : 'none',
                                    cursor: nextBoard.Board[columnIndex][cardIndex] !== card ? 'not-allowed' : 'pointer',
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

