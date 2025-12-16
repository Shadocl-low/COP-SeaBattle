import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from "./features/settings/settingsSlice";
import {settingsMiddleware} from "./features/settings/settingsMiddleware";

export const store = configureStore({
    reducer: {
        settings: settingsReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(settingsMiddleware),
});