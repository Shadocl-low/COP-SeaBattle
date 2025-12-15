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
            <div style={{textAlign: 'center'}}>
                <h1 className={styles.title}>BATTLESHIP</h1>
                <p className={styles.description}>
                    Тактична морська стратегія. <br/>
                    Знищи флот супротивника.
                </p>
                <div className={styles.greeting}>
                    Капітан: <strong>{appSettings.playerName}</strong>
                </div>
            </div>

            <div className={styles.menuActions}>
                <Button onClick={handleStart} variant={BUTTON_STATES.PRIMARY}>
                    В БІЙ
                </Button>
                <Button onClick={handleSettings} variant={BUTTON_STATES.SECONDARY}>
                    НАЛАШТУВАННЯ
                </Button>
            </div>
        </div>
    );
}