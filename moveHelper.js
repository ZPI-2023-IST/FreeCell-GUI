// boardUtils.js

// Helper function to find the moved card
const findMovedCard = (prevBoard, currentBoard) => {
    // Loop through each column
    for (let columnIndex = 0; columnIndex < prevBoard.length; columnIndex++) {
        const prevColumn = prevBoard[columnIndex];
        const currentColumn = currentBoard[columnIndex];

        let biggerColumn = prevColumn.length > currentColumn.length ? prevColumn : currentColumn;
        let smallerColumn = prevColumn.length > currentColumn.length ? currentColumn : prevColumn;

        for (let cardIndex = 0; cardIndex < biggerColumn.length; cardIndex++) {
            const prevCard = biggerColumn[cardIndex];
            const currentCard = smallerColumn[cardIndex];

            // Check if the card is moved
            if (prevCard !== currentCard) {
                // Return the moved card
                return prevCard;
            }
        }
    }

    // No moved card found in this column
    return null;
};

const findMovedCardOnFreecell = (prevFreeCells, currentFreeCells) => {
    for (let i = 0; i < 4; i++) {
        if (prevFreeCells[i] !== currentFreeCells[i]) {
            return prevFreeCells[i] ? prevFreeCells[i] : currentFreeCells[i];
        }
    }
    return null;
}

// Main findMove function
export const findMove = (prevFreeCellBoard, currentFreeCellBoard) => {
    const prevBoard = prevFreeCellBoard.Board;
    const currentBoard = currentFreeCellBoard.Board;

    // Find the moved card
    const movedCard_columns = findMovedCard(prevBoard, currentBoard);
    const movedCard_freecells = findMovedCardOnFreecell(prevFreeCellBoard.FreeCells, currentFreeCellBoard.FreeCells);

    if (movedCard_columns) {
        return {
            movedCard: movedCard_columns,
        };
    } else if (movedCard_columns === null && movedCard_freecells) {
        return {
            movedCard: movedCard_freecells,
        };
    } else {
        return null;
    }


};


export const combineBoards = (prevWholeBoard, currentWholeBoard) => {
    let prevStack = prevWholeBoard.Stack;
    let currentStack = currentWholeBoard.Stack;
    let prevFreeCells = prevWholeBoard.FreeCells;
    let currentFreeCells = currentWholeBoard.FreeCells;
    let prevBoard = prevWholeBoard.Board;
    let currentBoard = currentWholeBoard.Board;

    let newBoard = {
        Board: [],
        FreeCells: [],
        Stack: [],
    };

    for (let columnIndex = 0; columnIndex < prevBoard.length; columnIndex++) {
        const prevColumn = prevBoard[columnIndex];
        const currentColumn = currentBoard[columnIndex];

        let biggerColumn = prevColumn.length > currentColumn.length ? prevColumn : currentColumn;

        newBoard.Board.push(biggerColumn);
    }

    for(let i = 0; i < 4; i++) {
        if(prevFreeCells[i] !== currentFreeCells[i]) {
            newBoard.FreeCells.push(prevFreeCells[i] ? prevFreeCells[i] : currentFreeCells[i]);
        }else {
            newBoard.FreeCells.push(prevFreeCells[i]);
        }
    }

    for(let i = 0; i < 4; i++) {
        if(prevStack[i] !== currentStack[i]) {
            newBoard.Stack.push(prevStack[i] ? prevStack[i] : currentStack[i]);
        }else {
            newBoard.Stack.push(prevStack[i]);
        }
    }

    return newBoard;
};

export const whatBoard = (boardStates,currentBoardIndex)=>
{
    if(currentBoardIndex ===0){
        return combineBoards(boardStates[1], boardStates[0])
    }else if(currentBoardIndex+1< boardStates.length){
        return combineBoards(boardStates[currentBoardIndex+1], boardStates[currentBoardIndex])
    }else{
        return combineBoards(boardStates[boardStates.length - 1], boardStates[boardStates.length - 2])
    }
}

