import { createSlice } from '@reduxjs/toolkit';
import { GAME_STATUS, CELL_STATE } from '../../constants';

const initialState = {
    board: [],
    shotsLeft: 0,
    shipsLeft: 0,
    status: GAME_STATUS.PLAYING,
};

const gameplaySlice = createSlice({
    name: 'gameplay',
    initialState: initialState,
    reducers: {
        initGame: (state, action) => {
            const { board, shots, ships } = action.payload;
            state.board = board;
            state.shotsLeft = shots;
            state.shipsLeft = ships;
            state.status = GAME_STATUS.PLAYING;
        },

        clickCell: (state, action) => {
            const cellId = action.payload;
            const cell = state.board[cellId];

            if (state.status !== GAME_STATUS.PLAYING) return;
            if (cell.status !== CELL_STATE.EMPTY && cell.status !== CELL_STATE.SHIP) return;

            state.shotsLeft -= 1;

            if (cell.hasShip) {
                cell.status = CELL_STATE.HIT;
                state.shipsLeft -= 1;
            } else {
                cell.status = CELL_STATE.MISS;
            }

            if (state.shipsLeft === 0) {
                state.status = GAME_STATUS.WON;
            } else if (state.shotsLeft === 0) {
                state.status = GAME_STATUS.LOST;
            }
        },
    }
});

export const { initGame, clickCell, resetGame } = gameplaySlice.actions;

export const selectGameplay = (state) => state.gameplay;

export default gameplaySlice.reducer;