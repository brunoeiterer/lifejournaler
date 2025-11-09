import tw from 'tailwind-styled-components';

export const TooltipContainer = tw.div`
    relative
    cursor-pointer
`;

export const TooltipContentContainer = tw.div`
    absolute
    z-50
    bottom-full
    left-1/2
    -translate-x-1/2
    mb-1
    w-max
    bg-gray-800
    text-white
    text-xs
    px-2
    py-1
    rounded
    shadow
`;