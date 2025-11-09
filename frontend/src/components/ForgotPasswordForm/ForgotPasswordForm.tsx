'use client';

import { FormEvent, useState } from 'react';
import { requestPasswordReset, resetPassword } from '@/services/BackendApiService';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useModalError } from '@/app/contexts/ModalErrorContext';
import { ForgotPasswordButton, ForgotPasswordButtonInProgressContent, ForgotPasswordFormContainer, ForgotPasswordInput } from './ForgotPasswordForm.styles';
import PasswordStrengthCriteria from '../Common/PasswordStrengthCriteria/PasswordStrengthCriteria';

interface ForgotPasswordFormProps {
    onSuccess: () => void;
}

export default function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
    const { language, translations } = useLanguage();
    const [ username, setUsername] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');
    const [ code, setCode ] = useState('');
    const [ passwordResetRequested, setPasswordResetRequested ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isAllCriteriaMet, setIsAllCriteriaMet ] = useState(false);
    const { setErrorMessage } = useModalError();

    const handleSubmitRequest = async (event : FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const result = await requestPasswordReset(username, language);
        setIsLoading(false);
        if (result) {
            setPasswordResetRequested(true);
        }
        else {
            setErrorMessage(translations['FailedToSendResetCode']);
        }
    }

    const handleSubmitReset = async (event : FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage(translations['PasswordsDoNotMatch']);
            return;
        }

        if (!isAllCriteriaMet) {
            setErrorMessage(translations['PasswordDoesntMeetAllCriteria']);
            return;
        }

        setIsLoading(true);

        const result = await resetPassword(username, code, newPassword);
        if(result) {
            onSuccess();
        }
        else {
            setErrorMessage(translations['FailedToResetPassword']);
        }

        setIsLoading(false);
    }

    return (
        passwordResetRequested ? (
        <>
            <ForgotPasswordFormContainer
                onSubmit={handleSubmitReset}
            >
                <ForgotPasswordInput 
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    placeholder={translations["ResetCode"]}
                />
                <ForgotPasswordInput
                    type="password"
                    value={newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    placeholder={translations["NewPassword"]}
                />
                <ForgotPasswordInput
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)}
                    placeholder={translations["ConfirmNewPassword"]}
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
        
            <PasswordStrengthCriteria
                password={newPassword}
                setIsAllCriteriaMet={setIsAllCriteriaMet}
            />
        </>
        ) :
        (
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
        )
    );
}
