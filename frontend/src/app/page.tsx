'use client';

import ScaleSection from '@/components/SUDSScale';
import RadialSelector from '@/components/RadialSelector';
import Notes from '@/components/Notes';
import { useLanguage } from './contexts/LanguageContext';
import EntryDate from '@/components/EntryDate';
import SaveButton from '@/components/SaveButton';

const Dashboard: React.FC = () => {
    const { translations } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <EntryDate title={translations['Date']} />

            <RadialSelector title={translations['Mood']} options={["Happy", "Sad", "Excited", "Calm", "Angry"]}/>
            <RadialSelector title={translations['Weather']} options={["ExtremelyCold", "Cold", "Pleasant", "Hot", "ExtremelyHot"]}/>
            <RadialSelector title={translations['SleepQuality']} options={["VeryBad", "Bad", "Good", "VeryGood"]}/>
            <RadialSelector title={translations['MenstrualCycle']} options={['Yes', 'No']} />
            <RadialSelector title={translations['Exercise']} options={['Yes', 'No']} />

            <ScaleSection title={translations['AnxietyThoughts']} />
            <ScaleSection title={translations['DepressiveThoughts']} />
            <ScaleSection title={translations['Autocriticism']} />
            <ScaleSection title={translations['SensorialOverload']} />

            <Notes title={translations['Notes']} />

            <SaveButton label={translations['SaveEntry']} />
        </div>
    );
};

export default Dashboard;
