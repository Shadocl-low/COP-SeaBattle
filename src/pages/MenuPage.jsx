import { Button } from '../components/UI/Button/Button';
import {useNavigate} from "react-router";
import {useLocalStorage} from "../hooks/useLocalStorage.jsx";
import {BUTTON_STATES} from "../constants.js";

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
        <div>
            <h1>Морський Бій</h1>
            <p>Знищи кораблі супротивника на полі 5x5</p>
            <p>Гравець {appSettings.playerName}</p>
            <Button onClick={handleStart} variant={BUTTON_STATES.PRIMARY}>Почати гру</Button>
            <Button onClick={handleSettings} variant={BUTTON_STATES.SECONDARY}>Налаштування</Button>
        </div>
    );
}