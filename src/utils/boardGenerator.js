import { CELL_STATE } from '../constants';

export const generateBoard = (shipsCount, boardSize = 25) => {
    const board = Array.from({ length: boardSize }, (_, i) => ({
        id: i,
        status: CELL_STATE.EMPTY,
        hasShip: false,
    }));

    let placed = 0;
    while (placed < shipsCount) {
        const idx = Math.floor(Math.random() * boardSize);
        if (!board[idx].hasShip) {
            board[idx].hasShip = true;
            placed++;
        }
    }

    return board;
};