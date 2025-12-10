import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";
import {BUTTON_STATES, GAME_CONFIG, GAME_STATUS} from "../constants.js";
import {useGameLogic} from "../hooks/useGameLogic.jsx";
import {useEffect} from "react";

export function GamePage(props) {
    const { onEndGame } = props;

    const {
        board,
        shotsLeft,
        shipsLeft,
        status,
        handleCellClick
    } = useGameLogic();

    useEffect(() => {
        if (status !== GAME_STATUS.PLAYING) {
            const timer = setTimeout(() => {
                onEndGame({
                    shots: GAME_CONFIG.MAX_SHOTS - shotsLeft,
                    shipsLeft: shipsLeft,
                    status: status
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [status, onEndGame, shotsLeft, shipsLeft]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                <span>Пострілів: {shotsLeft}</span>
                <span>Кораблів: {shipsLeft}</span>
            </div>

            <Board cells={board} onCellClick={handleCellClick} />

            <Button variant={BUTTON_STATES.DECLINE} onClick={() => onEndGame({ shots: 0, shipsLeft: 3, status: GAME_STATUS.LOST })}>
                Здатися
            </Button>
        </div>
    );
}