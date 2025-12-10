import { useEffect, useCallback } from 'react';
import { useBoard } from './useBoard';
import { useGameStatus } from './useGameStatus';
import { CELL_STATE, GAME_STATUS } from '../constants';

export function useGameLogic() {
    const { board, updateCell, resetBoard } = useBoard();

    const {
        shotsLeft,
        shipsLeft,
        status,
        setStatus,
        recordShot,
        recordHit,
        resetStatus
    } = useGameStatus();

    useEffect(() => {
        if (shotsLeft === 0 && shipsLeft > 0 && status === GAME_STATUS.PLAYING) {
            setStatus(GAME_STATUS.LOST);
        }
    }, [shotsLeft, shipsLeft, status, setStatus]);

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