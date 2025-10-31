'use client';

interface ToastProps {
    message: string;
    onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-md animate-fade-in">
            <span>{message}</span>
            <button
                onClick={() =>  onClose()}
                className="ml-4 text-white font-bold"
            >
                ×
            </button>
        </div>
    );
}
