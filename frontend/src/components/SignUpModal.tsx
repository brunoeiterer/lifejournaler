'use client';
import { useEffect, useState } from 'react';
import Toast from './Toast';
import { useLanguage } from '@/app/contexts/LanguageContext';
import SignUpForm from './SignUpForm';

interface SignUpModalProps {
    onClose: () => void;
}

export default function SignUpModal({ onClose }: SignUpModalProps) {
    const { translations } = useLanguage();
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            {errorMessage != '' && <Toast message={errorMessage} />}
            <div className="relative max-w-2xl w-full flex items-center justify-center">
                <button
                    className="absolute z-10 top-0 right-24 -translate-y-1/2 bg-white rounded-full shadow-md w-8 h-8 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="relative bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">{translations['SignUp']}</h2>
                    <SignUpForm onSuccess={onClose} onError={setErrorMessage} />
                </div>
            </div>
        </div>
    );
}