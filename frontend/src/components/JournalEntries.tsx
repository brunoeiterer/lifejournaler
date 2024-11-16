'use client';

import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Alert, IconButton, Dialog } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { css } from '@emotion/css';
import dayjs from 'dayjs';
import { addEntry, deleteEntry, editEntry } from '@/services/BackendApiService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useLanguage } from '@/app/contexts/LanguageContext';

export interface JournalEntry {
    id: number;
    entry: string;
    mood: string;
    date: dayjs.Dayjs;
}

interface JournalEntriesProps {
    entries: JournalEntry[];
    addEntry: (newEntry: JournalEntry) => void;
    removeEntry: (id: number) => void;
    editEntry: (editedEntry: JournalEntry) => void;
}

const JournalEntries: React.FC<JournalEntriesProps> = (journalEntriesProps: JournalEntriesProps) => {
    const { translations } = useLanguage();

    const [entry, setEntry] = useState<string>("");
    const [mood, setMood] = useState<string>(translations['Happy']);
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [editingId, setEditingId] = useState(0);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSucessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntry(event.target.value);
    };

    const handleMoodChange = (event: SelectChangeEvent) => {
        setMood(event.target.value);
    }

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if(date) {
            setDate(dayjs(date));
        }
    }

    const handleSave = async () => {
        if (sessionStorage.getItem('loginToken') == null) {
            setErrorMessage(translations['PleaseLoginToSaveYourEntries']);
            setShowErrorAlert(true);
            return;
        }

        const token = sessionStorage.getItem('loginToken') ?? '';

        entry.trim();
        let entryId = -1;
        if(isEditing) {
            entryId = await editEntry(entry, mood, date, editingId, token);
        }
        else {
            entryId = await addEntry(entry, mood, date, token);
        }
        
        if(entryId == -1) {
            setErrorMessage(translations['ErrorSavingEntry']);
            setShowErrorAlert(true);
            return;
        }

        const newEntry: JournalEntry = {
            id: entryId,
            entry: entry,
            mood: mood,
            date: date,
        };

        if(isEditing) {
            journalEntriesProps.editEntry(newEntry);
        }
        else {
            journalEntriesProps.addEntry(newEntry);
        }
        
        setSuccessMessage(translations['EntrySavedSuccessfully']);
        setShowSuccessAlert(true);
        setEntry("");
    };

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(-1);

    const handleDelete = async (id: number) => {
        setShowDeleteDialog(true);
        setEntryToDelete(id);
    }

    const handleDeleteConfirmation = async (shouldDelete: boolean) => {
        const token = sessionStorage.getItem('loginToken') ?? '';
        if(shouldDelete) {
            const deleted = await deleteEntry(entryToDelete, token);
            if(deleted) {
                setSuccessMessage(translations['EntryDeletedSuccessfully']);
                setShowSuccessAlert(true);
                journalEntriesProps.removeEntry(entryToDelete);
            }
            else {
                setErrorMessage(translations['ErrorDeletingEntry']);
                setShowErrorAlert(true);
            }
        }

        setEntryToDelete(-1);
        setShowDeleteDialog(false);
    }

    const handleEdit = async (entry: JournalEntry) => {
        setIsEditing(true);
        setEntry(entry.entry);
        setMood(entry.mood);
        setDate(dayjs(entry.date));
        setEditingId(entry.id);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <div className={showErrorAlert ? undefined : 'hidden'}>
                <Alert severity='error' onClose={() => { setShowErrorAlert(false) }}>
                    {errorMessage}
                </Alert>
            </div>

            <div className={showSucessAlert ? undefined : 'hidden'}>
                <Alert severity='success' onClose={() => { setShowSuccessAlert(false) }}>
                    {successMessage}
                </Alert>
            </div>

            <Dialog open={showDeleteDialog}>
                {translations['DeleteEntryConfirmation']}
                <Button onClick={() => handleDeleteConfirmation(true)}>
                    {translations['Yes']}
                </Button>
                <Button onClick={() => handleDeleteConfirmation(false)}>
                    {translations['No']}
                </Button>
            </Dialog>

            <Typography variant="h4" gutterBottom>{translations['JournalEntry']}</Typography>
            <TextField
                label={translations['YourJournalEntry']}
                multiline
                rows={5}
                fullWidth
                value={entry}
                onChange={handleEntryChange}
                variant="outlined"
            />
            <FormControl fullWidth>
                <InputLabel
                    id="mood-select-label"
                    className={css({ marginTop: '20px' })} >
                    {translations['Mood']}
                </InputLabel>
                <Select
                    color="primary"
                    labelId="mood-select-label"
                    id="mood-select"
                    value={mood}
                    label='Mood'
                    onChange={handleMoodChange}
                    className={css({ marginTop: '20px' })}
                >
                    <MenuItem value="Happy">{translations['Happy']}</MenuItem>
                    <MenuItem value="Sad">{translations['Sad']}</MenuItem>
                    <MenuItem value="Excited">{translations['Excited']}</MenuItem>
                    <MenuItem value="Calm">{translations['Calm']}</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label={translations['Date']}
                        value={date}
                        className={css({ marginTop: '20px' })}
                        onChange={handleDateChange}
                    >
                    </DateTimePicker>
                </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    className={css({ marginTop: '10px' })}
                >
                    {translations['SaveEntry']}
                </Button>
            </FormControl>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>{translations['PastEntries']}</Typography>
                {journalEntriesProps.entries.length > 0 ? (
                    journalEntriesProps.entries.map((entry) => (
                        <Box key={entry.id} className={css({ borderBottom: '1px solid #ddd', padding: '10px 0', display: 'flex', flexDirection: 'row' })}>
                            <div className={css({ display: 'flex', flexDirection: 'column'})}>
                                <IconButton onClick={() => handleDelete(entry.id)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                                <IconButton onClick={() => handleEdit(entry)}>
                                    <EditNoteIcon />
                                </IconButton>
                            </div>
                            <div>
                                <Typography variant="body1">{entry.entry}</Typography>
                                <Typography variant="body1">{translations[entry.mood]}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {entry.date.toLocaleString()}
                                </Typography>
                            </div>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        {translations['NoEntriesYet']}
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default JournalEntries;