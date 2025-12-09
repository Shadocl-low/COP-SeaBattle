import styles from './App.module.css';
import { useState } from 'react';
import { StartPage } from './pages/MenuPage';
import { GamePage } from './pages/GamePage';
import { PAGE } from './constants.js';

export default function App() {
    const [currentPage, setCurrentPage] = useState(PAGE.MENU);

    return (
        <div className={styles.container}>
            {currentPage === PAGE.MENU && (
                <StartPage onStart={() => setCurrentPage(PAGE.GAME)} />
            )}

            {currentPage === PAGE.GAME && (
                <GamePage onEndGame={() => setCurrentPage('results')} />
            )}
        </div>
    );
}