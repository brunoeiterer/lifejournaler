import { useLanguage } from "@/app/contexts/LanguageContext";
import EntryDate from "./EntryDate";
import Notes from "./Notes";
import RadialSelector from "./RadialSelector";
import SaveButton from "./SaveButton";
import SUDSScale from "./SUDSScale";
import { useEffect, useState } from "react";
import { DailyEntry } from "@/app/models/DailyEntry";
import { addEntry, editEntry } from "@/services/BackendApiService";
import Toast from "./Toast";

interface EntryEditorProps {
    date: string;
    originalEntry: DailyEntry;
    onClose: () => void;
    updateEntry: (date: string, entry: DailyEntry) => void;
}

export default function EntryEditor({date, originalEntry, onClose, updateEntry} : EntryEditorProps) {
    const [ errorMessage, setErrorMessage ] = useState('');
    const {translations} = useLanguage();
    const entry = originalEntry ?? { Mood: 'Happy', Weather: 'ExtremelyCold', SleepQuality: 'VeryBad',
        Menstruation: true, Exercise: true, AnxietyThoughts: 0, DepressiveThoughts: 0, Autocriticism: 0, SensorialOverload: 0,
        Notes: ''
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const saveEntry = async () => {
        let result = true;
        if(originalEntry == null) {
            result = await addEntry(date, entry);
        }
        else {
            result = await editEntry(date, entry);
        }

        if(!result) {
            setErrorMessage(translations['ErrorSavingEntry']);
        }
        else {
            updateEntry(date, entry);
            onClose();
        }
    }

    const onEntryUpdated = <K extends keyof DailyEntry>(key: K, value: DailyEntry[K]) => {
        entry[key] = value;
    };

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

                    <RadialSelector title={translations['Mood']} options={["Happy", "Sad", "Excited", "Calm", "Angry", "Apathetic",
                        "Anxious", "Tired"]} label='Mood' initialValue={entry.Mood} onChange={onEntryUpdated} />
                    <RadialSelector title={translations['Weather']} options={["ExtremelyCold", "Cold", "Pleasant", "Hot", 
                        "ExtremelyHot"]} label='Weather' initialValue={entry.Weather} onChange={onEntryUpdated}/>
                    <RadialSelector title={translations['SleepQuality']} options={["VeryBad", "Bad", "Average", "Good", "VeryGood"]}
                        label='SleepQuality' initialValue={entry.SleepQuality} onChange={onEntryUpdated}/>
                    <RadialSelector title={translations['MenstrualCycle']} options={['Yes', 'No']} label='Menstruation'
                        initialValue={entry.Menstruation ? "Yes" : "No"} onChange={onEntryUpdated} />
                    <RadialSelector title={translations['Exercise']} options={['Yes', 'No']} label='Exercise' 
                        initialValue={entry.Exercise ? "Yes" : "No"} onChange={onEntryUpdated} />

                    <SUDSScale title={translations['AnxietyThoughts']} label='AnxietyThoughts'
                        initialValue={entry.AnxietyThoughts} onChange={onEntryUpdated} />
                    <SUDSScale title={translations['DepressiveThoughts']} label='DepressiveThoughts'
                        initialValue={entry.DepressiveThoughts} onChange={onEntryUpdated} />
                    <SUDSScale title={translations['Autocriticism']} label='Autocriticism'
                        initialValue={entry.Autocriticism} onChange={onEntryUpdated} />
                    <SUDSScale title={translations['SensorialOverload']} label='SensorialOverload'
                        initialValue={entry.SensorialOverload} onChange={onEntryUpdated} />

                    <Notes title={translations['Notes']} label='Notes' initialValue={entry.Notes} onChange={onEntryUpdated} />

                    <SaveButton onClick={saveEntry} label={translations['SaveEntry']} />
                </div>

                {errorMessage != '' && <Toast message={errorMessage} />}
            </div>
        </div>
    )
}