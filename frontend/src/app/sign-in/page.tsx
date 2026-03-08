'use client';

import SignInForm from '@/components/SignInForm/SignInForm';
import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton/BackButton';

export default function SignInPage() {
    const router = useRouter();

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <SignInForm
                    onSuccess={() => router.push('/')}
                    onForgotPassword={() => router.push('/forgot-password')}
                />
            </ContentContainer>
        </PageContainer>
    );
}
