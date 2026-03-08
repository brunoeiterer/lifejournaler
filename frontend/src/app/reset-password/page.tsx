'use client';

import { Suspense, useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { useLanguage } from '@/app/contexts/LanguageContext';
import PasswordStrengthCriteria from '@/components/Common/PasswordStrengthCriteria/PasswordStrengthCriteria';
import { 
    ForgotPasswordButton, 
    ForgotPasswordButtonInProgressContent, 
    ForgotPasswordFormContainer, 
    ForgotPasswordInput 
} from '@/components/ForgotPasswordForm/ForgotPasswordForm.styles';
import { ContentContainer, PageContainer, PageTitle } from '@/app/page.styles';
import BackButton from '@/components/BackButton/BackButton';
import Toast from '@/components/Common/Toast/Toast';

function ResetPasswordForm() {
    const { translations } = useLanguage();
    const router = useRouter();

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAllCriteriaMet, setIsAllCriteriaMet] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Supabase passes errors in the hash fragment for implicit flow
        if (typeof window !== 'undefined' && window.location.hash) {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            if (hashParams.get('error')) {
                router.push(`/auth-error${window.location.hash}`);
                return;
            }
        }
        
        // Supabase implicitly creates a session when we arrive via a recovery link
        // with the type 'recovery' in the hash fragment. We establish it here implicitly.
        const checkSession = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                const { error } = await supabase.auth.exchangeCodeForSession(code);
                if (error) {
                    console.error('Error exchanging auth code for session:', error.message);
                }
            }
        };
        
        checkSession();
    }, [router]);

    const handleSubmitReset = async (event: FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage(translations['PasswordsDoNotMatch'] || 'Passwords do not match');
            return;
        }

        if (!isAllCriteriaMet) {
            setErrorMessage(translations['PasswordDoesntMeetAllCriteria'] || 'Password does not meet all criteria');
            return;
        }

        setIsLoading(true);

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        setIsLoading(false);

        if (error) {
            setErrorMessage(error.message || translations['FailedToResetPassword'] || 'Failed to reset password');
        } else {
            setIsSuccess(true);
            router.push('/');
        }
    };

    if (isSuccess) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>{translations['PasswordResetSuccess'] || 'Password successfully reset!'}</p>
                <p>Redirecting to login...</p>
            </div>
        );
    }

    return (
        <ContentContainer>
            <PageTitle>LifeJournaler</PageTitle>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {translations['ResetPassword'] || 'Reset Password'}
            </h2>
            <ForgotPasswordFormContainer onSubmit={handleSubmitReset}>
                <ForgotPasswordInput
                    type="password"
                    value={newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    placeholder={translations["NewPassword"] || 'New Password'}
                />
                <ForgotPasswordInput
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)}
                    placeholder={translations["ConfirmNewPassword"] || 'Confirm New Password'}
                />
                <ForgotPasswordButton type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <ForgotPasswordButtonInProgressContent />
                    ) : (
                        translations['ResetPassword'] || 'Reset Password'
                    )}
                </ForgotPasswordButton>
            </ForgotPasswordFormContainer>

            <PasswordStrengthCriteria
                password={newPassword}
                setIsAllCriteriaMet={setIsAllCriteriaMet}
            />

            {errorMessage != '' && 
                <Toast 
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            }
        </ContentContainer>
    );
}

export default function ResetPasswordPage() {
    return (
        <PageContainer>
            <BackButton />
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </PageContainer>
    );
}
