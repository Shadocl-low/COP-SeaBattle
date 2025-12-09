import styles from './Board.module.css';
import { useState } from 'react';
import { Cell } from '../Cell/Cell';
import { CELL_STATE } from "../../constants.js";

export function Board(props) {
    const [cells] = useState(
        Array.from({ length: 25 }, (_, i) => ({ id: i, status: [CELL_STATE.EMPTY] }))
    );

    const handleCellClick = (id) => {
        console.log(`Cell clicked: ${id}`);
    };

    return (
        <div className={styles.board}>
            {cells.map((cell) => (
                <Cell
                    key={cell.id}
                    id={cell.id}
                    status={cell.status}
                    onClick={handleCellClick}
                />
            ))}
        </div>
    );
}