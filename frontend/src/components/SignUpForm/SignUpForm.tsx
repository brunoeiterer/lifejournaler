'use client';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { register } from '@/services/BackendApiService';
import { useModalError } from '@/app/contexts/ModalErrorContext';
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
    const { translations } = useLanguage();
    const { setErrorMessage } = useModalError();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirm) {
            setErrorMessage(translations['PasswordsDoNotMatch']);
            return;
        }

        if (!isAllCriteriaMet) {
            setErrorMessage(translations['PasswordDoesntMeetAllCriteria']);
            return;
        }

        setIsLoading(true);

        const result = await register(username, password);

        if (result) {
            onSuccess();
        } else {
            setErrorMessage(translations['SignUpError']);
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
        </div>
    );
}
