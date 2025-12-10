import { useState, useCallback } from 'react';
import { CELL_STATE, DEFAULT_CONFIG } from '../constants';

function generateBoard(shipsCount, boardSize) {
    const newBoard = Array.from({ length: boardSize }, (_, i) => ({
        id: i,
        status: CELL_STATE.EMPTY,
        hasShip: false,
    }));

    let shipsPlaced = 0;
    while (shipsPlaced < shipsCount) {
        const randomIndex = Math.floor(Math.random() * boardSize);
        if (!newBoard[randomIndex].hasShip) {
            newBoard[randomIndex].hasShip = true;
            shipsPlaced++;
        }
    }
    return newBoard;
}

export function useBoard(config) {
    const [board, setBoard] = useState(() =>
        generateBoard(config.ships, DEFAULT_CONFIG.BOARD_SIZE)
    );

    const updateCell = useCallback((id, newStatus) => {
        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[id] = { ...newBoard[id], status: newStatus };
            return newBoard;
        });
    }, []);

    const resetBoard = useCallback(() => {
        setBoard(generateBoard(config.ships, DEFAULT_CONFIG.BOARD_SIZE));
    }, [config.ships]);

    return { board, updateCell, resetBoard };
}