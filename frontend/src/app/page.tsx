'use client';

import ScaleSection from '@/components/SUDSScale';
import RadialSelector from '@/components/RadialSelector';
import Notes from '@/components/Notes';
import { useLanguage } from './contexts/LanguageContext';
import EntryDate from '@/components/EntryDate';
import SaveButton from '@/components/SaveButton';
import Calendar, { DailyEntry } from '@/components/Calendar';
import { useState } from 'react';
import EntryEditor from '@/components/EntryEditor';

const Dashboard: React.FC = () => {
    const { translations } = useLanguage();
    const [ currentDate, setCurrentDate ] = useState<string | null>(null);

    const showEntryEditor = currentDate != null;

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Calendar entries={{}} onDateClick={(date) => setCurrentDate(date)} />
            {showEntryEditor && <EntryEditor date={currentDate} onClose={() => setCurrentDate(null)}/>}
        </div>
    );
};

export default Dashboard;
