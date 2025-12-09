import { Button } from '../components/UI/Button/Button';

export function ResultPage({ onRestart }) {
    return (
        <div>
            <h2>Перемога!</h2>
            <p>Всі кораблі знищено.</p>
            <Button onClick={onRestart}>Грати знову</Button>
        </div>
    );
}