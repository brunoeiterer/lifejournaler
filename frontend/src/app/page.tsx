'use client';

import ScaleSection from '@/components/SUDSScale';
import RadialSelector from '@/components/RadialSelector';
import { useLanguage } from './contexts/LanguageContext';

const Dashboard: React.FC = () => {
    const { translations } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <RadialSelector title={translations['Mood']} options={["Happy", "Sad", "Excited", "Calm", "Angry"]}/>
            <RadialSelector title={translations['Weather']} options={["ExtremelyCold", "Cold", "Pleasant", "Hot", "ExtremelyHot"]}/>
            <RadialSelector title={translations['SleepQuality']} options={["VeryBad", "Bad", "Good", "VeryGood"]}/>
            <RadialSelector title={translations['MenstrualCycle']} options={['Yes', 'No']} />
            <RadialSelector title={translations['Exercise']} options={['Yes', 'No']} />

            <ScaleSection title={translations['AnxietyThoughts']} />
            <ScaleSection title={translations['DepressiveThoughts']} />
            <ScaleSection title={translations['Autocriticism']} />
            <ScaleSection title={translations['SensorialOverload']} />
        </div>
    );
};

export default Dashboard;
