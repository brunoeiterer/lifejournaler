'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { DailyEntry } from '@/app/models/DailyEntry';

export interface CalendarProps {
  entries: Record<string, DailyEntry>;
  onDateClick: (date: string) => void;
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

export default function Calendar({ entries, onDateClick }: CalendarProps) {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days: dayjs.Dayjs[] = [];
  let day = startDate;

  while (day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, 'month'));

  const getColor = (value: number) => {
    const currentZone = zones.find(({ range }) => value >= range[0] && value <= range[1]) ?? zones[0];
    return colorClasses[currentZone.color].split(' ')[1];
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="text-lg px-2">←</button>
        <h2 className="text-xl font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={handleNext} className="text-lg px-2">→</button>
      </div>

      <div className="grid grid-cols-7 text-center font-medium text-sm text-gray-500 mb-2">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((date) => {
          const key = date.format('YYYY-MM-DD');
          const entry = entries[key];

          const isCurrentMonth = date.month() === currentMonth.month();
          const isToday = date.isSame(today, 'day');

          return (
            <button
              key={key}
              onClick={() => onDateClick(key)}
              className={clsx(
                'rounded p-1 border h-20 flex flex-col justify-between items-center',
                isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                isToday && 'border-blue-500 ring-2 ring-blue-200',
                'hover:bg-blue-50'
              )}
            >
              <span className="font-semibold">{date.date()}</span>
              {entry && <div className="flex flex-col items-center gap-0.5 text-xs mt-1">
                <div className="flex gap-1 justify-center">
                  <span>{Emojis[entry.Mood]}</span>
                  <span>{Emojis[entry.Weather]}</span>
                  <span>{Emojis[entry.SleepQuality]}</span>
                </div>

                <div className="flex gap-1 justify-center">
                  <span>{Emojis[entry.Menstruation ? 'Yes' : 'No']}</span>
                  <span>{Emojis[entry.Exercise ? 'Yes' : 'No']}</span>
                </div>

                <div className="flex gap-1 justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.AnxietyThoughts)}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.DepressiveThoughts)}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.Autocriticism)}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.SensorialOverload)}`} />
                </div>
              </div>
              }
            </button>
          );
        })}
      </div>
    </div>
  );
}

const Emojis: Record<string, string> = {
    Happy: '😊',
    Sad: '😢',
    Angry: '😠',
    Calm: '😌',
    Excited: '🤩',
    ExtremelyCold: '🥶',
    Cold: '😬',
    Pleasant: '😊',
    Hot: '😓',
    ExtremelyHot: '🥵',
    Yes: '✅',
    No: '❌',
    VeryBad: '😵',
    Bad: '😪',
    Good: '😴',
    VeryGood: '🛌',
};
