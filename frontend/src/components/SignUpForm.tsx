'use client';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { register } from '@/services/BackendApiService';

interface SignUpFormProps {
    onSuccess: () => void;
    onError: (errorMessage: string) => void;
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

export default function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const { translations } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirm) {
            onError(translations['PasswordsDoNotMatch']);
            return;
        }

        const result = await register(username, password);

        if (result) {
            onSuccess();
        } else {
            onError(translations['SignUpError']);
        }
    };

    const criteria = getPasswordCriteria(password);

    const criteriaLabels = {
        length: translations['PasswordLengthCriteria'],
        lowercase: translations['PasswordLowerCaseCriteria'],
        uppercase: translations['PasswordUpperCaseCriteria'],
        digit: translations['PasswordNumberCriteria'],
        symbol: translations['PasswordSymbolCriteria'],
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full border px-3 py-2 rounded"
                    type='email'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Email'
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={translations['Password']}
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder={translations['ConfirmPassword']}
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    {translations['SignUp']}
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
        </div>
    );
}
