import { createSlice } from '@reduxjs/toolkit';
import {DEFAULT_CONFIG, DIFFICULTY_LEVELS, LOCAL_STORAGE} from '../../constants';

const loadSettings = () => {
    try {
        const settingsData = localStorage.getItem(LOCAL_STORAGE.SETTINGS);
        if (settingsData === null) {
            return {
                difficulty: DEFAULT_CONFIG.DIFFICULTY,
                playerName: 'Player'
            };
        }
        return JSON.parse(settingsData);
    } catch (err) {
        return {
            difficulty: DEFAULT_CONFIG.DIFFICULTY,
            playerName: 'Player'
        };
    }
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: loadSettings(),
    reducers: {
        updateSettings: (state, action) => {
            state.playerName = action.payload.playerName;
            state.difficulty = action.payload.difficulty;
        }
    }
});

export const { updateSettings } = settingsSlice.actions;
export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;