import { useContext } from "react";
import { ToastNotificationContext } from "@components/ToastNotification/ToastNotificationContext";

export function useToastNotification() {
    const addToast = useContext(ToastNotificationContext);

    if (!addToast) {
        throw new Error("useToastNotification must be used within a ToastNotificationProvider");
    }

    return addToast;
}