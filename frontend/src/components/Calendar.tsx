'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { DailyEntry } from '@/app/models/DailyEntry';
import Tooltip from '@/components/Tooltip'
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Emojis } from './Emojis';
import { ColorClasses, ColorZones } from './ColorZones';

export interface CalendarProps {
  entries: Record<string, DailyEntry>;
  onDateClick: (date: string) => void;
};

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar({ entries, onDateClick }: CalendarProps) {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);

  let isTooltipActive: boolean;
  const setIsToolTipActive = (active: boolean) => {
    isTooltipActive = active;
  }

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const { translations } = useLanguage();

  const days: dayjs.Dayjs[] = [];
  let day = startDate;

  while (day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, 'month'));

  const getColor = (value: number) => {
    const currentZone = ColorZones.find(({ range }) => value >= range[0] && value <= range[1]) ?? ColorZones[0];
    return ColorClasses[currentZone.color].split(' ')[1];
  }

  const onCalendarDateClick = (date: string) => {
    if(!isTooltipActive) {
      onDateClick(date);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="text-lg px-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
            <path style={{ fill: '#232326' }} d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
          </svg>
        </button>
        <h2 className="text-xl font-bold ml-4 mr-4 mt-2">{translations[currentMonth.format('MMMM')]} {currentMonth.format('YYYY')}</h2>
        <button onClick={handleNext} className="text-lg px-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
            <path style={{ fill: '#232326' }} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-medium text-sm text-gray-500 mb-2">
        {weekDays.map((day) => (
          <div key={day}>{translations[`${day}Abbreviation`]}</div>
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
              onClick={() => onCalendarDateClick(key)}
              className={clsx(
                'rounded p-1 border grid h-20 place-items-center',
                isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                isToday && 'border-blue-500 ring-2 ring-blue-200',
                'hover:bg-blue-50'
              )}
            >
              <span className="font-semibold">{date.date()}</span>
              {entry && <div className='grid place-items-center'>
                <div className="grid grid-cols-3 gap-2 place-items-center">
                  <Tooltip label={translations['Mood'] + ': ' + translations[entry.Mood]} setToolTipActive={setIsToolTipActive}>
                    <span>{Emojis[entry.Mood]}</span>
                  </Tooltip>
                  <Tooltip label={translations['Weather'] + ': ' + translations[entry.Weather]} setToolTipActive={setIsToolTipActive}>
                    <span>{Emojis[entry.Weather]}</span>
                  </Tooltip>
                  <Tooltip label={translations['SleepQuality'] + ': ' + translations[entry.SleepQuality]} setToolTipActive={setIsToolTipActive}>
                    <span>{Emojis[entry.SleepQuality]}</span>
                  </Tooltip>
                </div>

                <div className="grid grid-cols-3 gap-2 place-items-center">
                  <Tooltip label={translations['Menstruation'] + ': ' + translations[entry.Menstruation]} setToolTipActive={setIsToolTipActive}>
                    <span>{entry.Menstruation == 'Yes' ? Emojis['YesMenstruation'] : Emojis[entry.Menstruation]}</span>
                  </Tooltip>
                  <Tooltip label={translations['Exercise'] + ': ' + translations[entry.Exercise]} setToolTipActive={setIsToolTipActive}>
                    <span>{Emojis[entry.Exercise]}</span>
                  </Tooltip>
                  <Tooltip label={translations['AppetiteLevel'] + ': ' + translations[entry.AppetiteLevel]} setToolTipActive={setIsToolTipActive}>
                    <span>{Emojis[entry.AppetiteLevel]}</span>
                  </Tooltip>
                </div>

                <div className="grid grid-cols-4 gap-2 place-items-center">
                  <Tooltip label={translations['AnxietyThoughts'] + ': ' + entry.AnxietyThoughts} setToolTipActive={setIsToolTipActive}>
                    <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.AnxietyThoughts)}`} />
                  </Tooltip>
                  <Tooltip label={translations['DepressiveThoughts'] + ': ' + entry.DepressiveThoughts} setToolTipActive={setIsToolTipActive}>
                    <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.DepressiveThoughts)}`} />
                  </Tooltip>
                  <Tooltip label={translations['Autocriticism'] + ': ' + entry.Autocriticism} setToolTipActive={setIsToolTipActive}>
                    <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.Autocriticism)}`} />
                  </Tooltip>
                  <Tooltip label={translations['SensorialOverload'] + ': ' + entry.SensorialOverload} setToolTipActive={setIsToolTipActive}>
                    <div className={`w-2.5 h-2.5 rounded-full ${getColor(entry.SensorialOverload)}`} />
                  </Tooltip>
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