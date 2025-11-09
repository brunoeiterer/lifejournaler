'use client';

import { DailyEntry } from '@/app/models/DailyEntry';
import React, { useRef, useState } from 'react';
import { NotesContainter, NotesInput, NotesTtile } from './Notes.styles';

type NoteInputProps = {
  title: string;
  label: string;
  initialValue: string;
  onChange: <K extends keyof DailyEntry>(key: K, value: DailyEntry[K]) => void;
};

export default function Notes({ title, label, initialValue, onChange }: NoteInputProps) {
  const initialValueRef = useRef(initialValue);
  const [note, setNote] = useState(initialValueRef.current);

  const updateValue = (newValue: string) => {
    setNote(newValue);
    onChange(label as keyof DailyEntry, newValue);
  }

  return (
    <NotesContainter>
      <NotesTtile>{title}</NotesTtile>
      <NotesInput
        value={note}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateValue(e.target.value)}
        rows={4}
      />
    </NotesContainter>
  );
}
