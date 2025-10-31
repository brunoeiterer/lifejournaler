'use client';

import { FormEvent, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { login } from '@/services/BackendApiService';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useModalError } from '@/app/contexts/ModalErrorContext';

interface SignInFormProps {
    onSuccess: () => void;
    onForgotPassword: () => void;
}

export default function SignInForm({ onSuccess, onForgotPassword }: SignInFormProps) {
    const { translations } = useLanguage();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();

    const { setErrorMessage } = useModalError();

    const handleSubmit = async (event : FormEvent) => {
        setIsLoading(true);
        event.preventDefault();
        const result = await login(username, password);
        if (result == '') {
            signIn(username);
            onSuccess();
        }
        else {
            setErrorMessage(result);
        }
        setIsLoading(false);
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full border px-3 py-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="w-full border px-3 py-2 rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 flex justify-center items-center text-white py-2 rounded">
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                ) : (
                    translations['SignIn']
                )}
            </button>
        </form>

        <span onClick={onForgotPassword} className='block text-sm text-blue-600 hover:underline hover:cursor-pointer mt-4'>
            {translations["ForgotPassword"]}</span>
    </>
    );
}
