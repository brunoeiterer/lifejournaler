'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import React, { useState } from 'react';

type SUDSScaleProps = {
    title: string;
};

const zones = [
    { labelKey: 'NoDiscomfort', color: 'cyan', range: [0, 15] },
    { labelKey: 'LightDiscomfort', color: 'green', range: [16, 35] },
    { labelKey: 'ModerateDiscomfort', color: 'yellow', range: [36, 60] },
    { labelKey: 'HighDiscomfort', color: 'orange', range: [61, 80] },
    { labelKey: 'ExtremeDiscomfort', color: 'red', range: [81, 100] },
];

const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-600 bg-cyan-600',
    green: 'text-green-600 bg-green-600',
    yellow: 'text-yellow-600 bg-yellow-600',
    orange: 'text-orange-600 bg-orange-600',
    red: 'text-red-600 bg-red-600',
};

export default function SUDSScale({ title }: SUDSScaleProps) {
    const [value, setValue] = useState(50);
    const { translations } = useLanguage();

    const currentZone = zones.find(({ range }) => value >= range[0] && value <= range[1]) ?? zones[0];
    const textColor = colorClasses[currentZone.color].split(' ')[0];
    const bgColor = colorClasses[currentZone.color].split(' ')[1];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    return (
        <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md border space-y-4">
            <h2 className="text-xl font-semibold text-center">{title}</h2>

            <div className="relative w-full space-y-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={value}
                    onChange={handleChange}
                    aria-label="SUDS scale"
                    className={`w-full h-2 appearance-none rounded-lg outline-none ${bgColor} transition`}
                />

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

                <div className={`text-center text-lg font-semibold ${textColor}`}>
                    {value}
                </div>
            </div>
        </div>
    );
}
