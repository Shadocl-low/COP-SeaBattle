import styles from './App.module.css';
import { useState } from 'react';
import { MenuPage } from './pages/MenuPage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage/ResultPage.jsx';
import {DEFAULT_CONFIG, DIFFICULTY_LEVELS, PAGE} from './constants.js';
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
import {SettingsPage} from "./pages/SettingsPage.jsx";

export default function App() {
    const [currentPage, setCurrentPage] = useState(PAGE.MENU);

    const [appSettings, setAppSettings] = useLocalStorage('battleship-settings', {
        difficulty: DEFAULT_CONFIG.DIFFICULTY,
        playerName: 'Player'
    });

    const handleSaveSettings = (newSettings) => {
        setAppSettings(prev => ({ ...prev, ...newSettings }));
        setCurrentPage(PAGE.MENU);
    };

    const currentDifficultyConfig = DIFFICULTY_LEVELS[appSettings.difficulty] || DIFFICULTY_LEVELS.EASY;

    const [gameResult, setGameResult] = useState({
        shots: 0,
        shipsLeft: 0
    });

    const handleGameEnd = (resultData) => {
        setGameResult(resultData);
        setCurrentPage(PAGE.RESULT);
    };

    return (
        <div className={styles.container}>
            {currentPage === PAGE.MENU && (
                <MenuPage
                    onStart={() => setCurrentPage(PAGE.GAME)}
                    onSettings={() => setCurrentPage(PAGE.SETTINGS)}
                />
            )}

            {currentPage === PAGE.SETTINGS && (
                <SettingsPage
                    currentSettings={appSettings}
                    onSave={handleSaveSettings}
                    onBack={() => setCurrentPage(PAGE.MENU)}
                />
            )}

            {currentPage === PAGE.GAME && (
                <GamePage
                    settings={currentDifficultyConfig}
                    onEndGame={handleGameEnd}
                    onBackToMenu={() => setCurrentPage(PAGE.MENU)}
                />
            )}

            {currentPage === PAGE.RESULT && (
                <ResultPage
                    shots={gameResult.shots}
                    shipsLeft={gameResult.shipsLeft}
                    onRestart={() => setCurrentPage(PAGE.GAME)}
                    status={gameResult.status}
                />
            )}
        </div>
    );
}