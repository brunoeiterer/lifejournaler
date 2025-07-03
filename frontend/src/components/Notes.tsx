'use client';

import React, { useState } from 'react';

type NoteInputProps = {
  title: string;
};

export default function Notes({ title }: NoteInputProps) {
  const [note, setNote] = useState('');

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border space-y-4">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
