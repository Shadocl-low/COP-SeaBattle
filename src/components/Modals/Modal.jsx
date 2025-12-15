import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import {Button} from "../UI/Button/Button.jsx";

const modalRootEl = document.querySelector('#modal');

export function Modal(props) {
    const { isOpen, children, title, message, actions = [] } = props;

    console.log(`[Modal Component] Rendered with isOpen: ${isOpen}, Title: ${title}`);

    if (!modalRootEl || !isOpen) return null;

    return createPortal(
            <div className={styles.overlay}>
                <div className={styles.content}>
                    {title && <h3>{title}</h3>}
                    {message && <p>{message}</p>}
                    {children}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
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
                </div>
            </div>,
            modalRootEl
        );
}