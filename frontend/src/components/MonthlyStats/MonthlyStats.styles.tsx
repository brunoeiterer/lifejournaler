import tw from 'tailwind-styled-components';

export const MonthlyStatsContainer = tw.div`
    w-full
    h-96
    max-w-3xl
    bg-white
    rounded-xl
    p-6
`;

export const DateSelectContainer = tw.div`
    flex
    justify-center
    gap-4
    mb-6
`;

export const Selector = tw.select`
    border rounded p-2
`;