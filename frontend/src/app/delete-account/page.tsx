'use client';

import DeleteAccount from '@/components/DeleteAccount/DeleteAccount';
import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import BackButton from '@/components/BackButton/BackButton';

export default function DeleteAccountPage() {
    const router = useRouter();
    const { translations } = useLanguage();

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                    {translations['DeleteAccount']}
                </h2>
                <DeleteAccount
                    onSuccess={() => router.push('/')}
                />
            </ContentContainer>
        </PageContainer>
    );
}
