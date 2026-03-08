'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Link from 'next/link';
import { ForgotPasswordButton } from '@/components/ForgotPasswordForm/ForgotPasswordForm.styles';
import BackButton from '@/components/BackButton/BackButton';

export default function VerifyEmailPage() {
    const { translations } = useLanguage();

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                    <h2 style={{ marginBottom: '1rem' }}>
                        {translations['CheckYourEmail']}
                    </h2>
                    <p style={{ marginBottom: '2rem', color: 'gray', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                        {translations['CheckYourEmailDescription']}
                    </p>
                    
                    <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                        <ForgotPasswordButton type="button">
                            {translations['SignIn']}
                        </ForgotPasswordButton>
                    </Link>
                </div>
            </ContentContainer>
        </PageContainer>
    );
}
