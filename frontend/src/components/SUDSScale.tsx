'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { DailyEntry } from '@/app/models/DailyEntry';
import React, { useEffect, useRef, useState } from 'react';

type SUDSScaleProps = {
    title: string;
    label : string;
    onChange: <K extends keyof DailyEntry>(key: K, value: DailyEntry[K]) => void;
};

const zones = [
    { labelKey: 'LightIntensity', color: 'cyan', range: [0, 3] },
    { labelKey: 'ModerateIntensity', color: 'green', range: [4, 7] },
    { labelKey: 'HighIntensity', color: 'red', range: [8, 10] }
];

const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-600 bg-cyan-600',
    green: 'text-green-600 bg-green-600',
    red: 'text-red-600 bg-red-600',
};

export default function SUDSScale({ title, label, onChange }: SUDSScaleProps) {
    const [value, setValue] = useState(0);
    const { translations } = useLanguage();
    const sliderRef = useRef<HTMLInputElement>(null);
    const [thumbX, setThumbX] = useState(0);

    const currentZone = zones.find(({ range }) => value >= range[0] && value <= range[1]) ?? zones[0];
    const bgColor = colorClasses[currentZone.color].split(' ')[1];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
        onChange(label as keyof DailyEntry, value);
    };

    const updateThumbPosition = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const percent = (value - Number(slider.min)) / (Number(slider.max) - Number(slider.min));
        const usableWidth = rect.width - 40;
        const x = percent * usableWidth + 40 / 2;

        setThumbX(x);
    };

    useEffect(() => {
        updateThumbPosition();
        window.addEventListener('resize', updateThumbPosition);
        return () => window.removeEventListener('resize', updateThumbPosition);
    }, [value]);

    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border space-y-4">
            <h2 className="text-xl font-semibold text-center">{title}</h2>

            <div className="relative w-full space-y-4">
                <input
                ref={sliderRef}
                type="range"
                min="0"
                max="10"
                step="1"
                value={value}
                onChange={handleChange}
                className={`suds-slider w-full appearance-none h-2 rounded-lg outline-none ${bgColor} text-${currentZone.color}-600`}
                style={{ position: 'relative' }}
                />

                <div
                    className="suds-value-label"
                    style={{
                        top: '-2.5px',
                        left: `${thumbX}px`,
                        color: 'white'
                    }}
                >
                    {value}
                </div>

                <div className="flex justify-between text-xs font-medium text-gray-600">
                    {zones.map((zone) => (
                        <span
                            key={zone.labelKey}
                            className={`${colorClasses[zone.color].split(' ')[0]} w-20 text-center`}
                        >
                            {translations[zone.labelKey]}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
