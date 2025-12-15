import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/UI/Button/Button.jsx';
import {BUTTON_STATES, DEFAULT_CONFIG, DIFFICULTY_LEVELS} from '../../constants.js';
import {useNavigate} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import styles from './SettingsPage.module.css';

const schema = yup.object({
    difficulty: yup.string().required('Будь ласка, оберіть складність'),
    playerName: yup.string().min(5, 'Ім\'я має бути довше 2 символів').required('Ім\'я обов\'язкове'),
}).required();

export function SettingsPage() {
    const navigate = useNavigate();

    const [currentSettings, setAppSettings] = useLocalStorage('battleship-settings', {
        difficulty: DEFAULT_CONFIG.DIFFICULTY,
        playerName: 'Player'
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            difficulty: currentSettings.difficulty,
            playerName: currentSettings.playerName,
        }
    });

    const onSubmit = (data) => {
        setAppSettings(prev => ({ ...prev, ...data }));
        navigate('/');
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Конфігурація</h2>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Позивний (Ім'я)</label>
                    <input {...register("playerName")} className={styles.input} />
                    <p className={styles.error}>{errors.playerName?.message}</p>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Рівень загрози</label>
                    <select {...register("difficulty")} className={styles.input}>
                        {Object.values(DIFFICULTY_LEVELS).map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.label} (Пострілів: {level.shots})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.actions}>
                    <Button type="button" variant={BUTTON_STATES.SECONDARY} onClick={() => navigate('/')}>
                        Скасувати
                    </Button>
                    <Button type="submit" variant={BUTTON_STATES.ACCEPT}>
                        Зберегти
                    </Button>
                </div>
            </form>
        </div>
    );
}