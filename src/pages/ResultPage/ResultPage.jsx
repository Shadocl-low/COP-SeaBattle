import { Button } from "../../components/UI/Button/Button";
import styles from './ResultPage.module.css';
import {BUTTON_STATES, END_GAME_MODAL_TEXT, GAME_STATUS} from "../../constants.js";
import {useLocation, useNavigate} from "react-router";

export function ResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { shots = 0, shipsLeft = 0, status, userId } = location.state || {};

    const titleClass = `${styles.title} ${styles[status]}`;

    const handleRestart = () => {
        if (userId) {
            navigate(`/game/${userId}`);
        } else {
            navigate('/');
        }
    };

    if (!status) {
        return (
            <div className={styles.container}>
                <h2>Немає результатів</h2>
                <Button onClick={() => navigate('/')}>В меню</Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>

            <h2 className={titleClass}>
                {END_GAME_MODAL_TEXT[status].title}
            </h2>

            <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Пострілів</span>
                    <span className={styles.statValue}>{shots}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Залишилось</span>
                    <span className={styles.statValue}>{shipsLeft}</span>
                </div>
            </div>

            <p className={styles.message}>
                {END_GAME_MODAL_TEXT[status].message}
            </p>

            <Button onClick={() => handleRestart()} variant={BUTTON_STATES.PRIMARY}>
                Грати знову
            </Button>

            <Button onClick={() => navigate('/')} variant={BUTTON_STATES.SECONDARY}>
                В меню
            </Button>
        </div>
    );
}