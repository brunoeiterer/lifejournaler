import { useLanguage } from "@/app/contexts/LanguageContext";
import { CalendarHeaderContainer, CalendarHeaderDate, CalendarNavButton } from "./CalendarHeader.styles";
import { Dayjs } from 'dayjs';

interface CalendarHeaderProps {
    handlePrev: () => void;
    handleNext: () => void;
    currentMonth: Dayjs;
}

export default function CalendarHeader({handlePrev, handleNext, currentMonth}: CalendarHeaderProps) {
    const { translations } = useLanguage();

    return (
        <CalendarHeaderContainer>
            <CalendarNavButton onClick={handlePrev} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
                <path style={{ fill: '#232326' }} d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
                </svg>
            </CalendarNavButton>
            <CalendarHeaderDate>{translations[currentMonth.format('MMMM')]} {currentMonth.format('YYYY')}</CalendarHeaderDate>
            <CalendarNavButton onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
                <path style={{ fill: '#232326' }} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
                </svg>
            </CalendarNavButton>
        </CalendarHeaderContainer>
    )
}
