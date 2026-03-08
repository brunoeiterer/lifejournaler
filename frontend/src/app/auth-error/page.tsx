'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Link from 'next/link';
import { ForgotPasswordButton } from '@/components/ForgotPasswordForm/ForgotPasswordForm.styles';
import BackButton from '@/components/BackButton/BackButton';

export default function AuthErrorPage() {
    const { translations } = useLanguage();

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>
                        {translations['AuthenticationError']}
                    </h2>
                    <p style={{ marginBottom: '2rem', color: 'gray' }}>
                        {translations['AuthenticationErrorMessage']}
                    </p>
                    
                    <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                        <ForgotPasswordButton type="button">
                            {translations['RequestNewLink']}
                        </ForgotPasswordButton>
                    </Link>
                </div>
            </ContentContainer>
        </PageContainer>
    );
}
