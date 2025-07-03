'use client';

import React from 'react';
import dayjs from 'dayjs';

type EntryDateProps = {
    title: string;
    date?: Date;
};

export default function EntryDate({ title, date }: EntryDateProps) {
    const displayDate = dayjs(date ?? new Date()).format('YYYY/MM/DD');

    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <p className="mt-2 text-gray-700 text-lg text-center">{displayDate}</p>
        </div>
    );
}
