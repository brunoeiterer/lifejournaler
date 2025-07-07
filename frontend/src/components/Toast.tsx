'use client';

interface ToastProps {
    message: string;
}

export default function Toast({ message }: ToastProps) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-md animate-fade-in">
            {message}
        </div>
    );
}
