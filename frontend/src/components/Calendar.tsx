'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

export interface CalendarProps {
  entries: Record<string, DailyEntry>;
  onDateClick: (date: string) => void;
};

export interface DailyEntry {
  mood?: string;
  suds?: number;
  sleep?: string;
  hasNote?: boolean;
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
              <div className="flex gap-1 text-lg">
                {entry?.mood && <span>{getMoodEmoji(entry.mood)}</span>}
                {entry?.suds !== undefined && <span title="SUDS">🔵</span>}
                {entry?.sleep && <span>{getSleepEmoji(entry.sleep)}</span>}
                {entry?.hasNote && <span>📝</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const getMoodEmoji = (mood: string) =>
  ({
    Happy: '😊',
    Sad: '😢',
    Angry: '😠',
    Calm: '😌',
    Excited: '🤩',
  }[mood] || '❓');

const getSleepEmoji = (sleep: string) =>
  ({
    VeryBad: '😵',
    Bad: '😪',
    Good: '😴',
    VeryGood: '🛌',
  }[sleep] || '');
