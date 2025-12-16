import styles from './SettingsPage.module.css';
import {SettingsForm} from "../../features/settings/SettingsForm.jsx";

export function SettingsPage() {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Конфігурація</h2>
            <SettingsForm />
        </div>
    );
}