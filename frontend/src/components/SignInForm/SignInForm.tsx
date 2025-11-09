'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { login } from '@/services/BackendApiService';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useModalError } from '@/app/contexts/ModalErrorContext';
import { ForgotPasswordLink, SignInFormButton, SignInFormButtonInProgressContent, SignInFormContainer, SignInFormInput } from './SignInForm.styles';

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
            <SignInFormContainer onSubmit={handleSubmit}>
                <SignInFormInput
                    className=""
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    placeholder={translations["Username"]}
                />
                <SignInFormInput
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder={translations["Password"]}
                />
                <SignInFormButton
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <SignInFormButtonInProgressContent />
                    ) : (
                        translations['SignIn']
                    )}
                </SignInFormButton>
            </SignInFormContainer>

            <ForgotPasswordLink
                onClick={onForgotPassword}
            >
                {translations["ForgotPassword"]}
            </ForgotPasswordLink>
        </>
    );
}
