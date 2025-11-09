import { useLanguage } from "@/app/contexts/LanguageContext";
import EntryDate from "./EntryDate/EntryDate";
import Notes from "./Notes/Notes";
import RadialSelector from "./RadialSelector/RadialSelector";
import SaveButton from "./SaveButton/SaveButton";
import SUDSScale from "./SUDSScale/SUDSScale";
import { useState } from "react";
import { DailyEntry } from "@/app/models/DailyEntry";
import { addEntry, editEntry } from "@/services/BackendApiService";
import Toast from "../Common/Toast/Toast";
import { EntryEditorContainer } from "./EntryEditor.styles";

interface EntryEditorProps {
    date: string;
    originalEntry: DailyEntry;
    onClose: () => void;
    updateEntry: (date: string, entry: DailyEntry) => void;
}

export default function EntryEditor({date, originalEntry, onClose, updateEntry} : EntryEditorProps) {
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isSavingInProgress, setIsSavingInProgress ] = useState(false);
    const {translations} = useLanguage();
    const entry = originalEntry ?? { Mood: 'Happy', Weather: 'ExtremelyCold', SleepQuality: 'VeryBad',
        Menstruation: 'Yes', Exercise: 'Yes', AppetiteLevel: 'Low', AnxietyThoughts: 0, DepressiveThoughts: 0, Autocriticism: 0, SensorialOverload: 0,
        RacingThoughts: 0, Notes: ''
    };

    const saveEntry = async () => {
        setIsSavingInProgress(true);
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

        setIsSavingInProgress(false);
    }

    const onEntryUpdated = <K extends keyof DailyEntry>(key: K, value: DailyEntry[K]) => {
        entry[key] = value;
    };

    return (
        <EntryEditorContainer>
                <EntryDate
                    title={translations['Date']}
                    date={date}
                />

                <RadialSelector 
                    title={translations['Mood']} 
                    options={["Happy", "Sad", "Excited", "Calm", "Angry", "Apathetic","Anxious", "Tired"]}
                    label='Mood' initialValue={entry.Mood}
                    onChange={onEntryUpdated}
                />
                <RadialSelector
                    title={translations['Weather']}
                    options={["ExtremelyCold", "Cold", "Pleasant", "Hot", "ExtremelyHot", "Cloudy", "Rainy"]}
                    label='Weather'
                    initialValue={entry.Weather}
                    onChange={onEntryUpdated}
                />
                <RadialSelector
                    title={translations['SleepQuality']}
                    options={["VeryBad", "Bad", "Average", "Good", "VeryGood"]}
                    label='SleepQuality'
                    initialValue={entry.SleepQuality}
                    onChange={onEntryUpdated}
                />
                <RadialSelector
                    title={translations['MenstrualCycle']}
                    options={['Yes', 'PMS', 'No']}
                    label='Menstruation'
                    initialValue={entry.Menstruation}
                    onChange={onEntryUpdated}
                />
                <RadialSelector
                    title={translations['Exercise']}
                    options={['Yes', 'No']}
                    label='Exercise' 
                    initialValue={entry.Exercise}
                    onChange={onEntryUpdated}
                />
                <RadialSelector
                    title={translations['AppetiteLevel']}
                    options={['Low', 'Normal', 'Large']}
                    label='AppetiteLevel'
                    initialValue={entry.AppetiteLevel}
                    onChange={onEntryUpdated}
                />

                <SUDSScale
                    title={translations['AnxietyThoughts']}
                    label='AnxietyThoughts'
                    initialValue={entry.AnxietyThoughts}
                    onChange={onEntryUpdated}
                />
                <SUDSScale
                    title={translations['DepressiveThoughts']} 
                    label='DepressiveThoughts'
                    initialValue={entry.DepressiveThoughts}
                    onChange={onEntryUpdated}
                />
                <SUDSScale
                    title={translations['Autocriticism']}
                    label='Autocriticism'
                    initialValue={entry.Autocriticism}
                    onChange={onEntryUpdated}
                />
                <SUDSScale
                    title={translations['SensorialOverload']}
                    label='SensorialOverload'
                    initialValue={entry.SensorialOverload}
                    onChange={onEntryUpdated}
                />
                <SUDSScale
                    title={translations['RacingThoughts']}
                    label='RacingThoughts'
                    initialValue={entry.RacingThoughts}
                    onChange={onEntryUpdated}
                />

                <Notes
                    title={translations['Notes']}
                    label='Notes'
                    initialValue={entry.Notes}
                    onChange={onEntryUpdated}
                />

                <SaveButton
                    onClick={saveEntry}
                    label={translations['SaveEntry']}
                    isInProgress={isSavingInProgress}
                />

            {errorMessage != '' && 
                <Toast 
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            }
        </EntryEditorContainer>
    )
}