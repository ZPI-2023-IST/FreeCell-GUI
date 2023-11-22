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

// Helper function to find if the move is to the last index of another column
const findMovedToColumn = (prevBoard, currentBoard, movedCard) => {
    for (let columnIndex = 0; columnIndex < prevBoard.length; columnIndex++) {
        const prevColumn = prevBoard[columnIndex];
        const currentColumn = currentBoard[columnIndex];

        // Check if the moved card is at the last index of the current column
        if (currentColumn.length > 0 && currentColumn[currentColumn.length - 1] === movedCard) {
            return true;
        }
    }

    // The moved card is not at the last index of any column
    return false;
};

// Helper function to find if the move is to a freecell
const findMovedToFreecell = (prevFreeCells, currentFreeCells, movedCard) => {
    // Check if the moved card is in the current free cells
    return currentFreeCells.includes(movedCard);
};

// Helper function to find if the move is to a suit stack
const findMovedToSuitStack = (prevSuitStacks, currentSuitStacks, movedCard) => {
    // Check if the moved card is in the current suit stacks
    return Object.values(currentSuitStacks).includes(movedCard);
};

// Main findMove function
export const findMove = (prevFreeCellBoard, currentFreeCellBoard) => {
    const prevBoard = prevFreeCellBoard.Board;
    const currentBoard = currentFreeCellBoard.Board;

    // Find the moved card
    const movedCard = findMovedCard(prevBoard, currentBoard);

    if (!movedCard) {
        // If no move is found
        return null;
    }

    // Check if the move is to the last index of another column
    const movedToColumn = findMovedToColumn(prevBoard, currentBoard, movedCard);

    // Check if the move is to a freecell
    const movedToFreecell = findMovedToFreecell(prevFreeCellBoard.FreeCells, currentFreeCellBoard.FreeCells, movedCard);

    // Check if the move is to a suit stack
    const movedToSuitStack = findMovedToSuitStack(prevFreeCellBoard.Stack, currentFreeCellBoard.Stack, movedCard);

    // Return information about the move
    return {
        movedCard,
        movedToColumn,
        movedToFreecell,
        movedToSuitStack,
    };
};
