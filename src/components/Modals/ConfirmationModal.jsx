import { Modal } from './Modal';
import { Button } from '../UI/Button/Button';
import { BUTTON_STATES } from '../../constants';

export function ConfirmationModal(props) {
    const { isOpen, onClose, onConfirm, title = "Ви впевнені?", message, confirmLabel = "Так", cancelLabel = "Ні" } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} message={message}
            actions={[
                {
                    label: confirmLabel,
                    variant: BUTTON_STATES.DECLINE,
                    handler: onConfirm
                },
                {
                    label: cancelLabel,
                    variant: BUTTON_STATES.SECONDARY,
                    handler: onClose
                }
            ]}
        >
        </Modal>
    );
}