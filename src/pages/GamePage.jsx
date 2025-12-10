import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";
import {BUTTON_STATES, GAME_STATUS} from "../constants.js";
import {useGameLogic} from "../hooks/useGameLogic.jsx";
import {useState} from "react";
import { Modal } from "../components/Modal/Modal";

export function GamePage(props) {
    const { onEndGame, onBackToMenu, settings } = props;
    const {
        board,
        shotsLeft,
        shipsLeft,
        status,
        handleCellClick,
        restartGame
    } = useGameLogic(settings);

    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const isGameOver = status !== GAME_STATUS.PLAYING;
    const isWin = status === GAME_STATUS.WON;

    const handleResetRequest = () => {
        setShowResetConfirm(true);
    };

    const handleConfirmReset = () => {
        restartGame();
        setShowResetConfirm(false);
    };

    const handleCancelReset = () => {
        setShowResetConfirm(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                <span>Пострілів: {shotsLeft}</span>
                <span>Кораблів: {shipsLeft}</span>
            </div>

            <Board cells={board} onCellClick={handleCellClick} />

            <Button variant={BUTTON_STATES.DECLINE} onClick={() => handleResetRequest()}>
                Скинути
            </Button>

            <Button variant={BUTTON_STATES.PRIMARY} onClick={() => onBackToMenu()}>
                Меню
            </Button>

            <Modal open={showResetConfirm}>
                <h3>Скидання гри</h3>
                <p>Ви дійсно бажаєте скинути поточний прогрес? Це неможливо скасувати.</p>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Button onClick={handleConfirmReset} variant={BUTTON_STATES.DECLINE}>
                        Так
                    </Button>
                    <Button onClick={handleCancelReset} variant={BUTTON_STATES.ACCEPT}>
                        Ні
                    </Button>
                </div>
            </Modal>

            <Modal open={isGameOver && !showResetConfirm}>
                <h2 style={{ color: isWin ? 'var(--success-color)' : 'var(--danger-color)' }}>
                    {isWin ? 'Перемога!' : 'Поразка'}
                </h2>

                <p>
                    {isWin
                        ? 'Ви знищили ворожий флот!'
                        : 'У вас закінчились торпеди.'}
                </p>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button onClick={() =>
                            onEndGame({
                                shots: settings.shots - shotsLeft,
                                shipsLeft: shipsLeft,
                                status: status
                            })} variant={BUTTON_STATES.PRIMARY}>
                        Статистика
                    </Button>

                    <Button onClick={restartGame} variant={BUTTON_STATES.SECONDARY}>
                        {isWin ? 'Повторити' : 'Спробувати ще'}
                    </Button>

                </div>
            </Modal>
        </div>
    );
}