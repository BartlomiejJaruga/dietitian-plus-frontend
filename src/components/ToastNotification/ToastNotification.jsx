import styles from "./ToastNotification.module.scss";
import { toastNotificationTypesENUM } from "@enums";

export default function ToastNotification({ message, type, onClose }) {
    const toastHeader = {
        [toastNotificationTypesENUM.ERROR]: "ERROR",
        [toastNotificationTypesENUM.SUCCESS]: "SUCCESS",
        [toastNotificationTypesENUM.WARNING]: "WARNING",
        [toastNotificationTypesENUM.INFO]: "INFO",
    }

    return (
        <div className={`${styles.toast} ${styles[type] || ''}`}>
            <div className={styles.title_and_message_container}>
                <h4>{toastHeader[type]}</h4>
                <span>{message}</span>
            </div>
            <button onClick={onClose} className={styles.closeButton}>
                ✕
            </button>
        </div>
    );
}
