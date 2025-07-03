'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import React, { useState } from 'react';

type SUDSScaleProps = {
    title: string;
};

const GetTextColor = (color: string) => {
    switch(color) {
        case "cyan":
            return "text-cyan-600";
        case "green":
            return "text-green-600";
        case "yellow":
            return "text-yellow-600";
        case "orange":
            return "text-orange-600";
        case "red":
            return "text-red-600";
    }
}

const GetBackgroundColor = (color: string) => {
    switch(color) {
        case "cyan":
            return "bg-cyan-600";
        case "green":
            return "bg-green-600";
        case "yellow":
            return "bg-yellow-600";
        case "orange":
            return "bg-orange-600";
        case "red":
            return "bg-red-600";
    }
}

const Colors = ["cyan", "green", "yellow", "orange", "red"];

export default function SUDSScale({ title }: SUDSScaleProps) {
    const [value, setValue] = useState(50);

    const { translations } = useLanguage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    const labels = [translations['NoDiscomfort'], translations['LightDiscomfort'], translations['ModerateDiscomfort'],
    translations['HighDiscomfort'], translations['ExtremeDiscomfort']];

    let color = "cyan";

    if(value > 15 && value <= 35) {
        color = "green";
    }
    else if(value > 35 && value <= 60) {
        color = "yellow";
    }
    else if(value > 60 && value <= 80) {
        color = "orange";
    }
    else if(value > 80) {
        color = "red";
    }

    return (
        <div className="w-full max-w-xl p-6 bg-green rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>

            <div className="relative w-full">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={value}
                    onChange={handleChange}
                    className={`w-full appearance-none h-2 ${GetBackgroundColor(color)} rounded-lg outline-none slider-thumb`}
                />
                <div className={`flex justify-between text-sm font-semibold text-center text-gray-600 mt-2`}>
                    {labels.map((label, index) => (
                        <span key={label} className={`w-20 ${GetTextColor(Colors[index])}`}>{label}</span>
                    ))}
                </div>
                <div className={`text-center mt-4 ${GetTextColor(color)} font-medium`}>
                    {value}
                </div>
            </div>
        </div>
    );
}