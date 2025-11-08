import tw from 'tailwind-styled-components';

export const CalendarButton = tw.button`
    rounded
    p-1
    border
    grid
    h-20
    place-items-center
    hover:bg-blue-50
`;

export const DateNumber = tw.span`
    font-semibold
`;

export const CalendarDateGrid = tw.div`
    grid
    place-items-center
`;

const CalendarDataGridRow = tw.div`
    grid
    gap-2
    place-items-center
`;

export const CalendarDateGridRowThreeCols = tw(CalendarDataGridRow)`
    grid-cols-3
`;

export const CalendarDateGridRowFiveCols = tw(CalendarDataGridRow)`
    grid-cols-5
`;