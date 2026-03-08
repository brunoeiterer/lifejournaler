'use client';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { register } from '@/services/backendApiService';
import Toast from '../Common/Toast/Toast';
import { SignUpFormContainer, SignUpFormInput, SignUpFormSubmitButton, SignUpFormSubmitButtonInProgressContent } from './SignUpForm.styles';
import PasswordStrengthCriteria from '../Common/PasswordStrengthCriteria/PasswordStrengthCriteria';

interface SignUpFormProps {
    onSuccess: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAllCriteriaMet, setIsAllCriteriaMet] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { translations } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirm) {
            setErrorMessage(translations['PasswordsDoNotMatch'] || 'Passwords do not match');
            return;
        }

        if (!isAllCriteriaMet) {
            setErrorMessage(translations['PasswordDoesntMeetAllCriteria'] || 'Password does not meet all criteria');
            return;
        }

        setIsLoading(true);

        const result = await register(username, password);

        if (result) {
            onSuccess();
        } else {
            setErrorMessage(translations['SignUpError'] || 'An error occurred during sign up');
        }

        setIsLoading(false);
    };

    return (
        <div>
            <SignUpFormContainer onSubmit={handleSubmit}>
                <SignUpFormInput
                    type='email'
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    placeholder='Email'
                />
                <SignUpFormInput
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder={translations['Password']}
                />
                <SignUpFormInput
                    type="password"
                    value={confirm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
                    placeholder={translations['ConfirmPassword']}
                />
                <SignUpFormSubmitButton
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <SignUpFormSubmitButtonInProgressContent />
                    ) : (
                        translations['SignUp']
                    )}
                </SignUpFormSubmitButton>
            </SignUpFormContainer>

            <PasswordStrengthCriteria 
                password={password}
                setIsAllCriteriaMet={setIsAllCriteriaMet}
            />

            {errorMessage != '' && 
                <Toast 
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            }
        </div>
    );
}
