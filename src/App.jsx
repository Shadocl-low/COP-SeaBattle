import { useState } from 'react';
import { GamePage } from './pages/GamePage';
import styles from './App.module.css';

export default function App() {
    // Стан для перемикання "сторінок" (плейсхолдер роутингу)
    const [currentPage, setCurrentPage] = useState('game');

    return (
        <div className={styles.container}>
            {currentPage === 'game' && (
                <GamePage onEndGame={() => setCurrentPage('results')} />
            )}
        </div>
    );
}