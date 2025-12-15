import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";
import {BUTTON_STATES, GAME_STATUS, PAGE} from "../constants.js";
import {useGameLogic} from "../hooks/useGameLogic.jsx";
import {useEffect} from "react";
import { Modal } from "../components/Modals/Modal";
import {useModal} from "../hooks/useModal.jsx";
import {ConfirmationModal} from "../components/Modals/ConfirmationModal.jsx";

export function GamePage(props) {
    const resetModal = useModal();
    const endGameModal = useModal();

    const { onEndGame, onBackToMenu, settings } = props;
    const {
        board,
        shotsLeft,
        shipsLeft,
        status,
        handleCellClick,
        restartGame
    } = useGameLogic(settings);

    useEffect(() => {
        console.log(`[GamePage Effect] Status: ${status}`);

        if (status !== GAME_STATUS.PLAYING) {
            endGameModal.open();
        }
    }, [endGameModal, status]);

    const isWin = status === GAME_STATUS.WON;

    const handleConfirmReset = () => {
        restartGame();
        resetModal.close();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                <span>Пострілів: {shotsLeft}</span>
                <span>Кораблів: {shipsLeft}</span>
            </div>

            <Board cells={board} onCellClick={handleCellClick} />

            <Button variant={BUTTON_STATES.DECLINE} onClick={resetModal.open}>
                Скинути
            </Button>

            <Button variant={BUTTON_STATES.PRIMARY} onClick={onBackToMenu}>
                Меню
            </Button>

            <ConfirmationModal
                isOpen={resetModal.isOpen}
                onClose={resetModal.close}
                onConfirm={handleConfirmReset}
                title="Скидання гри"
                message="Ви дійсно хочете скинути гру?"
            />

            <Modal
                isOpen={endGameModal.isOpen}
                onClose={endGameModal.close}
                title={isWin ? 'Перемога!' : 'Поразка'}
                message={isWin ? 'Ви знищили ворожий флот!' : 'У вас закінчились торпеди.'}
                actions={
                    [
                        {
                            label: "Статистика",
                            variant: BUTTON_STATES.PRIMARY,
                            handler: () => onEndGame({
                                shots: settings.shots - shotsLeft,
                                shipsLeft: shipsLeft,
                                status: status
                            })
                        },
                        {
                            label: isWin ? 'Повторити' : 'Спробувати ще',
                            variant: BUTTON_STATES.SECONDARY,
                            handler: () => {
                                restartGame();
                                endGameModal.close();
                            }
                        }
                    ]
                }
            >
            </Modal>
        </div>
    );
}