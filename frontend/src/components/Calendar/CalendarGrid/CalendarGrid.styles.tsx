import tw from 'tailwind-styled-components';

export const CalendarGridHeader = tw.div`
    grid
    grid-cols-7
    text-center
    font-medium
    text-sm
    text-gray-500
    mb-2
`;

export const CalendarGridBody = tw.div`
    grid
    grid-cols-7
    gap-1
    text-center
    text-sm
`;