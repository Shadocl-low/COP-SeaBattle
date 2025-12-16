import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from "./features/settings/settingsSlice";
import gameplayReducer from "./features/gameplay/gameplaySlice";
import resultsSlice from "./features/results/resultsSlice";
import {settingsMiddleware} from "./features/settings/settingsMiddleware";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        gameplay: gameplayReducer,
        results: resultsSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(settingsMiddleware),
});