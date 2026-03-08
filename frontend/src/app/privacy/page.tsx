'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy';
import BackButton from '@/components/BackButton/BackButton';

export default function PrivacyPolicyPage() {
    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <PrivacyPolicy />
            </ContentContainer>
        </PageContainer>
    );
}
