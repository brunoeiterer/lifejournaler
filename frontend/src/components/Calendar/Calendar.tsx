'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';

import { DailyEntry } from '@/app/models/DailyEntry';
import { CalendarContainer} from './Calendar.styles';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarGrid from './CalendarGrid/CalendarGrid';

export interface CalendarProps {
  entries: Record<string, DailyEntry>;
  onDateClick: (date: string) => void;
};

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

  const days: dayjs.Dayjs[] = [];
  let day = startDate;

  while (day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, 'month'));

  const onCalendarDateClick = (date: string) => {
    if(!isTooltipActive) {
      onDateClick(date);
    }
  }

  return (
    <CalendarContainer>
      <CalendarHeader
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentMonth={currentMonth}
      />

      <CalendarGrid
        days={days}
        entries={entries}
        currentMonth={currentMonth}
        today={today}
        onCalendarDateClick={onCalendarDateClick}
        setIsToolTipActive={setIsToolTipActive}
      />

    </CalendarContainer>
  );
}