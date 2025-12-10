import { Button } from "../../components/UI/Button/Button";
import styles from './ResultPage.module.css';
import {BUTTON_STATES, GAME_STATUS} from "../../constants.js";

export function ResultPage(props) {
    const { onRestart, shots = 0, shipsLeft = 0, status } = props;

    const isWin = status === GAME_STATUS.WON;

    const titleClass = `${styles.title} ${isWin ? styles.win : styles.lose}`;

    return (
        <div className={styles.container}>

            <h2 className={titleClass}>
                {isWin ? 'Перемога!' : 'Поразка'}
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
                {isWin
                    ? 'Ворожий флот знищено'
                    : 'Спробуйте ще раз'}
            </p>

            <Button onClick={onRestart} variant={isWin ? BUTTON_STATES.ACCEPT : BUTTON_STATES.PRIMARY}>
                Грати знову
            </Button>
        </div>
    );
}