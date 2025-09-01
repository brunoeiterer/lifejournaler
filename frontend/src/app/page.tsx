'use client';

import { useLanguage } from './contexts/LanguageContext';
import { DailyEntry } from './models/DailyEntry';
import Calendar from '@/components/Calendar';
import { useEffect, useState } from 'react';
import EntryEditor from '@/components/EntryEditor';
import Drawer from '@/components/Drawer';
import { useAuth } from './contexts/AuthContext';
import { getEntries } from '@/services/BackendApiService';
import LoadingScreen from '@/components/LoadingScreen';
import Modal from '@/components/Modal';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { ModalErrorProvider } from './contexts/ModalErrorContext';
import DeleteAccount from '@/components/DeleteAccount';
import MonthlyStatsChart from '@/components/MonthlyStatsChart';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import PrivacyPolicy from '@/components/PrivacyPolicy';

const Dashboard: React.FC = () => {
    const { translations } = useLanguage();
    const [ currentDate, setCurrentDate ] = useState<string | null>(null);
    const [ isDrawerVisible, setIsDrawerVisible ] = useState(true);
    const [ isSignInVisibile, setIsSignInVisible ] = useState(false);
    const [ isSignUpVisibile, setIsSignUpVisible ] = useState(false);
    const [ isDeleteAccountVisible, setIsDeleteAccountVisible ] = useState(false);
    const [ isMonthlyStatsChartModalVisible, setIsMonthlyStatsChartModalVisible ] = useState(false);
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

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
            <button className="fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-gray-100" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <Drawer isVisible={isDrawerVisible}
                onSignInClick={() => setIsSignInVisible(true)}
                onSignUpClick={() => setIsSignUpVisible(true)}
                onDeleteAccountClick={() => setIsDeleteAccountVisible(true)}
                onMonthlyStatisticsClick={() => setIsMonthlyStatsChartModalVisible(true)}
                onPrivacyPolicyClick={() => setIsPrivacyPolicyVisible(true)}
                onClose={() => setIsDrawerVisible(false)} />

            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-center mb-4">LifeJournaler</h1>
                <p className="text-gray-500 text-center mb-8">{translations['ClickTip']}</p>

                <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
                    <Calendar entries={entries} onDateClick={(date) => setCurrentDate(date)} />
                </div>
                {showEntryEditor && <EntryEditor date={currentDate} originalEntry={entries[currentDate]} 
                    onClose={() => setCurrentDate(null)} updateEntry={updateEntry}/>}
                {isSignInVisibile &&
                    <ModalErrorProvider>
                        <Modal onClose={() => setIsSignInVisible(false)} title={translations['SignIn']}>
                            <SignInForm onSuccess={() => setIsSignInVisible(false)} onForgotPassword={onForgotPassword} />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isSignUpVisibile &&
                    <ModalErrorProvider>
                        <Modal onClose={() => setIsSignUpVisible(false)} title={translations['SignUp']} >
                            <SignUpForm onSuccess={() => setIsSignUpVisible(false)} />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isDeleteAccountVisible &&
                    <ModalErrorProvider>
                        <Modal onClose={() => setIsDeleteAccountVisible(false)} title={translations['DeleteAccount']}>
                            <DeleteAccount onSuccess={() => setIsDeleteAccountVisible(false)} />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isMonthlyStatsChartModalVisible &&
                    <ModalErrorProvider>
                        <Modal onClose={() => setIsMonthlyStatsChartModalVisible(false)} title={translations['MonthlyStatistics']}>
                            <MonthlyStatsChart entries={entries} />
                        </Modal>
                    </ModalErrorProvider>
                }
                {isForgotPasswordVisible &&
                    <ModalErrorProvider>
                        <Modal onClose={() => setIsForgotPasswordVisible(false)} title={translations['ResetPassword']}>
                            <ForgotPasswordForm onSuccess={() => setIsForgotPasswordVisible(false)}  />
                        </Modal>
                    </ModalErrorProvider>    
                }
                {isPrivacyPolicyVisible &&
                    <Modal onClose={() => setIsPrivacyPolicyVisible(false)} title={translations['PrivacyPolicyTitle']}>
                        <PrivacyPolicy />
                    </Modal>
                }
            </div>
        </div>
    );
};

export default Dashboard;
