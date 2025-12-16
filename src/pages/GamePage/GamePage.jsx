import { Board } from '../../components/Board/Board.jsx';
import { Button } from "../../components/UI/Button/Button.jsx";
import {
    BUTTON_STATES,
    DEFAULT_CONFIG,
    DIFFICULTY_LEVELS,
    END_GAME_MODAL_TEXT,
    GAME_STATUS
} from "../../constants.js";
import {useCallback, useEffect} from "react";
import { Modal } from "../../components/Modals/Modal.jsx";
import {useModal} from "../../hooks/useModal.jsx";
import {ConfirmationModal} from "../../components/Modals/ConfirmationModal.jsx";
import {useNavigate, useParams} from "react-router";
import styles from './GamePage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectDiffConf} from "../../features/settings/settingsSlice.js";
import {initGame, clickCell, selectGameplay} from "../../features/gameplay/gameplaySlice.js";
import {generateBoard} from "../../utils/boardGenerator.js";

export function GamePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const difficultyConfig = useSelector(selectDiffConf);

    const { board, shotsLeft, shipsLeft, status } = useSelector(selectGameplay);

    const resetModal = useModal();
    const endGameModal = useModal();

    const startGame = useCallback(() => {
        const newBoard = generateBoard(difficultyConfig.ships, DEFAULT_CONFIG.BOARD_SIZE);

        dispatch(initGame({
            board: newBoard,
            shots: difficultyConfig.shots,
            ships: difficultyConfig.ships
        }));
    }, [difficultyConfig, dispatch]);

    useEffect(() => {
        startGame();
    }, [startGame]);

    useEffect(() => {
        if (status !== GAME_STATUS.PLAYING) {
            endGameModal.open();
        }
        else {
            endGameModal.close();
        }
    }, [endGameModal, status]);

    const handleCellClick = (id) => {
        dispatch(clickCell(id));
    };

    const handleRestart = () => {
        resetModal.close();
        startGame();
    };

    const handleResult = () => {
        navigate('/result', {
            state: {
                shots: difficultyConfig.shots - shotsLeft,
                shipsLeft: shipsLeft,
                status: status,
                userId: userId
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.hud}>
                <div className={styles.statGroup}>
                    <span className={styles.label}>Гравець</span>
                    <span className={styles.value} style={{ color: 'white' }}>{userId}</span>
                </div>
                <div className={styles.statGroup}>
                    <span className={styles.label}>Торпеди</span>
                    <span className={styles.value}>{shotsLeft}</span>
                </div>
                <div className={styles.statGroup}>
                    <span className={styles.label}>Цілі</span>
                    <span className={styles.value} style={{ color: '#f472b6' }}>{shipsLeft}</span>
                </div>
            </div>

            <Board cells={board} onCellClick={handleCellClick} />

            <div className={styles.controls}>
                <Button variant={BUTTON_STATES.DECLINE} onClick={resetModal.open}>
                    Перезапуск
                </Button>
                <Button variant={BUTTON_STATES.SECONDARY} onClick={() => navigate('/')}>
                    Меню
                </Button>
            </div>

            <ConfirmationModal
                isOpen={resetModal.isOpen}
                onClose={resetModal.close}
                onConfirm={handleRestart}
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
                            handler: () => handleRestart()
                        }
                    ]
                }
            >
            </Modal>
        </div>
    );
}