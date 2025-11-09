import dayjs from "dayjs";
import { CalendarButton, CalendarDateGrid, CalendarDateGridRowFiveCols, CalendarDateGridRowThreeCols, DateNumber } from "./CalendarDate.styles";
import clsx from 'clsx';
import { DailyEntry } from "@/app/models/DailyEntry";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Tooltip from "@/components/Calendar/CalendarGrid/CalendarDate/Tooltip/Tooltip";
import { Emojis } from "@/components/Emojis";
import { ColorClasses, ColorZones } from "@/components/ColorZones";

interface CalendarDateProps {
    day: dayjs.Dayjs;
    onCalendarDateClick: (date: string) => void;
    isCurrentMonth: boolean;
    isToday: boolean;
    entry: DailyEntry;
    setIsToolTipActive: (active: boolean) => void;
}

const getColor = (value: number) => {
    const currentZone = ColorZones.find(({ range }) => value >= range[0] && value <= range[1]) ?? ColorZones[0];
    return ColorClasses[currentZone.color].split(' ')[1];
}

export default function CalendarDate({ day, onCalendarDateClick, isCurrentMonth, isToday, entry, setIsToolTipActive }: CalendarDateProps) {
    const { translations } = useLanguage();

    const date = day.format('YYYY-MM-DD');

    return (
        <CalendarButton
            key={date}
            onClick={() => onCalendarDateClick(date)}
            className={clsx(
                isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                isToday && 'border-blue-500 ring-2 ring-blue-200',
            )}
        >
            <DateNumber>{day.date()}</DateNumber>

            {entry && 
                <CalendarDateGrid>
                    <CalendarDateGridRowThreeCols>
                        <Tooltip
                            label={translations['Mood'] + ': ' + translations[entry.Mood]}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <span>{Emojis[entry.Mood]}</span>
                        </Tooltip>
                        <Tooltip
                            label={translations['Weather'] + ': ' + translations[entry.Weather]}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <span>{Emojis[entry.Weather]}</span>
                        </Tooltip>
                        <Tooltip
                            label={translations['SleepQuality'] + ': ' + translations[entry.SleepQuality]}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <span>{Emojis[entry.SleepQuality]}</span>
                        </Tooltip>
                    </CalendarDateGridRowThreeCols>

                    <CalendarDateGridRowThreeCols>
                        <Tooltip
                            label={translations['Menstruation'] + ': ' + translations[entry.Menstruation]}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <span>{entry.Menstruation == 'Yes' ? Emojis['YesMenstruation'] : Emojis[entry.Menstruation]}</span>
                        </Tooltip>
                        <Tooltip
                            label={translations['Exercise'] + ': ' + translations[entry.Exercise]}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <span>{Emojis[entry.Exercise]}</span>
                        </Tooltip>
                        <Tooltip
                            label={translations['AppetiteLevel'] + ': ' + translations[entry.AppetiteLevel]}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <span>{Emojis[entry.AppetiteLevel]}</span>
                        </Tooltip>
                    </CalendarDateGridRowThreeCols>

                    <CalendarDateGridRowFiveCols>
                        <Tooltip
                            label={translations['AnxietyThoughts'] + ': ' + entry.AnxietyThoughts}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <div className={`w-2 h-2 rounded-full ${getColor(entry.AnxietyThoughts)}`} />
                        </Tooltip>
                        <Tooltip
                            label={translations['DepressiveThoughts'] + ': ' + entry.DepressiveThoughts}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <div className={`w-2 h-2 rounded-full ${getColor(entry.DepressiveThoughts)}`} />
                        </Tooltip>
                        <Tooltip
                            label={translations['Autocriticism'] + ': ' + entry.Autocriticism}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <div className={`w-2 h-2 rounded-full ${getColor(entry.Autocriticism)}`} />
                        </Tooltip>
                        <Tooltip
                            label={translations['SensorialOverload'] + ': ' + entry.SensorialOverload}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <div className={`w-2 h-2 rounded-full ${getColor(entry.SensorialOverload)}`} />
                        </Tooltip>
                        <Tooltip
                            label={translations['RacingThoughts'] + ': ' + entry.RacingThoughts}
                            setToolTipActive={setIsToolTipActive}
                        >
                            <div className={`w-2 h-2 rounded-full ${getColor(entry.RacingThoughts)}`} />
                        </Tooltip>
                    </CalendarDateGridRowFiveCols>
                </CalendarDateGrid>
            }
        </CalendarButton>
    )
}