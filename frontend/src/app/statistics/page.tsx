'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import MonthlyStats from '@/components/MonthlyStats/MonthlyStats';
import { useEffect, useState } from 'react';
import { DailyEntry } from '@/app/models/DailyEntry';
import { getEntries } from '@/services/backendApiService';
import { useAuth } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import BackButton from '@/components/BackButton/BackButton';

export default function StatisticsPage() {
    const { translations } = useLanguage();
    const { isSignedIn } = useAuth();
    const [entries, setEntries] = useState<Record<string, DailyEntry>>({});

    useEffect(() => {
        if (isSignedIn) {
            const fetchEntries = async () => {
                setEntries(await getEntries());
            };
            fetchEntries();
        }
    }, [isSignedIn]);

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                    {translations['MonthlyStatistics']}
                </h2>
                <MonthlyStats entries={entries} />
            </ContentContainer>
        </PageContainer>
    );
}
