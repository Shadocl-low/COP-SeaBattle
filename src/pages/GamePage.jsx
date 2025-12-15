import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";
import {BUTTON_STATES, GAME_STATUS, PAGE} from "../constants.js";
import {useGameLogic} from "../hooks/useGameLogic.jsx";
import {useEffect} from "react";
import { Modal } from "../components/Modals/Modal";
import {useModal} from "../hooks/useModal.jsx";
import {ConfirmationModal} from "../components/Modals/ConfirmationModal.jsx";

const END_GAME_MODAL_TEXT = {
    [GAME_STATUS.WON]: {
        title: 'Перемога!',
        message: 'Ви знищили ворожий флот!'
    },
    [GAME_STATUS.LOST]: {
        title: 'Поразка',
        message: 'У вас закінчились торпеди.'
    },
    [GAME_STATUS.PLAYING]: {
        title: 'Гра триває',
        message: 'Не здавайтесь.'
    }
}

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
        if (status !== GAME_STATUS.PLAYING) {
            endGameModal.open();
        }
        else {
            endGameModal.close();
        }
    }, [endGameModal, status]);

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
                title={END_GAME_MODAL_TEXT[status].title}
                message={END_GAME_MODAL_TEXT[status].message}
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
                            label: 'Повторити',
                            variant: BUTTON_STATES.SECONDARY,
                            handler: () => {
                                restartGame();
                            }
                        }
                    ]
                }
            >
            </Modal>
        </div>
    );
}