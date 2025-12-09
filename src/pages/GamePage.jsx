import { Board } from '../components/Board/Board';
import { Button } from "../components/UI/Button/Button";

export function GamePage(props) {
    const { onEndGame } = props;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                <span>Пострілів: 0</span>
                <span>Кораблів: 3</span>
            </div>

            <Board />

            <Button variant="secondary" onClick={onEndGame}>
                Здатися
            </Button>
        </div>
    );
}