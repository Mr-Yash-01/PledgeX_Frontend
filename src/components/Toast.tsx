import { useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface ToastProps {
    message: string;
    onClose: () => void;
    msgType?: "info" | "warning" | "alert"; // Optional type prop with specific values
}

const Toast: React.FC<ToastProps> = ({ message, onClose, msgType = "info" }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 600000); // Hide after 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);


    return (
        (msgType === "info") ? (
            <div className={`fixed max-w-72 bottom-3/4 left-5 flex justify-center items-center gap-2 border border-green-800 bg-black px-4 py-2 rounded-lg shadow-lg animate-fadeIn`}>
                <FaInfoCircle /> {message}
            </div>
        ) : (msgType === 'warning') ? (
            <div className={`fixed max-w-72 bottom-3/4 left-5 flex justify-center items-center gap-2 border border-yellow-800 bg-black px-4 py-2 rounded-lg shadow-lg animate-fadeIn`}>
                <FaInfoCircle /> {message}
            </div>
        ) : (
            <div className={`fixed max-w-72 bottom-3/4 left-5 flex justify-center items-center gap-2 border border-red-800 bg-black px-4 py-2 rounded-lg shadow-lg animate-fadeIn`}>
                <FaInfoCircle /> {message}
            </div>
        )
    );
};

export default Toast;
