import { Button } from '../../components/UI/Button/Button.jsx';
import {useNavigate} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import {BUTTON_STATES} from "../../constants.js";
import styles from './MenuPage.module.css';

export function MenuPage() {
    const navigate = useNavigate();

    const [appSettings] = useLocalStorage('battleship-settings', {
        playerName: 'Player'
    });

    const handleStart = () => {
        navigate(`/game/${appSettings.playerName}`);
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Морський Бій</h1>
            <p className={styles.description}>Знищи кораблі супротивника на полі 5x5</p>
            <p className={styles.greeting}>Гравець {appSettings.playerName}</p>
            <div className={styles.actions}>
                <Button onClick={handleStart} variant={BUTTON_STATES.PRIMARY}>
                    Почати гру
                </Button>
                <Button onClick={handleSettings} variant={BUTTON_STATES.SECONDARY}>
                    Налаштування
                </Button>
            </div>
        </div>
    );
}