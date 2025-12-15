import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../components/UI/Button/Button';
import {BUTTON_STATES, DIFFICULTY_LEVELS} from '../constants';

const schema = yup.object({
    difficulty: yup.string().required('Будь ласка, оберіть складність'),
    playerName: yup.string().min(5, 'Ім\'я має бути довше 2 символів').required('Ім\'я обов\'язкове'),
}).required();

export function SettingsPage({ currentSettings, onSave, onBack }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            difficulty: currentSettings.difficulty,
            playerName: currentSettings.playerName || 'Player',
        }
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <div>
            <h2>Налаштування</h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>

                <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Ім'я гравця</label>
                    <input
                        {...register("playerName")}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #475569',
                            background: '#0f172a',
                            color: 'white'
                        }}
                    />
                    <p style={{ color: 'var(--danger-color)', fontSize: '0.8rem', margin: '5px 0 0' }}>{errors.playerName?.message}</p>
                </div>

                <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Складність</label>
                    <select
                        {...register("difficulty")}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #475569',
                            background: '#0f172a',
                            color: 'white'
                        }}
                    >
                        {Object.values(DIFFICULTY_LEVELS).map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.label} (Пострілів: {level.shots}, Кораблів: {level.ships})
                            </option>
                        ))}
                    </select>
                    <p style={{ color: 'var(--danger-color)', fontSize: '0.8rem', margin: '5px 0 0' }}>{errors.difficulty?.message}</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Button type="button" variant={BUTTON_STATES.SECONDARY} onClick={onBack}>Назад</Button>
                    <Button type="submit" variant={BUTTON_STATES.ACCEPT}>Зберегти</Button>
                </div>
            </form>
        </div>
    );
}