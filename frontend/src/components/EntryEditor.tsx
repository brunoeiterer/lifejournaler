import { useLanguage } from "@/app/contexts/LanguageContext";
import EntryDate from "./EntryDate";
import Notes from "./Notes";
import RadialSelector from "./RadialSelector";
import SaveButton from "./SaveButton";
import SUDSScale from "./SUDSScale";
import { useEffect } from "react";

interface EntryEditorProps {
    date: string;
    onClose: () => void;
}

export default function EntryEditor({date, onClose} : EntryEditorProps) {
    const {translations} = useLanguage();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="relative max-w-2xl w-full flex items-center justify-center">
                 <button
                    className="absolute z-10 top-0 right-12 translate-x-1/4 -translate-y-1/2 bg-white rounded-full shadow-md w-8 h-8 text-gray-500 hover:text-black"
                    onClick={onClose}
                    >
                    ✕
                </button>
                
                <div className="flex flex-col gap-4 bg-white rounded-xl pt-10 p-6 shadow-lg max-h-[80vh] overflow-y-auto">
                    <EntryDate title={translations['Date']} date={date} />

                    <RadialSelector title={translations['Mood']} options={["Happy", "Sad", "Excited", "Calm", "Angry"]}/>
                    <RadialSelector title={translations['Weather']} options={["ExtremelyCold", "Cold", "Pleasant", "Hot", "ExtremelyHot"]}/>
                    <RadialSelector title={translations['SleepQuality']} options={["VeryBad", "Bad", "Good", "VeryGood"]}/>
                    <RadialSelector title={translations['MenstrualCycle']} options={['Yes', 'No']} />
                    <RadialSelector title={translations['Exercise']} options={['Yes', 'No']} />

                    <SUDSScale title={translations['AnxietyThoughts']} />
                    <SUDSScale title={translations['DepressiveThoughts']} />
                    <SUDSScale title={translations['Autocriticism']} />
                    <SUDSScale title={translations['SensorialOverload']} />

                    <Notes title={translations['Notes']} />

                    <SaveButton label={translations['SaveEntry']} />
                </div>
            </div>
        </div>
    )
}