import { useState, useCallback, useRef } from "react";
import { ToastNotificationContext } from "./ToastNotificationContext";
import ToastNotificationsContainer from "./ToastNotificationsContainer";

export default function ToastNotificationProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const idCounter = useRef(0);

    const addToast = useCallback((message, type = "info", duration = 3) => {
        const id = `toast-${idCounter.current++}`;
        setToasts((prev) => [{ id, message, type, duration }, ...prev]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration * 1000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastNotificationContext.Provider value={addToast}>
            {children}
            <ToastNotificationsContainer toasts={toasts} removeToast={removeToast} />
        </ToastNotificationContext.Provider>
    );
}
