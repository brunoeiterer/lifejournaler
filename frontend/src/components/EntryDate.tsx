'use client';

import React from 'react';

type EntryDateProps = {
    title: string;
    date: string;
};

export default function EntryDate({ title, date }: EntryDateProps) {
    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <p className="mt-2 text-gray-700 text-lg text-center">{date}</p>
        </div>
    );
}
