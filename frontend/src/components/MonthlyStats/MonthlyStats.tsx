'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DailyEntry } from '@/app/models/DailyEntry';
import CategoryChart from './CategoryChart/CategoryChart';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { DateSelectContainer, MonthlyStatsContainer, Selector } from './MonthlyStats.styles';

type Props = {
    entries: Record<string, DailyEntry>;
};

const getZone = (value: number): string => {
    if (value <= 3) return 'LightIntensity';
    if (value <= 7) return 'ModerateIntensity';
    return 'HighIntensity';
};

export default function MonthlyStats({ entries }: Props) {
    const now = dayjs();
    const [selectedMonth, setSelectedMonth] = useState<number>(now.month() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(now.year());
    const { translations } = useLanguage();

    const filteredEntries: DailyEntry[] = [];
    for (const key in entries) {
        const date = key.split('-');
        if(parseInt(date[1]) == selectedMonth && parseInt(date[0]) == selectedYear) {
            filteredEntries.push(entries[key]);
        }
    }

    const moodCounts: Record<string, number> = { "Happy" : 0, "Sad" : 0, "Excited" : 0, "Calm" : 0, "Angry": 0, "Apathetic": 0,
        "Anxious": 0, "Tired": 0 };
    const weatherCounts: Record<string, number> = { "ExtremelyCold": 0, "Cold": 0, "Pleasant": 0, "Hot": 0, "ExtremelyHot": 0,
        "Cloudy": 0, "Rainy": 0};
    const sleepQualityCounts: Record<string, number> = { "VeryBad": 0, "Bad": 0, "Average": 0, "Good": 0, "VeryGood": 0 };
    const anxietyThoughtsCounts: Record<string, number> = { "LightIntensity": 0, "ModerateIntensity": 0, "HighIntensity": 0 };
    const depressiveThoughtsCounts: Record<string, number> = { "LightIntensity": 0, "ModerateIntensity": 0, "HighIntensity": 0 };
    const autocriticismCounts: Record<string, number> = { "LightIntensity": 0, "ModerateIntensity": 0, "HighIntensity": 0 };
    const sensorialOverloadCounts: Record<string, number> = { "LightIntensity": 0, "ModerateIntensity": 0, "HighIntensity": 0 };
    const racingThoughtsCounts: Record<string, number> = {"LightIntensity": 0, "ModerateIntensity": 0, "HighIntensity": 0};
    const menstruationCount: Record<string, number> = { "Yes": 0, "No": 0, "PMS": 0 };
    const exerciseCount: Record<string, number> = { "Yes": 0, "No": 0 };
    const appetiteLevelCount : Record<string, number> = { "Low": 0, "Normal": 0, "Large": 0};

    for (const entry of filteredEntries) {
        moodCounts[entry.Mood] = (moodCounts[entry.Mood] || 0) + 1;
        weatherCounts[entry.Weather] = (weatherCounts[entry.Weather] || 0) + 1;
        sleepQualityCounts[entry.SleepQuality] = (sleepQualityCounts[entry.SleepQuality] || 0) + 1;
        anxietyThoughtsCounts[getZone(entry.AnxietyThoughts)] = (anxietyThoughtsCounts[getZone(entry.AnxietyThoughts)] || 0) + 1;
        depressiveThoughtsCounts[getZone(entry.DepressiveThoughts)] = (depressiveThoughtsCounts[getZone(entry.DepressiveThoughts)] || 0) + 1;
        autocriticismCounts[getZone(entry.Autocriticism)] = (autocriticismCounts[getZone(entry.Autocriticism)] || 0) + 1;
        sensorialOverloadCounts[getZone(entry.SensorialOverload)] = (sensorialOverloadCounts[getZone(entry.SensorialOverload)] || 0) + 1;
        racingThoughtsCounts[getZone(entry.RacingThoughts)] = (racingThoughtsCounts[getZone(entry.RacingThoughts)] || 0) + 1;
        menstruationCount[entry.Menstruation] = (menstruationCount[entry.Menstruation] || 0) + 1;
        exerciseCount[entry.Exercise] = (exerciseCount[entry.Exercise] || 0) + 1;
        appetiteLevelCount[entry.AppetiteLevel] = (appetiteLevelCount[entry.AppetiteLevel] || 0) + 1;
    }
    
    return (
        <MonthlyStatsContainer>
            <DateSelectContainer>
                <Selector
                    value={selectedMonth}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMonth(Number(e.target.value))}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </Selector>

                <Selector
                    value={selectedYear}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedYear(Number(e.target.value))}
                >
                    {Array.from({ length: 5 }, (_, i) => {
                        const year = now.year() - i;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </Selector>
            </DateSelectContainer>

            <CategoryChart title={translations['Mood']} data={moodCounts} />
            <CategoryChart title={translations['Weather']} data={weatherCounts} />
            <CategoryChart title={translations['SleepQuality']} data={sleepQualityCounts} />
            <CategoryChart title={translations['AnxietyThoughts']} data={anxietyThoughtsCounts} />
            <CategoryChart title={translations['DepressiveThoughts']} data={depressiveThoughtsCounts} />
            <CategoryChart title={translations['Autocriticism']} data={autocriticismCounts} />
            <CategoryChart title={translations['SensorialOverload']} data={sensorialOverloadCounts} />
            <CategoryChart title={translations['RacingThoughts']} data={racingThoughtsCounts} />
            <CategoryChart title={translations['Menstruation']} data={menstruationCount} />
            <CategoryChart title={translations['Exercise']} data={exerciseCount} />
            <CategoryChart title={translations['AppetiteLevel']} data={appetiteLevelCount} />
        </MonthlyStatsContainer>
    );
}
