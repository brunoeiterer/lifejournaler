'use client';

import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton/BackButton';

export default function SignUpPage() {
    const router = useRouter();

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <SignUpForm
                    onSuccess={() => router.push('/')}
                />
            </ContentContainer>
        </PageContainer>
    );
}
