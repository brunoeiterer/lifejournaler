'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import ForgotPasswordForm from '@/components/ForgotPasswordForm/ForgotPasswordForm';
import { useLanguage } from '@/app/contexts/LanguageContext';
import BackButton from '@/components/BackButton/BackButton';

export default function ForgotPasswordPage() {
    const { translations } = useLanguage();

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                    {translations['ResetPassword']}
                </h2>
                <ForgotPasswordForm />
            </ContentContainer>
        </PageContainer>
    );
}
