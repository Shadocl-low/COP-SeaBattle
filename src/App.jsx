import styles from './App.module.css';
import { useState } from 'react';
import { MenuPage } from './pages/MenuPage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage/ResultPage.jsx';
import {GAME_CONFIG, PAGE} from './constants.js';

export default function App() {
    const [currentPage, setCurrentPage] = useState(PAGE.MENU);

    const [gameResult, setGameResult] = useState({
        shots: GAME_CONFIG.MAX_SHOTS,
        shipsLeft: GAME_CONFIG.TOTAL_SHIPS
    });

    const handleGameEnd = (resultData) => {
        setGameResult(resultData);
        setCurrentPage(PAGE.RESULT);
    };

    return (
        <div className={styles.container}>
            {currentPage === PAGE.MENU && (
                <MenuPage onStart={() => setCurrentPage(PAGE.GAME)} />
            )}

            {currentPage === PAGE.GAME && (
                <GamePage onEndGame={handleGameEnd} />
            )}

            {currentPage === PAGE.RESULT && (
                <ResultPage
                    shots={gameResult.shots}
                    shipsLeft={gameResult.shipsLeft}
                    onRestart={() => setCurrentPage(PAGE.GAME)}
                />
            )}
        </div>
    );
}