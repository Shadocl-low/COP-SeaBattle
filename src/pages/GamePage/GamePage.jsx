import { Board } from '../../components/Board/Board.jsx';
import { Button } from "../../components/UI/Button/Button.jsx";
import {
    BUTTON_STATES,
    DEFAULT_CONFIG,
    DIFFICULTY_LEVELS,
    END_GAME_MODAL_TEXT,
    GAME_STATUS
} from "../../constants.js";
import {useGameLogic} from "../../hooks/useGameLogic.jsx";
import {useEffect} from "react";
import { Modal } from "../../components/Modals/Modal.jsx";
import {useModal} from "../../hooks/useModal.jsx";
import {ConfirmationModal} from "../../components/Modals/ConfirmationModal.jsx";
import {useNavigate, useParams} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import styles from './GamePage.module.css';

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
        <div className={styles.container}>
            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Гравець</span>
                    <span className={styles.statValue}>{userId}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Пострілів</span>
                    <span className={styles.statValue}>{shotsLeft}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Кораблів</span>
                    <span className={styles.statValue}>{shipsLeft}</span>
                </div>
            </div>

            <Board cells={board} onCellClick={handleCellClick} />

            <div className={styles.controls}>
                <Button variant={BUTTON_STATES.DECLINE} onClick={resetModal.open}>
                    Скинути
                </Button>
                <Button variant={BUTTON_STATES.PRIMARY} onClick={() => navigate('/')}>
                    Меню
                </Button>
            </div>

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