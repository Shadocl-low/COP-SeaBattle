import { useState, useCallback } from 'react';
import { GAME_CONFIG, GAME_STATUS } from '../constants';

export function useGameStatus() {
    const [shotsLeft, setShotsLeft] = useState(GAME_CONFIG.MAX_SHOTS);
    const [shipsLeft, setShipsLeft] = useState(GAME_CONFIG.TOTAL_SHIPS);
    const [status, setStatus] = useState(GAME_STATUS.PLAYING);

    const recordShot = useCallback(() => {
        setShotsLeft((prev) => {
            const newVal = prev - 1;
            return newVal;
        });
    }, []);

    const recordHit = useCallback(() => {
        setShipsLeft((prev) => {
            const newList = prev - 1;
            if (newList === 0) setStatus(GAME_STATUS.WON);
            return newList;
        });
    }, []);

    const resetStatus = useCallback(() => {
        setShotsLeft(GAME_CONFIG.MAX_SHOTS);
        setShipsLeft(GAME_CONFIG.TOTAL_SHIPS);
        setStatus(GAME_STATUS.PLAYING);
    }, []);

    return {
        shotsLeft,
        shipsLeft,
        status,
        setStatus,
        recordShot,
        recordHit,
        resetStatus
    };
}