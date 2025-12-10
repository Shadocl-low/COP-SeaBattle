import {useCallback, useState} from 'react';
import {GAME_STATUS} from '../constants';

export function useGameStatus(config) {
    const [shotsLeft, setShotsLeft] = useState(config.shots);
    const [shipsLeft, setShipsLeft] = useState(config.ships);
    const [status, setStatus] = useState(GAME_STATUS.PLAYING);

    const recordShot = useCallback(() => {
        setShotsLeft((prev) => {
            return prev - 1;
        });
    }, []);

    const recordHit = useCallback(() => {
        setShipsLeft((prev) => {
            const newHit = prev - 1;
            if (newHit === 0) setStatus(GAME_STATUS.WON);
            return newHit;
        });
    }, []);

    const resetStatus = useCallback(() => {
        setShotsLeft(config.shots);
        setShipsLeft(config.ships);
        setStatus(GAME_STATUS.PLAYING);
    }, [config.shots, config.ships]);

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