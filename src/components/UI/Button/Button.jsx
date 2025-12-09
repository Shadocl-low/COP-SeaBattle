import styles from './Button.module.css';
import { BUTTON_STATES } from "../../../constants.js";

export function Button(props) {
    const { children, onClick, variant = [BUTTON_STATES.PRIMARY], disabled } = props;

    const className = `${styles.button} ${styles[variant]}`;

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}