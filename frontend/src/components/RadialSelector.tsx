'use client';

import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { DailyEntry } from '@/app/models/DailyEntry';
import { Emojis } from './Emojis';

type RadialSelectorProps = {
    title: string;
    options: string[];
    label : string;
    initialValue: string;
    onChange: <K extends keyof DailyEntry>(key: K, value: DailyEntry[K]) => void;
};

export default function RadialSelector({ title, options, label, initialValue, onChange }: RadialSelectorProps) {
    const initialValueRef = useRef(initialValue);
    const [value, setValue] = useState(initialValueRef.current);
    const { translations } = useLanguage();

    const updateValue = (newValue: string) => {
        setValue(newValue);
        if(newValue == 'Yes' || newValue == 'No') {
            onChange(label as keyof DailyEntry, newValue == 'Yes');
        }
        else {
            onChange(label as keyof DailyEntry, newValue);
        }
        
    };

    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                {options.map((option) => {
                    const emoji = label == 'Menstruation' && option == 'Yes' ? Emojis['YesMenstruation'] : Emojis[option];
                    const isSelected = value === option;

                    return (
                        <div className='flex flex-col text-center gap-2 w-20' key={option}>
                            <label
                                className={clsx(
                                    'text-3xl cursor-pointer p-3 rounded-full border transition',
                                    isSelected ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-transparent hover:bg-gray-200'
                                )}
                            >
                                <input
                                    type="radio"
                                    value={option}
                                    checked={isSelected}
                                    onChange={() => updateValue(option)}
                                    className="hidden"
                                />
                                <span>{emoji}</span>
                            </label>
                            <span>{translations[option]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
