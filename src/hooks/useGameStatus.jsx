import {useCallback, useEffect, useState} from 'react';
import {GAME_STATUS} from '../constants';

export function useGameStatus(config) {
    const [shotsLeft, setShotsLeft] = useState(config.shots);
    const [shipsLeft, setShipsLeft] = useState(config.ships);
    const [status, setStatus] = useState(GAME_STATUS.PLAYING);

    const recordShot = useCallback(() => {
        setShotsLeft((prev) => {
            const newShots = prev - 1;
            if (newShots === 0 && shipsLeft > 0) {
                setStatus(GAME_STATUS.LOST);
            }
            return newShots;
        });
    }, [shipsLeft]);

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
        recordShot,
        recordHit,
        resetStatus
    };
}