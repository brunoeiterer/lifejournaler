'use client';

import { FormEvent, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { login } from '@/services/BackendApiService';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface SignInFormProps {
    onSuccess: () => void;
    onError: (errorMessage: string) => void;
    onForgotPassword: () => void;
}

export default function SignInForm({ onSuccess, onError, onForgotPassword }: SignInFormProps) {
    const { translations } = useLanguage();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();

    const handleSubmit = async (event : FormEvent) => {
        event.preventDefault();
        const result = await login(username, password);
        if (result == '') {
            signIn(username);
            onSuccess();
        }
        else {
            onError(result);
        }
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
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                {translations['SignIn']}
            </button>
        </form>

        <span onClick={onForgotPassword} className='block text-sm text-blue-600 hover:underline hover:cursor-pointer mt-4'>
            {translations["ForgotPassword"]}</span>
    </>
    );
}
