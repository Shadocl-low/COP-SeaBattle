import styles from './App.module.css';
import { useState } from 'react';
import { MenuPage } from './pages/MenuPage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage';
import { PAGE } from './constants.js';

export default function App() {
    const [currentPage, setCurrentPage] = useState(PAGE.MENU);

    return (
        <div className={styles.container}>
            {currentPage === PAGE.MENU && (
                <MenuPage onStart={() => setCurrentPage(PAGE.GAME)} />
            )}

            {currentPage === PAGE.GAME && (
                <GamePage onEndGame={() => setCurrentPage(PAGE.RESULT)} />
            )}

            {currentPage === PAGE.RESULT && (
                <ResultPage onRestart={() => setCurrentPage(PAGE.GAME)} />
            )}
        </div>
    );
}