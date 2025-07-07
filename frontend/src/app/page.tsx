'use client';

import ScaleSection from '@/components/SUDSScale';
import RadialSelector from '@/components/RadialSelector';
import Notes from '@/components/Notes';
import { useLanguage } from './contexts/LanguageContext';
import EntryDate from '@/components/EntryDate';
import SaveButton from '@/components/SaveButton';
import Calendar, { DailyEntry } from '@/components/Calendar';
import SignInModal from '@/components/SignInModal';
import { useState } from 'react';
import EntryEditor from '@/components/EntryEditor';
import Drawer from '@/components/Drawer';

const Dashboard: React.FC = () => {
    const { translations } = useLanguage();
    const [ currentDate, setCurrentDate ] = useState<string | null>(null);
    const [ isDrawerVisible, setIsDrawerVisible ] = useState(true);
    const [ isSignInVisibile, setIsSignInVisible ] = useState(false);

    const showEntryEditor = currentDate != null;

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

            <Drawer isVisible={isDrawerVisible} onSignInClick={() => setIsSignInVisible(true)} />

            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-center mb-4">LifeJournaler</h1>
                <p className="text-gray-500 text-center mb-8">{translations['ClickTip']}</p>


                <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
                    <Calendar entries={{}} onDateClick={(date) => setCurrentDate(date)} />
                </div>
                {showEntryEditor && <EntryEditor date={currentDate} onClose={() => setCurrentDate(null)}/>}
                {isSignInVisibile && <SignInModal onClose={() => setIsSignInVisible(false)} />}
            </div>
        </div>
    );
};

export default Dashboard;
