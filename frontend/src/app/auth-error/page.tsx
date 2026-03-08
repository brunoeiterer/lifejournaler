'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ForgotPasswordButton } from '@/components/ForgotPasswordForm/ForgotPasswordForm.styles';
import BackButton from '@/components/BackButton/BackButton';

export default function AuthErrorPage() {
    const { translations } = useLanguage();
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Parse Hash if present
        if (typeof window !== 'undefined' && window.location.hash) {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const desc = hashParams.get('error_description');
            if (desc) {
                // e.g. "Email link is invalid or has expired"
                setErrorMsg(desc.replace(/\+/g, ' '));
            }
        }
    }, []);

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>
                        {translations['AuthenticationError'] || 'Authentication Error'}
                    </h2>
                    <p style={{ marginBottom: '2rem', color: 'gray' }}>
                        {errorMsg || translations['AuthenticationErrorMessage'] || 'The magic link is invalid, has expired, or has already been used.'}
                    </p>
                    
                    <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                        <ForgotPasswordButton type="button">
                            {translations['RequestNewLink'] || 'Request a new link'}
                        </ForgotPasswordButton>
                    </Link>
                </div>
            </ContentContainer>
        </PageContainer>
    );
}
