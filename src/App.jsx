import styles from './App.module.css';
import { MenuPage } from './pages/MenuPage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage/ResultPage.jsx';
import {SettingsPage} from "./pages/SettingsPage.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {Template} from "./pages/Template/Template.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                index: true,
                element: <MenuPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "game/:userId",
                element: <GamePage />,
            },
            {
                path: "result",
                element: <ResultPage />,
            },
            {
                path: "*",
                element: <Navigate to="/" replace />
            }
        ]
    }
]);

export default function App() {
    return (
        <div className={styles.container}>
            <RouterProvider router={router} />
        </div>
    );
}