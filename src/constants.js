export const CELL_STATE = {
    EMPTY: 'empty',
    SHIP: 'ship',
    HIT: 'hit',
    MISS: 'miss'
};

export const BUTTON_STATES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ACCEPT: 'accept',
    DECLINE: 'decline'
};

export const PAGE = {
    MENU: 'menu',
    GAME: 'game',
    RESULT: 'result',
    SETTINGS: 'settings'
};

export const DIFFICULTY_LEVELS = {
    EASY: { label: 'Легкий', shots: 23, ships: 3 },
    MEDIUM: { label: 'Середній', shots: 19, ships: 4 },
    HARD: { label: 'Важкий', shots: 15, ships: 5 }
};

export const DEFAULT_CONFIG = {
    BOARD_SIZE: 25,
    DIFFICULTY: 'EASY'
};

export const GAME_STATUS = {
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost'
};