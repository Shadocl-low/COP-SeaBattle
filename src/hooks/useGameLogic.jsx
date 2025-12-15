import { useCallback } from 'react';
import { useBoard } from './useBoard';
import { useGameStatus } from './useGameStatus';
import { CELL_STATE, GAME_STATUS, DEFAULT_CONFIG } from '../constants';

export function useGameLogic(settings = DEFAULT_CONFIG) {
    const { board, updateCell, resetBoard } = useBoard(settings);

    const {
        shotsLeft,
        shipsLeft,
        status,
        recordShot,
        recordHit,
        resetStatus
    } = useGameStatus(settings);

    const handleCellClick = useCallback((id) => {
        if (status !== GAME_STATUS.PLAYING) return;

        const cell = board[id];
        if (cell.status !== CELL_STATE.EMPTY && cell.status !== CELL_STATE.SHIP) return;

        recordShot();

        if (cell.hasShip) {
            updateCell(id, CELL_STATE.HIT);
            recordHit();
        } else {
            updateCell(id, CELL_STATE.MISS);
        }

    }, [board, status, updateCell, recordShot, recordHit]);

    const restartGame = useCallback(() => {
        resetBoard();
        resetStatus();
    }, [resetBoard, resetStatus]);

    return {
        board,
        shotsLeft,
        shipsLeft,
        status,
        handleCellClick,
        restartGame
    };
}