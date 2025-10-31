'use client';
import { ReactNode, useEffect } from 'react';
import Toast from './Toast';
import React from 'react';
import { useModalError } from '@/app/contexts/ModalErrorContext';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    title?: string
}

export default function Modal({ onClose, children, title }: ModalProps) {
    const { errorMessage, setErrorMessage } = useModalError();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
         onClick={onClose}>
        {errorMessage !== '' && <Toast message={errorMessage} onClose={() => setErrorMessage('')} />}
        <div className="relative max-w-2xl w-full grid grid-rows-[min-content_auto] grid-cols-[auto_min-content]"
            onClick={(e) => e.stopPropagation()}>
            <div className="row-start-1 col-start-2 flex justify-end">
                <button
                    className="bg-white rounded-full shadow-md w-8 h-8 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
            <div className="bg-white rounded-lg p-6 w-full max-h-[90vh] overflow-y-auto col-start-1 col-span-2 row-start-2">
                <h2 className="text-xl font-semibold mb-4 text-center">{ title }</h2>
                { children }
            </div>
        </div>
    </div>
    );
}