import { Board } from '../components/Board/Board';

export function GamePage(props) {
    const { onEndGame } = props;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
                <span>Пострілів: 0</span>
                <span>Кораблів: 3</span>
            </div>

            <Board />
        </div>
    );
}