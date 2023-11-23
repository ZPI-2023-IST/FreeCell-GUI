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