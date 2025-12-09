import { Button } from '../components/UI/Button/Button';

export function MenuPage({ onStart }) {
    return (
        <div>
            <h1>Морський Бій</h1>
            <p>Знищи 3 кораблі супротивника на полі 5x5</p>
            <Button onClick={onStart}>Почати гру</Button>
        </div>
    );
}