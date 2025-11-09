import tw from 'tailwind-styled-components';

export const LoadingScreenContainer = tw.div`
    flex
    items-center
    justify-center
    h-screen
    bg-gray-100
`;

export const LoadingScreenContentContainer = tw.div`
    text-center
`;

export const LoadingScreenContent = tw.div`
    animate-spin
    rounded-full
    h-12
    w-12
    border-4
    border-blue-500
    border-t-transparent
    mx-auto
    mb-4
`;