import { Cell } from '../Cell/Cell';
import styles from './Board.module.css';

export function Board(props) {
    const { cells, onCellClick } = props;

    return (
        <div className={styles.board}>
            {cells.map((cell) => (
                <Cell
                    key={cell.id}
                    id={cell.id}
                    status={cell.status}
                    onClick={onCellClick}
                />
            ))}
        </div>
    );
}