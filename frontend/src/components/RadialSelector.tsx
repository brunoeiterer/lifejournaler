'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { useLanguage } from '@/app/contexts/LanguageContext';

type RadialSelectorProps = {
    title: string;
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
};

const Emojis: Record<string, string> = {
    Happy: '😊',
    Sad: '😢',
    Angry: '😠',
    Calm: '😌',
    Excited: '🤩',
};

export default function RadialSelector({
    title,
    options
}: RadialSelectorProps) {
    const [value, setValue] = useState(options[0]);
    const { translations } = useLanguage();

    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
            <div className="flex flex-row gap-4 justify-between">
                {options.map((option) => {
                    const emoji = Emojis[option];
                    const isSelected = value === option;

                    return (
                        <div className='flex flex-col text-center gap-2' key={option}>
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
                                    onChange={() => setValue(option)}
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
