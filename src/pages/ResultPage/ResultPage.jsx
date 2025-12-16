import { Button } from "../../components/UI/Button/Button";
import styles from './ResultPage.module.css';
import {BUTTON_STATES, END_GAME_MODAL_TEXT} from "../../constants.js";
import {useNavigate} from "react-router";
import {selectLastResult, selectListResult} from "../../features/results/resultsSlice.js";
import {useSelector} from "react-redux";

export function ResultPage() {
    const navigate = useNavigate();

    const result = useSelector(selectLastResult);
    const history = useSelector(selectListResult);
    if (!result) {
        return (
            <div className={styles.container}>
                <h2>Немає результатів</h2>
                <p style={{color: '#aaa'}}>Дані про гру зникли після перезавантаження.</p>
                <Button onClick={() => navigate('/')}>В меню</Button>
            </div>
        );
    }
    const { shots = 0, shipsLeft = 0, status, userId } = result;

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

            {history.length > 0 && (
                <div>
                    <h3>Історія ігор</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Гравець</th>
                            <th>Статус</th>
                            <th>Постріли</th>
                            <th>Кораблі</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.map((game, index) => (
                            <tr key={index}>
                                <td>{game.userId}</td>
                                <td style={{
                                    color: game.status === 'won' ? '#4ade80' : '#f87171'
                                }}>
                                    {game.status === 'won' ? 'Перемога' : 'Поразка'}
                                </td>
                                <td>{game.shots}</td>
                                <td>{game.shipsLeft}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>


    );
}