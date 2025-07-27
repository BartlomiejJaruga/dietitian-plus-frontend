import ToastNotification from "./ToastNotification";
import styles from "./ToastNotificationsContainer.module.scss";

export default function ToastNotificationsContainer({ toasts, removeToast }) {
    return (
        <div className={styles.container}>
            {toasts.map((toast) => (
                <ToastNotification key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}
