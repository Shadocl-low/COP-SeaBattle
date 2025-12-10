import { useState, useCallback } from 'react';
import { CELL_STATE, GAME_CONFIG } from '../constants';

function generateBoard() {
    const newBoard = Array.from({ length: GAME_CONFIG.BOARD_SIZE }, (_, i) => ({
        id: i,
        status: CELL_STATE.EMPTY,
        hasShip: false,
    }));

    let shipsPlaced = 0;
    while (shipsPlaced < GAME_CONFIG.TOTAL_SHIPS) {
        const randomIndex = Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE);
        if (!newBoard[randomIndex].hasShip) {
            newBoard[randomIndex].hasShip = true;
            shipsPlaced++;
        }
    }
    return newBoard;
}

export function useBoard() {
    const [board, setBoard] = useState(generateBoard);

    const updateCell = useCallback((id, newStatus) => {
        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[id] = { ...newBoard[id], status: newStatus };
            return newBoard;
        });
    }, []);

    const resetBoard = useCallback(() => {
        setBoard(generateBoard());
    }, []);

    return { board, updateCell, resetBoard };
}