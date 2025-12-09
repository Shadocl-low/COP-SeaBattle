import styles from './Cell.module.css';
import { CELL_STATE } from "../../constants.js";

const CELL_ICONS = {
    [CELL_STATE.HIT]: 'X',
    [CELL_STATE.MISS]: '•',
    [CELL_STATE.EMPTY]: '',
    [CELL_STATE.SHIP]: ''
};

export function Cell(props) {
    const { id, status, onClick } = props;
    const cellContent = CELL_ICONS[status];

    return (
        <div
            className={`${styles.cell} ${styles[status]}`}
            onClick={() => onClick(id)}
        >
            {cellContent}
        </div>
    );
}