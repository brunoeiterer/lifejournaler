'use client';

import { DailyEntry } from '@/app/models/DailyEntry';
import React, { useRef, useState } from 'react';

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
    <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border space-y-4">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <textarea
        value={note}
        onChange={(e) => updateValue(e.target.value)}
        rows={4}
        className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
