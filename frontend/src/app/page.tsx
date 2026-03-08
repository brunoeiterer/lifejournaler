'use client';

import { useLanguage } from './contexts/LanguageContext';
import { DailyEntry } from './models/DailyEntry';
import Calendar from '@/components/Calendar/Calendar';
import { useEffect, useState } from 'react';
import Drawer from '@/components/Drawer/Drawer';
import { useAuth } from './contexts/AuthContext';
import { getEntries } from '@/services/backendApiService';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import DepressiveEpisodeWarning from '@/components/DepressiveEpisodeWarning/DepressiveEpisodeWarning';
import { CalendarContainer, ClickTip, ContentContainer, DepressiveEpisodeWarningContainer, PageContainer, PageTitle } from './page.styles';
import HamburgerButton from '@/components/HamburgerButton/HamburgerButton';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const { translations } = useLanguage();
    const router = useRouter();
    const [ isDrawerVisible, setIsDrawerVisible ] = useState(false);
    const [ entries, setEntries ] = useState<Record<string, DailyEntry>>({});
    const { isSignedIn, isAuthLoading } = useAuth();

    useEffect(() => {
        if(isSignedIn) {
            const fetchEntries = async () => {
                setEntries(await getEntries());
            }

            fetchEntries();
        }
        else {
            setEntries({});
        }
    }, [isSignedIn]);

    useLockBodyScroll(isDrawerVisible);

    if(isAuthLoading) {
        return <LoadingScreen />
    }

    const shouldDisplayEpisodeWarning = Object.keys(entries).length >= 4 &&
        Object.keys(entries).sort().slice(-4).every(day => entries[day].Mood === "Tired");

    return (
        <PageContainer>
            <HamburgerButton
                onClick={() => setIsDrawerVisible(!isDrawerVisible)}
            />

            <Drawer
                isVisible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
            />

            <ContentContainer>
                <PageTitle>LifeJournaler</PageTitle>
                <ClickTip>{translations['ClickTip']}</ClickTip>

                <DepressiveEpisodeWarningContainer>
                    {shouldDisplayEpisodeWarning && <DepressiveEpisodeWarning />}
                </DepressiveEpisodeWarningContainer>

                <CalendarContainer>
                    <Calendar
                        entries={entries}
                        onDateClick={(date) => router.push(`/entry/${date}`)}
                    />
                </CalendarContainer>
            </ContentContainer>
        </PageContainer>
    );
};

export default Page;
