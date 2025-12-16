import { createSlice } from '@reduxjs/toolkit';

const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        lastGame: null,
        history: []
    },
    reducers: {
        recordResult: (state, action) => {
            state.lastGame = action.payload;
            state.history.unshift(action.payload);
        }
    }
});

export const { recordResult } = resultsSlice.actions;
export const selectLastResult = (state) => state.results.lastGame;
export default resultsSlice.reducer;