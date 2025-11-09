import tw from 'tailwind-styled-components';

export const SaveButtonContainer = tw.button`
    "w-full
    max-w-xl
    flex
    justify-center
    items-center
    bg-blue-600
    text-white
    px-4
    py-3
    rounded-xl
    shadow-md
    hover:bg-blue-700
`;

export const InProgressContainer = tw.div`
    w-5
    h-5
    border-2
    border-white
    border-t-transparent
    rounded-full
    animate-spin
`;