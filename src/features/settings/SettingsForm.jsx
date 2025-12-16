import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/UI/Button/Button';
import { BUTTON_STATES, DIFFICULTY_LEVELS } from '../../constants';
import { updateSettings, selectSettings } from './settingsSlice';
import styles from './SettingsForm.module.css';

const schema = yup.object({
    difficulty: yup.string().required('Оберіть складність'),
    playerName: yup.string()
        .trim()
        .min(2, 'Мінімум 2 символи')
        .max(15, 'Максимум 15 символів')
        .required('Ім\'я обов\'язкове'),
}).required();

export function SettingsForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentSettings = useSelector(selectSettings);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { ...currentSettings }
    });

    const onSubmit = (data) => {
        dispatch(updateSettings(data));
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <label className={styles.label}>Ім'я гравця</label>
                <input
                    {...register("playerName")}
                    className={styles.input}
                />
                <p className={styles.error}>{errors.playerName?.message}</p>
            </div>

            <div>
                <label className={styles.label}>Складність</label>
                <select {...register("difficulty")} className={styles.input}>
                    {Object.values(DIFFICULTY_LEVELS).map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.label} ({level.shots} постр., {level.ships} кор.)
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.actions}>
                <Button type="button" variant={BUTTON_STATES.SECONDARY} onClick={() => navigate('/')}>
                    Назад
                </Button>
                <Button type="submit" variant={BUTTON_STATES.ACCEPT}>
                    Зберегти
                </Button>
            </div>
        </form>
    );
}