import { createContext, useState, ReactNode } from "react";
import Toast from "@/components/Toast";

interface ToastContextType {
    showMessage: (msg: string, msgType?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [msgType, setmsgType] = useState<string | undefined>(undefined);

    const showMessage = (msg: string, type?: string) => {
        setMessage(msg);
        setmsgType(type);
        setTimeout(() => {
            setMessage(null);
            setmsgType(undefined);
        }, 5000);
    };

    return (
        <ToastContext.Provider value={{ showMessage }}>
            {children}
            {message && <Toast message={message} msgType={msgType} onClose={() => setMessage(null)} />}
        </ToastContext.Provider>
    );
};
