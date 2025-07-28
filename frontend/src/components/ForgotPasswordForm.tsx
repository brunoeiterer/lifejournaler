'use client';

import { FormEvent, useState } from 'react';
import { requestPasswordReset, resetPassword } from '@/services/BackendApiService';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ForgotPasswordFormProps {
    onSuccess: () => void;
    onError: (message: string) => void;
}

function getPasswordCriteria(password: string) {
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
}

export default function SignInForm({ onSuccess, onError }: ForgotPasswordFormProps) {
    const { translations } = useLanguage();
    const [ username, setUsername] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');
    const [ code, setCode ] = useState('');
    const [ passwordResetRequested, setPasswordResetRequested ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleSubmitRequest = async (event : FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const result = await requestPasswordReset(username);
        setIsLoading(false);
        if (result) {
            setPasswordResetRequested(true);
        }
        else {
            onError(translations['FailedToSendResetCode']);
        }
    }

    const handleSubmitReset = async (event : FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            onError(translations['PasswordsDoNotMatch']);
            return;
        }

        const failed = Object.entries(criteria).find(([met]) => !met);
        if (failed) {
            onError(translations['PasswordDoesntMeetAllCriteria']);
            return;
        }

        setIsLoading(true);

        const result = await resetPassword(username, code, newPassword);
        if(result) {
            onSuccess();
        }
        else {
            onError(translations['FailedToResetPassword']);
        }

        setIsLoading(false);
    }

    const criteria = getPasswordCriteria(newPassword);

    const criteriaLabels = {
        length: translations['PasswordLengthCriteria'],
        lowercase: translations['PasswordLowerCaseCriteria'],
        uppercase: translations['PasswordUpperCaseCriteria'],
        digit: translations['PasswordNumberCriteria'],
        symbol: translations['PasswordSymbolCriteria'],
    };

    return (
        passwordResetRequested ? (
        <>
            <form onSubmit={handleSubmitReset} className="space-y-4">
                <input 
                    className="w-full border px-3 py-2 rounded"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={translations["ResetCode"]}
                >
                </input>
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={translations["NewPassword"]}
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder={translations["ConfirmNewPassword"]}
                />
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 flex justify-center items-center text-white py-2 rounded">
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    ) : (
                        translations['ResetPassword']
                    )}
                </button>
            </form>

            <ul className="text-sm space-y-1 mt-2">
                {Object.entries(criteriaLabels).map(([key, label]) => (
                    <li key={key} className="flex items-center gap-2">
                        <span
                            className={`inline-block w-3 h-3 rounded-full ${criteria[key as keyof typeof criteria] ? 'bg-green-500' : 'bg-red-400'
                                }`}
                        />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>
        </>
        ) :
        (
        <form onSubmit={handleSubmitRequest} className="space-y-4">
            <input
                className="w-full border px-3 py-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
            />
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 flex justify-center items-center text-white py-2 rounded">
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                ) : (
                    translations['ResetPassword']
                )}
            </button>
        </form>
        )
    );
}
