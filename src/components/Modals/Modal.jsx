import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import {Button} from "../UI/Button/Button.jsx";

const modalRootEl = document.querySelector('#modal');

export function Modal(props) {
    const { isOpen, children, title, message, actions = [] } = props;

    if (!modalRootEl || !isOpen) return null;

    return createPortal(
        <div className={styles.overlay}>
            <div className={styles.content}>

                {title && <h3 className={styles.title}>{title}</h3>}

                {message && <p className={styles.message}>{message}</p>}

                {children}

                {actions.length > 0 && (
                    <div className={styles.actions}>
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    if (action.handler) action.handler();
                                }}
                                variant={action.variant}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>,
            modalRootEl
        );
}