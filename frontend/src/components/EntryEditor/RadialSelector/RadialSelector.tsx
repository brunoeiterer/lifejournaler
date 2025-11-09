'use client';

import React, { useRef, useState } from 'react';
import { DailyEntry } from '@/app/models/DailyEntry';
import { Emojis } from '@/components/Emojis';
import { RadialSelectorContainer, RadialSelectorContentContainer, RadialSelectorTitle } from './RadialSelector.styles';
import RadialSelectorOption from './RadialSelectorOption/RadialSelectorOption';

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

    const updateValue = (newValue: string) => {
        setValue(newValue);
        onChange(label as keyof DailyEntry, newValue);
    };

    return (
        <RadialSelectorContainer>
            <RadialSelectorTitle>{title}</RadialSelectorTitle>
            <RadialSelectorContentContainer>
                {options.map((option) => {
                    const emoji = label == 'Menstruation' && option == 'Yes' ? Emojis['YesMenstruation'] : Emojis[option];
                    const isSelected = value === option;

                    return <RadialSelectorOption
                        key={option}
                        value={option}
                        isSelected={isSelected}
                        onChange={() => updateValue(option)}
                        emoji={emoji}
                    />
                })}
            </RadialSelectorContentContainer>
        </RadialSelectorContainer>
    );
}
