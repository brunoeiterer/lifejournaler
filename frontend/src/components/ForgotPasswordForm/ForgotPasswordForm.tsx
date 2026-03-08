'use client';

import { FormEvent, useState } from 'react';
import { requestPasswordReset } from '@/services/backendApiService';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Toast from '../Common/Toast/Toast';
import { ForgotPasswordButton, ForgotPasswordButtonInProgressContent, ForgotPasswordFormContainer, ForgotPasswordInput } from './ForgotPasswordForm.styles';

export default function ForgotPasswordForm() {
    const { translations } = useLanguage();
    const [ username, setUsername] = useState('');
    const [ passwordResetRequested, setPasswordResetRequested ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitRequest = async (event : FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const result = await requestPasswordReset(username);
        setIsLoading(false);
        if (result) {
            setPasswordResetRequested(true);
        }
        else {
            setErrorMessage(translations['FailedToSendResetCode'] || 'Failed to send reset code');
        }
    }

    return (
        passwordResetRequested ? (
        <>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>{translations['PasswordResetEmailSent'] || 'A password reset link has been sent to your email.'}</p>
                <p>{translations['PleaseCheckYourInbox'] || 'Please check your inbox and click the link to set a new password.'}</p>
            </div>
        </>
        ) :
        (
        <>
            <ForgotPasswordFormContainer
                onSubmit={handleSubmitRequest}
            >
                <ForgotPasswordInput
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    placeholder="Email"
                />
                <ForgotPasswordButton
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ForgotPasswordButtonInProgressContent />
                    ) : (
                        translations['ResetPassword']
                    )}
                </ForgotPasswordButton>
            </ForgotPasswordFormContainer>

            {errorMessage != '' && 
                <Toast 
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            }
        </>
        )
    );
}
