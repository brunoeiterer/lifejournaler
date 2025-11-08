import tw from 'tailwind-styled-components';

export const PageContainer = tw.div`
    relative
    min-h-screen
    bg-gradient-to-b
    from-blue-50
    to-white
    py-12
    overflow-auto
`;

export const ContentContainer = tw.div`
    flex
    flex-col
    items-center
    justify-center
    gap-4
`;

export const PageTitle = tw.h1`
    text-2xl
    font-semibold
    text-center
    mb-4
`;

export const ClickTip = tw.p`
    text-gray-500
    text-center
`;

export const DepressiveEpisodeWarningContainer = tw.div`
    mb-2
`;

export const CalendarContainer = tw.div`
    bg-white
    p-6
    rounded-2xl
    shadow-md
    max-w-md
    mx-auto
`;