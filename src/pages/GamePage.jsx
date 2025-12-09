import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";
import { BUTTON_STATES } from "../constants.js";

const TOTAL_SHIPS = 3;
const MAX_SHOTS = 15;

export function GamePage(props) {
    const { onEndGame } = props;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                <span>Пострілів: {MAX_SHOTS}</span>
                <span>Кораблів: {TOTAL_SHIPS}</span>
            </div>

            <Board />

            <Button variant={BUTTON_STATES.SECONDARY} onClick={onEndGame}>
                Здатися
            </Button>
        </div>
    );
}