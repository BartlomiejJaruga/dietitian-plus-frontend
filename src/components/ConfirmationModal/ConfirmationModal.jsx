import styles from './ConfirmationModal.module.scss';

import { useEffect } from 'react';

export default function ConfirmationModal({ 
    isOpen,
    message = "Are you sure?", 
    messageToHighlight = null,
    onConfirm, 
    onCancel 
}) {
    useEffect(() => {
        // disabling scrolling of whole site
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const renderMessage = () => {
        if (!messageToHighlight || !message.includes(messageToHighlight)) {
            return <>{message}</>;
        }

        const [before, after] = message.split(messageToHighlight);
        return (
            <>
                {before}
                <span className={styles.highlight}>{messageToHighlight}</span>
                {after}
            </>
        );
    }; 

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <p>{renderMessage()}</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
