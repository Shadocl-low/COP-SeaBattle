import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";
import {BUTTON_STATES, DEFAULT_CONFIG, DIFFICULTY_LEVELS, GAME_STATUS, PAGE} from "../constants.js";
import {useGameLogic} from "../hooks/useGameLogic.jsx";
import {useEffect} from "react";
import { Modal } from "../components/Modals/Modal";
import {useModal} from "../hooks/useModal.jsx";
import {ConfirmationModal} from "../components/Modals/ConfirmationModal.jsx";
import {useNavigate, useParams} from "react-router";
import {useLocalStorage} from "../hooks/useLocalStorage.jsx";

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

export function GamePage() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [appSettings] = useLocalStorage('battleship-settings', {
        difficulty: DEFAULT_CONFIG.DIFFICULTY
    });

    const currentDifficultyConfig = DIFFICULTY_LEVELS[appSettings.difficulty] || DIFFICULTY_LEVELS.EASY;

    const resetModal = useModal();
    const endGameModal = useModal();

    const {
        board,
        shotsLeft,
        shipsLeft,
        status,
        handleCellClick,
        restartGame
    } = useGameLogic(currentDifficultyConfig);

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

    const handleResult = () => {
        navigate('/result', {
            state: {
                shots: currentDifficultyConfig.shots - shotsLeft,
                shipsLeft: shipsLeft,
                status: status,
                userId: userId
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
                <span>Гравець: {userId}</span>
                <span>Пострілів: {shotsLeft}</span>
                <span>Кораблів: {shipsLeft}</span>
            </div>

            <Board cells={board} onCellClick={handleCellClick} />

            <Button variant={BUTTON_STATES.DECLINE} onClick={resetModal.open}>
                Скинути
            </Button>

            <Button variant={BUTTON_STATES.PRIMARY} onClick={() => navigate('/')}>
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
                            handler: () => handleResult()
                        },
                        {
                            label: 'Повторити',
                            variant: BUTTON_STATES.SECONDARY,
                            handler: () => restartGame()
                        }
                    ]
                }
            >
            </Modal>
        </div>
    );
}