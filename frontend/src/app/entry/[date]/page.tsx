'use client';

import { PageContainer, ContentContainer, PageTitle } from '@/app/page.styles';
import EntryEditor from '@/components/EntryEditor/EntryEditor';
import { useEffect, useState } from 'react';
import { DailyEntry } from '@/app/models/DailyEntry';
import { getEntries } from '@/services/backendApiService';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import BackButton from '@/components/BackButton/BackButton';

interface EntryPageProps {
    params: Promise<{ date: string }>;
}

export default function EntryPage({ params }: EntryPageProps) {
    const { date } = use(params);
    const { isSignedIn, isAuthLoading } = useAuth();
    const router = useRouter();
    const [entry, setEntry] = useState<DailyEntry | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!isAuthLoading && !isSignedIn) {
            router.push('/sign-in');
            return;
        }

        if (isSignedIn) {
            const fetchEntry = async () => {
                const allEntries = await getEntries();
                if (allEntries && typeof allEntries === 'object') {
                    setEntry(allEntries[date]);
                }
                setIsFetching(false);
            };
            fetchEntry();
        }
    }, [isSignedIn, isAuthLoading, date, router]);

    if (isAuthLoading || isFetching) {
        return <LoadingScreen />;
    }

    const unmountAndGoHome = () => {
        router.push('/');
    };

    return (
        <PageContainer>
            <BackButton />
            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <EntryEditor
                    date={date}
                    originalEntry={entry ?? null}
                    onClose={unmountAndGoHome}
                />
            </ContentContainer>
        </PageContainer>
    );
}
