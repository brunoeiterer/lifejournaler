import { useLanguage } from "@/app/contexts/LanguageContext";
import { CalendarGridBody, CalendarGridHeader } from "./CalendarGrid.styles";
import dayjs from "dayjs";
import { DailyEntry } from "@/app/models/DailyEntry";
import CalendarDate from "./CalendarDate/CalendarDate";

interface CalendarGridProps {
    days: dayjs.Dayjs[];
    entries: Record<string, DailyEntry>;
    currentMonth: dayjs.Dayjs;
    today: dayjs.Dayjs;
    onCalendarDateClick: (data: string) => void;
    setIsToolTipActive: (active: boolean) => void;
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function CalendarGrid({ days, entries, currentMonth, today, onCalendarDateClick, setIsToolTipActive }: CalendarGridProps) {

    const { translations } = useLanguage();

    return (
        <>
            <CalendarGridHeader>
                {weekDays.map((day) => <div key={day}>{translations[`${day}Abbreviation`]}</div>)}
            </CalendarGridHeader>

            <CalendarGridBody>
                {days.map((date) => {
                    const formattedDate = date.format('YYYY-MM-DD');
                    return (
                        <CalendarDate
                            key={formattedDate}
                            day={date}
                            onCalendarDateClick={onCalendarDateClick}
                            isCurrentMonth={date.month() === currentMonth.month()}
                            isToday={date.isSame(today, 'day')}
                            entry={entries[formattedDate]}
                            setIsToolTipActive={setIsToolTipActive}
                        />
                    );
                })}
            </CalendarGridBody>
        </>
    )
}