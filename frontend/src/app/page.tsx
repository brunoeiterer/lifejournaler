'use client';

import { useLanguage } from './contexts/LanguageContext';
import { DailyEntry } from './models/DailyEntry';
import Calendar from '@/components/Calendar/Calendar';
import { useEffect, useState } from 'react';
import EntryEditor from '@/components/EntryEditor/EntryEditor';
import Drawer from '@/components/Drawer/Drawer';
import { useAuth } from './contexts/AuthContext';
import { getEntries } from '@/services/BackendApiService';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import Modal from '@/components/Modal/Modal';
import SignInForm from '@/components/SignInForm/SignInForm';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { ModalErrorProvider } from './contexts/ModalErrorContext';
import DeleteAccount from '@/components/DeleteAccount/DeleteAccount';
import MonthlyStats from '@/components/MonthlyStats/MonthlyStats';
import ForgotPasswordForm from '@/components/ForgotPasswordForm/ForgotPasswordForm';
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import DepressiveEpisodeWarning from '@/components/DepressiveEpisodeWarning/DepressiveEpisodeWarning';
import { CalendarContainer, ClickTip, ContentContainer, DepressiveEpisodeWarningContainer, PageContainer, PageTitle } from './page.styles';
import HamburgerButton from '@/components/HamburgerButton/HamburgerButton';

const Page: React.FC = () => {
    const { translations } = useLanguage();
    const [ currentDate, setCurrentDate ] = useState<string | null>(null);
    const [ isDrawerVisible, setIsDrawerVisible ] = useState(true);
    const [ isSignInVisibile, setIsSignInVisible ] = useState(false);
    const [ isSignUpVisibile, setIsSignUpVisible ] = useState(false);
    const [ isDeleteAccountVisible, setIsDeleteAccountVisible ] = useState(false);
    const [ isMonthlyStatsModalVisible, setIsMonthlyStatsModalVisible ] = useState(false);
    const [ isForgotPasswordVisible, setIsForgotPasswordVisible ] = useState(false);
    const [ isPrivacyPolicyVisible, setIsPrivacyPolicyVisible ] = useState(false);
    const [ entries, setEntries ] = useState<Record<string, DailyEntry>>({})
    const { isSignedIn, isAuthLoading } = useAuth();

    const showEntryEditor = currentDate != null;

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

    useEffect(() => {
        const anyModalOpen = isSignInVisibile || isSignUpVisibile || isDeleteAccountVisible || isMonthlyStatsModalVisible ||
           isForgotPasswordVisible || isPrivacyPolicyVisible || showEntryEditor;
        if(!anyModalOpen) {
            if(window.history.state?.modal) {
                window.history.back();
            }

            return;
        }

        window.history.pushState({ modal: true }, "");

        const handlePopState = () => {
                if (isSignInVisibile) {
                    setIsSignInVisible(false);
                }
                else if(isSignUpVisibile) {
                    setIsSignUpVisible(false);
                }
                else if(isDeleteAccountVisible) {
                    setIsDeleteAccountVisible(false);
                }
                else if(isMonthlyStatsModalVisible) {
                    setIsMonthlyStatsModalVisible(false);
                }
                else if(isForgotPasswordVisible) {
                    setIsForgotPasswordVisible(false);
                }
                else if(isPrivacyPolicyVisible) {
                    setIsPrivacyPolicyVisible(false);
                }
                else if(showEntryEditor) {
                    setCurrentDate(null);
                }
            };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [isSignInVisibile, isSignUpVisibile, isDeleteAccountVisible, isMonthlyStatsModalVisible, isForgotPasswordVisible,
        isPrivacyPolicyVisible, showEntryEditor]);

    const lockBodyScroll = isDrawerVisible || isSignInVisibile || isSignUpVisibile || isDeleteAccountVisible ||
        isMonthlyStatsModalVisible || isForgotPasswordVisible || isPrivacyPolicyVisible || showEntryEditor;
    useLockBodyScroll(lockBodyScroll);

    const updateEntry = (date: string, entry: DailyEntry) => {
        const entryData = Object.assign({}, entries);
        entryData[date] = entry;
        setEntries(entryData);
    }

    const onForgotPassword = () => {
        setIsSignInVisible(false);
        setIsForgotPasswordVisible(true);
    }

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
                onSignInClick={() => setIsSignInVisible(true)}
                onSignUpClick={() => setIsSignUpVisible(true)}
                onDeleteAccountClick={() => setIsDeleteAccountVisible(true)}
                onMonthlyStatisticsClick={() => setIsMonthlyStatsModalVisible(true)}
                onPrivacyPolicyClick={() => setIsPrivacyPolicyVisible(true)}
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
                        onDateClick={(date) => setCurrentDate(date)}
                    />
                </CalendarContainer>
                {showEntryEditor &&
                    <Modal
                        onClose={() => setCurrentDate(null)}
                    >
                        <EntryEditor
                            date={currentDate}
                            originalEntry={entries[currentDate]}
                            onClose={() => setCurrentDate(null)}
                            updateEntry={updateEntry}
                        />
                    </Modal>
                }
                {isSignInVisibile &&
                    <ModalErrorProvider>
                        <Modal
                            onClose={() => setIsSignInVisible(false)}
                            title={translations['SignIn']}
                        >
                            <SignInForm
                                onSuccess={() => setIsSignInVisible(false)}
                                onForgotPassword={onForgotPassword}
                            />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isSignUpVisibile &&
                    <ModalErrorProvider>
                        <Modal
                            onClose={() => setIsSignUpVisible(false)}
                            title={translations['SignUp']}
                        >
                            <SignUpForm
                                onSuccess={() => setIsSignUpVisible(false)}
                            />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isDeleteAccountVisible &&
                    <ModalErrorProvider>
                        <Modal
                            onClose={() => setIsDeleteAccountVisible(false)}
                            title={translations['DeleteAccount']}
                        >
                            <DeleteAccount
                                onSuccess={() => setIsDeleteAccountVisible(false)}
                            />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isMonthlyStatsModalVisible &&
                    <ModalErrorProvider>
                        <Modal
                            onClose={() => setIsMonthlyStatsModalVisible(false)}
                            title={translations['MonthlyStatistics']}
                        >
                            <MonthlyStats
                                entries={entries}
                            />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isForgotPasswordVisible &&
                    <ModalErrorProvider>
                        <Modal
                            onClose={() => setIsForgotPasswordVisible(false)}
                            title={translations['ResetPassword']}
                        >
                            <ForgotPasswordForm
                                onSuccess={() => setIsForgotPasswordVisible(false)}
                            />
                        </Modal>
                    </ModalErrorProvider>    
                }
                {isPrivacyPolicyVisible &&
                    <Modal
                        onClose={() => setIsPrivacyPolicyVisible(false)}
                    >
                        <PrivacyPolicy />
                    </Modal>
                }
            </ContentContainer>
        </PageContainer>
    );
};

export default Page;
