'use client';

import React from 'react';
import { EntryDatecontainer, EntryDateDate, EntryDateTitle } from './EntryDate.styles';

type EntryDateProps = {
    title: string;
    date: string;
};

export default function EntryDate({ title, date }: EntryDateProps) {
    return (
        <EntryDatecontainer>
            <EntryDateTitle>{title}</EntryDateTitle>
            <EntryDateDate>{date}</EntryDateDate>
        </EntryDatecontainer>
    );
}
