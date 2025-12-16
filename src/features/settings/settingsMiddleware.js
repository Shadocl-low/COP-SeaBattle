import {LOCAL_STORAGE} from "../../constants.js";

export const settingsMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    if (action.type?.startsWith('settings/')) {
        const state = store.getState();

        localStorage.setItem(LOCAL_STORAGE.SETTINGS, JSON.stringify(state.settings));
    }

    return result;
};