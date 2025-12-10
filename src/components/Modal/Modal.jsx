import { createPortal } from "react-dom";
import styles from './Modal.module.css';

const modalRootEl = document.querySelector('#modal');

export function Modal(props) {
    const { open, children } = props;

    if (!modalRootEl) return null;

    return open
        ? createPortal(
            <div className={styles.overlay}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>,
            modalRootEl
        )
        : null;
}