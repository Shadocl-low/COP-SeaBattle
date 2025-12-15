import { MenuPage } from './pages/MenuPage/MenuPage.jsx';
import { GamePage } from './pages/GamePage/GamePage.jsx';
import { ResultPage } from './pages/ResultPage/ResultPage.jsx';
import {SettingsPage} from "./pages/SettingsPage/SettingsPage.jsx";
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
        <RouterProvider router={router} />
    );
}